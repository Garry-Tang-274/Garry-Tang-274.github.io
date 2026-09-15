#!/usr/bin/env python3
"""Synchronize the public Steam library into the site's compact JS dataset.

No AI service is used. By default this script reads Steam Community's public
XML games list. If STEAM_API_KEY is configured later, it uses Steam's Web API
instead and can also refresh the last-played timestamp.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

STEAM_ID = os.environ.get("STEAM_ID64", "76561199869016456")
API_KEY = os.environ.get("STEAM_API_KEY", "").strip()
DATA_PATH = Path("assets/js/steam-games-data.js")
PROFILE_URL = f"https://steamcommunity.com/profiles/{STEAM_ID}/"
XML_URL = f"{PROFILE_URL}games/?tab=all&xml=1"
USER_AGENT = "Tang-Zhi-Personal-Site-Steam-Sync/1.0 (+https://garry-tang-274.github.io/)"


def fetch_bytes(url: str, attempts: int = 3) -> bytes:
    last_error: Exception | None = None
    for attempt in range(1, attempts + 1):
        request = urllib.request.Request(
            url,
            headers={
                "User-Agent": USER_AGENT,
                "Accept": "application/json, application/xml, text/xml, */*",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=40) as response:
                return response.read()
        except (urllib.error.URLError, TimeoutError) as exc:
            last_error = exc
            if attempt < attempts:
                time.sleep(attempt * 4)
    raise RuntimeError(f"Unable to download Steam data after {attempts} attempts: {last_error}")


def parse_number(value: str | None) -> float:
    if not value:
        return 0.0
    cleaned = value.replace(",", "")
    match = re.search(r"\d+(?:\.\d+)?", cleaned)
    return round(float(match.group(0)), 1) if match else 0.0


def fetch_via_xml() -> tuple[list[dict[str, Any]], str]:
    payload = fetch_bytes(XML_URL)
    if payload.lstrip().lower().startswith(b"<!doctype html"):
        raise RuntimeError("Steam returned HTML instead of the public XML game list. Check profile privacy.")

    try:
        root = ET.fromstring(payload)
    except ET.ParseError as exc:
        raise RuntimeError(f"Steam XML could not be parsed: {exc}") from exc

    error_text = root.findtext("error") or root.findtext("privacyMessage")
    if error_text:
        raise RuntimeError(f"Steam did not expose the game list: {error_text.strip()}")

    result: list[dict[str, Any]] = []
    for node in root.findall(".//game"):
        app_id_text = node.findtext("appID")
        if not app_id_text or not app_id_text.isdigit():
            continue
        hours = parse_number(node.findtext("hoursOnRecord"))
        recent = parse_number(node.findtext("hoursLast2Weeks"))
        if hours <= 0 and recent <= 0:
            continue
        result.append(
            {
                "id": int(app_id_text),
                "name": (node.findtext("name") or f"Steam App {app_id_text}").strip(),
                "hours": hours,
                "recent": recent,
                "last_played": "",
            }
        )
    return result, "Steam Community public XML"


def fetch_via_web_api() -> tuple[list[dict[str, Any]], str]:
    query = urllib.parse.urlencode(
        {
            "key": API_KEY,
            "steamid": STEAM_ID,
            "include_appinfo": "true",
            "include_played_free_games": "true",
            "format": "json",
        }
    )
    url = f"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?{query}"
    payload = json.loads(fetch_bytes(url).decode("utf-8"))
    raw_games = payload.get("response", {}).get("games", [])
    result: list[dict[str, Any]] = []
    for item in raw_games:
        minutes = int(item.get("playtime_forever") or 0)
        recent_minutes = int(item.get("playtime_2weeks") or 0)
        if minutes <= 0 and recent_minutes <= 0:
            continue
        timestamp = int(item.get("rtime_last_played") or 0)
        last_played = (
            datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat().replace("+00:00", "Z")
            if timestamp
            else ""
        )
        result.append(
            {
                "id": int(item["appid"]),
                "name": str(item.get("name") or f"Steam App {item['appid']}").strip(),
                "hours": round(minutes / 60, 1),
                "recent": round(recent_minutes / 60, 1),
                "last_played": last_played,
            }
        )
    return result, "Steam Web API"


def read_local_snapshot(path: Path) -> tuple[list[dict[str, Any]], str]:
    """Import an explicitly exported client snapshot when the public feed fails.

    The snapshot contains only steam_id, source_updated_at and normalized games;
    Steam credentials and the client's full configuration must not be exported.
    """
    payload = json.loads(path.read_text(encoding="utf-8"))
    if str(payload.get("steam_id")) != STEAM_ID:
        raise RuntimeError("Local snapshot belongs to a different Steam account")
    updated_at = str(payload.get("source_updated_at") or "")
    if not updated_at or datetime.fromisoformat(updated_at.replace("Z", "+00:00")).tzinfo is None:
        raise RuntimeError("Local snapshot needs a timezone-qualified source_updated_at")
    games = payload.get("games")
    if not isinstance(games, list):
        raise RuntimeError("Local snapshot must contain a games array")
    ids: set[int] = set()
    for item in games:
        app_id = int(item["id"])
        if app_id <= 0 or app_id in ids:
            raise RuntimeError("Local snapshot contains an invalid or duplicate app ID")
        ids.add(app_id)
        for field in ("hours", "recent"):
            value = float(item[field])
            if not 0 <= value < 1_000_000:
                raise RuntimeError(f"Local snapshot contains invalid {field}")
        if not str(item.get("name") or "").strip():
            raise RuntimeError("Local snapshot contains a game without a name")
        if "installed" in item and not isinstance(item["installed"], bool):
            raise RuntimeError("Local snapshot contains an invalid installed flag")
        if item.get("last_played"):
            played_at = datetime.fromisoformat(str(item["last_played"]).replace("Z", "+00:00"))
            if played_at.tzinfo is None:
                raise RuntimeError("Local snapshot needs timezone-qualified last_played values")
    return games, updated_at


def read_existing_rows() -> list[list[Any]]:
    if not DATA_PATH.exists():
        return []
    text = DATA_PATH.read_text(encoding="utf-8")
    match = re.search(r"window\.STEAM_GAME_ROWS\s*=\s*(\[.*\])\s*;", text, re.DOTALL)
    if not match:
        raise RuntimeError(f"Could not locate STEAM_GAME_ROWS in {DATA_PATH}")
    rows = json.loads(match.group(1))
    if not isinstance(rows, list):
        raise RuntimeError("Existing Steam dataset is not an array")
    return rows


def normalize_existing_row(row: list[Any]) -> list[Any]:
    padded = list(row[:9])
    padded.extend([""] * (9 - len(padded)))
    padded[0] = int(padded[0])
    padded[2] = round(float(padded[2] or 0), 1)
    padded[3] = round(float(padded[3] or 0), 1)
    padded[4] = 1 if padded[4] else 0
    return padded


def sort_rows(rows: list[list[Any]]) -> list[list[Any]]:
    return sorted(rows, key=lambda row: (-float(row[2] or 0), str(row[1]).casefold()))


def merge_rows(existing_rows: list[list[Any]], remote_games: list[dict[str, Any]]) -> list[list[Any]]:
    existing = {int(row[0]): normalize_existing_row(row) for row in existing_rows if row}
    remote_ids: set[int] = set()

    for item in remote_games:
        app_id = int(item["id"])
        remote_ids.add(app_id)
        if app_id in existing:
            row = existing[app_id]
            row[1] = item["name"] or row[1]
            row[2] = item["hours"]
            row[3] = item["recent"]
            if item.get("last_played"):
                row[7] = item["last_played"]
        else:
            existing[app_id] = [
                app_id,
                item["name"],
                item["hours"],
                item["recent"],
                0,
                "",
                "",
                item.get("last_played", ""),
                "",
            ]

        if "installed" in item:
            existing[app_id][4] = 1 if item["installed"] else 0

    # Preserve manually enriched rows if Steam temporarily omits them. Their
    # recent-two-week counter is reset, while reviews/tags/installed flags stay.
    for app_id, row in existing.items():
        if app_id not in remote_ids:
            row[3] = 0.0

    return sort_rows(list(existing.values()))


def validate(remote_games: list[dict[str, Any]], existing_rows: list[list[Any]]) -> None:
    if not remote_games:
        raise RuntimeError("Steam returned no played games; refusing to overwrite the current archive")
    if existing_rows and len(remote_games) < max(10, int(len(existing_rows) * 0.45)):
        raise RuntimeError(
            f"Steam returned only {len(remote_games)} played games for an archive of {len(existing_rows)}; "
            "this likely indicates a privacy or temporary service problem"
        )


def write_dataset(rows: list[list[Any]], metadata: dict[str, Any]) -> None:
    output = (
        "// Generated automatically by scripts/sync_steam_games.py.\n"
        f"window.STEAM_SYNC_META={json.dumps(metadata, ensure_ascii=False, separators=(',', ':'))};\n"
        f"window.STEAM_GAME_ROWS={json.dumps(rows, ensure_ascii=False, separators=(',', ':'))};\n"
    )
    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    DATA_PATH.write_text(output, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--local-snapshot", type=Path, help="Import a dated, account-matched local client export")
    args = parser.parse_args()
    existing_rows = read_existing_rows()
    normalized_existing = sort_rows([normalize_existing_row(row) for row in existing_rows if row])
    synced_at = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    if args.local_snapshot:
        remote_games, source_updated_at = read_local_snapshot(args.local_snapshot)
        source = "Steam local client snapshot"
    else:
        remote_games, source = fetch_via_web_api() if API_KEY else fetch_via_xml()
        source_updated_at = synced_at
    validate(remote_games, existing_rows)
    merged_rows = merge_rows(existing_rows, remote_games)
    changed = merged_rows != normalized_existing
    metadata = {
        "synced_at": synced_at,
        "source_updated_at": source_updated_at,
        "source": source,
        "remote_played_games": len(remote_games),
        "archive_rows": len(merged_rows),
        "last_played_refreshed": bool(args.local_snapshot or API_KEY),
        "installed_refreshed": all("installed" in item for item in remote_games),
    }
    write_dataset(merged_rows, metadata)
    print(
        json.dumps(
            {
                "changed": changed,
                "metadata_updated": True,
                "source": source,
                "remote_played_games": len(remote_games),
                "archive_rows": len(merged_rows),
                "ai_api_used": False,
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # Keep the existing website data untouched on failure.
        print(f"Steam synchronization failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
