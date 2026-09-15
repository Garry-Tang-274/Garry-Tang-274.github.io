(() => {
  const rows = Array.isArray(window.STEAM_GAME_ROWS) ? window.STEAM_GAME_ROWS : [];
  const games = rows.map(([id, name, hours, recent, installed, recommendation, steamPositive, lastPlayed, tags], index) => ({
    id,
    name,
    hours: Number(hours || 0),
    recent: Number(recent || 0),
    installed: Boolean(installed),
    recommendation: recommendation === "R" ? "Recommended" : recommendation === "N" ? "Not Recommended" : null,
    steamPositive,
    lastPlayed,
    tags: tags ? tags.split("|").filter(Boolean) : [],
    archiveIndex: index,
    store: `https://store.steampowered.com/app/${id}/`,
    reviewUrl: recommendation ? `https://steamcommunity.com/id/Tang0630paradise/recommended/${id}/` : null,
  }));

  if (!games.length) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const officialBase = (id) => `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${id}`;
  const legacyBase = (id) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}`;

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    })[char]);
  }

  function candidates(game, kind = "cover") {
    if (kind === "hero") {
      return [
        `${officialBase(game.id)}/library_hero_2x.jpg`,
        `${officialBase(game.id)}/library_hero.jpg`,
        `${legacyBase(game.id)}/library_hero.jpg`,
        `${officialBase(game.id)}/header.jpg`,
        `${legacyBase(game.id)}/header.jpg`,
      ];
    }
    return [
      `${officialBase(game.id)}/library_600x900_2x.jpg`,
      `${officialBase(game.id)}/library_600x900.jpg`,
      `${legacyBase(game.id)}/library_600x900.jpg`,
      `${officialBase(game.id)}/library_capsule.jpg`,
      `${officialBase(game.id)}/header.jpg`,
      `${legacyBase(game.id)}/header.jpg`,
    ];
  }

  function setAsset(img, game, kind = "cover", eager = false) {
    const urls = candidates(game, kind);
    let index = 0;
    img.alt = game.name;
    img.referrerPolicy = "no-referrer";
    img.decoding = "async";
    img.loading = eager ? "eager" : "lazy";

    const loadNext = () => {
      if (index >= urls.length) {
        img.removeAttribute("src");
        img.classList.add("asset-missing");
        return;
      }
      img.src = urls[index++];
    };

    img.addEventListener("error", loadNext);
    loadNext();
  }

  function createImage(game, kind = "cover", className = "", eager = false) {
    const img = document.createElement("img");
    if (className) img.className = className;
    setAsset(img, game, kind, eager);
    return img;
  }

  function formatDate(iso) {
    if (!iso) return "未记录";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  }

  function renderRevisionCover() {
    const container = $("#revision-cover");
    const game = games.find((item) => item.id === 911400);
    if (!container || !game) return;
    container.innerHTML = "";
    container.append(createImage(game, "cover", "", true));
  }

  let visibleLimit = 20;
  let installedOnly = false;
  let reviewedOnly = false;
  let libraryInitialized = false;

  function setupGenres() {
    const select = $("#genre-filter");
    if (!select || select.options.length > 1) return;

    const tags = [...new Set(games.flatMap((game) => game.tags))].filter(Boolean).sort((a, b) => a.localeCompare(b, "zh-CN"));
    tags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      select.append(option);
    });
  }

  function filteredGames() {
    const query = $("#game-search-input")?.value.trim().toLowerCase() || "";
    const genre = $("#genre-filter")?.value || "all";
    const sort = $("#game-sort")?.value || "memory";

    const result = games.filter((game) => {
      if (installedOnly && !game.installed) return false;
      if (reviewedOnly && !game.reviewUrl) return false;
      if (genre !== "all" && !game.tags.includes(genre)) return false;
      if (!query) return true;
      return `${game.name} ${game.tags.join(" ")}`.toLowerCase().includes(query);
    });

    result.sort((a, b) => {
      if (sort === "recent") return String(b.lastPlayed || "").localeCompare(String(a.lastPlayed || ""));
      if (sort === "reviewed") return Number(Boolean(b.reviewUrl)) - Number(Boolean(a.reviewUrl)) || a.archiveIndex - b.archiveIndex;
      if (sort === "name") return a.name.localeCompare(b.name, "zh-CN");
      return a.archiveIndex - b.archiveIndex;
    });

    return result;
  }

  function renderLibrary(reset = false) {
    if (!libraryInitialized) return;
    if (reset) visibleLimit = 20;

    const filtered = filteredGames();
    const displayed = filtered.slice(0, visibleLimit);
    const container = $("#game-library-grid");
    const resultLine = $("#library-result-line");
    if (!container || !resultLine) return;

    container.innerHTML = "";
    resultLine.textContent = `当前显示 ${Math.min(displayed.length, filtered.length)} / ${filtered.length} 项。`;

    if (!displayed.length) {
      container.innerHTML = `<div class="empty-library">没有找到符合条件的游戏。</div>`;
    }

    displayed.forEach((game) => {
      const card = document.createElement("article");
      card.className = "library-game-card";
      const badges = [
        game.installed ? "已安装" : "",
        game.recommendation === "Recommended" ? "评测：推荐" : "",
        game.recommendation === "Not Recommended" ? "评测：不推荐" : "",
      ].filter(Boolean).map((label) => `<span>${label}</span>`).join("");

      card.innerHTML = `
        <div class="library-game-cover">
          <div class="library-cover-slot"></div>
          <div class="library-game-badges">${badges}</div>
        </div>
        <div class="library-game-copy">
          <h3>${escapeHTML(game.name)}</h3>
          <p>${escapeHTML(game.tags.slice(0, 4).join(" · ") || "Steam 游戏")}</p>
          <div class="library-game-meta">
            <span>${game.hours.toLocaleString("zh-CN")} 小时</span>
            ${game.lastPlayed ? `<span>上次游玩 ${escapeHTML(formatDate(game.lastPlayed))}</span>` : ""}
          </div>
          <div class="library-game-links">
            <a href="${game.store}" target="_blank" rel="noopener">商店 ↗</a>
            ${game.reviewUrl ? `<a href="${game.reviewUrl}" target="_blank" rel="noopener">完整评测 ↗</a>` : ""}
          </div>
        </div>
      `;

      $(".library-cover-slot", card).append(createImage(game));
      container.append(card);
    });

    const loadMore = $("#load-more-games");
    if (loadMore) {
      loadMore.hidden = visibleLimit >= filtered.length;
      loadMore.textContent = `继续往下翻（还有 ${Math.max(0, filtered.length - visibleLimit)} 项）`;
    }
  }

  function renderSyncStatus() {
    const status = $("#library-sync-status");
    const metadata = window.STEAM_SYNC_META;
    if (!status || !metadata) return;
    const date = formatDate(metadata.source_updated_at || metadata.synced_at);
    const source = metadata.source === "Steam local client snapshot" ? "本机 Steam 记录" : "Steam";
    const played = games.filter((game) => game.hours > 0).length;
    status.textContent = `${games.length} 款游戏 · ${played} 款有游玩时长 · ${source}更新至 ${date}`;
  }

  function setupLibrary() {
    const details = $("#library-details");
    if (!details) return;

    details.addEventListener("toggle", () => {
      if (!details.open || libraryInitialized) return;
      libraryInitialized = true;
      setupGenres();
      renderLibrary(true);
    });

    $("#game-search-input")?.addEventListener("input", () => renderLibrary(true));
    $("#game-sort")?.addEventListener("change", () => renderLibrary(true));
    $("#genre-filter")?.addEventListener("change", () => renderLibrary(true));

    $("#installed-filter")?.addEventListener("click", (event) => {
      installedOnly = event.currentTarget.getAttribute("aria-pressed") !== "true";
      event.currentTarget.setAttribute("aria-pressed", String(installedOnly));
      renderLibrary(true);
    });

    $("#reviewed-filter")?.addEventListener("click", (event) => {
      reviewedOnly = event.currentTarget.getAttribute("aria-pressed") !== "true";
      event.currentTarget.setAttribute("aria-pressed", String(reviewedOnly));
      renderLibrary(true);
    });

    $("#load-more-games")?.addEventListener("click", () => {
      visibleLimit += 20;
      renderLibrary();
    });
  }

  function setupMotionToggle() {
    const button = $("#game-motion-toggle");
    const backdrop = $("#game-world-backdrop");
    if (!button || !backdrop) return;

    button.addEventListener("click", () => {
      const paused = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(paused));
      backdrop.classList.toggle("motion-paused", paused);
      button.textContent = paused ? "继续流动背景" : "暂停流动背景";
    });
  }

  renderRevisionCover();
  renderSyncStatus();
  setupLibrary();
  setupMotionToggle();
})();
