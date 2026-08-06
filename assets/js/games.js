(() => {
  const rows = Array.isArray(window.STEAM_GAME_ROWS) ? window.STEAM_GAME_ROWS : [];
  const games = rows.map(([id, name, hours, recent, installed, recommendation, steamPositive, lastPlayed, tags]) => ({
    id,
    name,
    hours,
    recent,
    installed: Boolean(installed),
    recommendation: recommendation === "R" ? "Recommended" : recommendation === "N" ? "Not Recommended" : null,
    steamPositive,
    lastPlayed,
    tags: tags ? tags.split("|").filter(Boolean) : [],
    store: `https://store.steampowered.com/app/${id}/`,
    reviewUrl: recommendation ? `https://steamcommunity.com/id/Tang0630paradise/recommended/${id}/` : null,
  }));
  if (!games.length) return;

  const featuredReviews = {
    1238810: "快100小时了，多人模式快60小时了，终于到了40级，不再是薯条了。对我这种 FPS 废物来说，这是一个上手很慢的游戏，前面根本看不到人就被杀了。就算这样我依然很爱战地五。沉浸感、使命感、悲壮感、残酷感——这是战地独有的浪漫魅力。",
    1174180: "初次玩是在高考完的暑假，打开一个小时后放弃。大一下返校报道日，外面下着雨，随机歌单切到了 That's the Way It Is，于是一时兴起下了回来。天正半黑，雨声刚好能透过耳机听见——我知道，这次我不会再浅尝辄止了。",
    2483190: "手感很棒，比四五代都提升了不少，玩法依旧优秀。主要问题是城市风景的塑料感、光追优化和远景 LOD。建议放下期待来玩：缺点不少，但依然算得上八十分左右的良作。",
    2358720: "作为我玩的第一款以战斗为主的动作游戏，它对新手相当友好。最打动我的不是难度，而是它打破了早年间单一的‘中式美学’，把泥塑、怪物和民间视觉元素真正融进了世界里。",
    1659420: "目前为止玩过最好的寻宝游戏。跑路和干架的重复当然存在，但画面、演出和爽快剧情彻底压过了这些短板。简单却有温情的故事、扎实的地图设计和流畅动作，已经足以组成一部难得的佳作。",
    3035570: "噱头是回归老刺客，但除了地图大小，实际体验和老作品没有多少可比性。最难接受的是跑酷、战斗和镜头共同造成的迟滞感；情怀无法抵消操作和关卡设计上的问题。",
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const officialBase = (id) => `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${id}`;
  const legacyBase = (id) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}`;

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

  function setAsset(img, game, kind = "cover") {
    const urls = candidates(game, kind);
    let index = 0;
    img.alt = game.name;
    img.referrerPolicy = "no-referrer";
    img.decoding = "async";
    img.loading = "lazy";

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

  function shuffled(list, seed = 7) {
    const copy = [...list];
    let state = seed;
    for (let i = copy.length - 1; i > 0; i--) {
      state = (state * 9301 + 49297) % 233280;
      const j = Math.floor((state / 233280) * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const backgroundGames = shuffled(games, 274);

  function renderLane(lane) {
    const kind = lane.dataset.kind || "cover";
    const size = Number(lane.dataset.size || 16);
    const offset = Number(lane.dataset.offset || 0) % backgroundGames.length;
    const batch = Array.from({ length: size }, (_, i) => backgroundGames[(offset + i) % backgroundGames.length]);
    lane.innerHTML = "";

    const makeTrack = () => {
      const track = document.createElement("div");
      track.className = "art-track";
      batch.forEach((game) => {
        const tile = document.createElement("div");
        tile.className = "art-tile";
        const image = document.createElement("img");
        setAsset(image, game, kind);
        const label = document.createElement("span");
        label.textContent = game.name;
        tile.append(image, label);
        track.append(tile);
      });
      return track;
    };

    lane.append(makeTrack(), makeTrack());
    lane.dataset.offset = String((offset + size) % backgroundGames.length);
  }

  const lanes = $$(".art-lane");
  lanes.forEach(renderLane);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lanes.forEach((lane, laneIndex) => {
      window.setInterval(() => {
        lane.classList.add("is-refreshing");
        window.setTimeout(() => {
          renderLane(lane);
          lane.classList.remove("is-refreshing");
        }, 480);
      }, 26000 + laneIndex * 4700);
    });
  }

  const formatHours = (hours) => `${Number(hours).toLocaleString("zh-CN", { maximumFractionDigits: 1 })} h`;
  const formatDate = (iso) => {
    if (!iso) return "未记录";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  };

  function createImage(game, kind = "cover", className = "") {
    const img = document.createElement("img");
    if (className) img.className = className;
    setAsset(img, game, kind);
    return img;
  }

  function renderRecent() {
    const container = $("#recent-game-grid");
    const recent = games.filter((game) => game.recent > 0).sort((a, b) => b.recent - a.recent).slice(0, 8);
    container.innerHTML = "";

    recent.forEach((game) => {
      const card = document.createElement("article");
      card.className = "recent-card";
      const img = createImage(game);
      const copy = document.createElement("div");
      copy.className = "recent-card-copy";
      copy.innerHTML = `
        <span>近两周 ${formatHours(game.recent)}</span>
        <h3>${escapeHTML(game.name)}</h3>
        <p>累计 ${formatHours(game.hours)} · ${game.installed ? "当前已安装" : `最后游玩 ${formatDate(game.lastPlayed)}`}</p>
      `;
      card.append(img, copy);
      container.append(card);
    });
  }

  function renderRanking() {
    const container = $("#playtime-ranking");
    const top = [...games].sort((a, b) => b.hours - a.hours).slice(0, 12);
    const max = top[0]?.hours || 1;
    container.innerHTML = "";

    top.forEach((game, index) => {
      const row = document.createElement("article");
      row.className = "rank-row";
      row.innerHTML = `
        <span class="rank-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="rank-cover-slot"></div>
        <div class="rank-main">
          <h3>${escapeHTML(game.name)}</h3>
          <div class="rank-bar"><i style="width:${Math.max(4, game.hours / max * 100)}%"></i></div>
        </div>
        <strong class="rank-hours">${formatHours(game.hours)}</strong>
      `;
      $(".rank-cover-slot", row).append(createImage(game, "cover", "rank-cover"));
      container.append(row);
    });
  }

  function renderGenres() {
    const counts = new Map();
    games.forEach((game) => {
      game.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
    });
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    const max = top[0]?.[1] || 1;
    const container = $("#genre-bars");
    container.innerHTML = top.map(([tag, count]) => `
      <div class="genre-row">
        <span>${escapeHTML(tag)}</span>
        <i><b style="width:${count / max * 100}%"></b></i>
        <strong>${count}</strong>
      </div>
    `).join("");

    const select = $("#genre-filter");
    [...counts.entries()]
      .filter(([tag]) => tag)
      .sort((a, b) => a[0].localeCompare(b[0], "zh-CN"))
      .forEach(([tag, count]) => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = `${tag}（${count}）`;
        select.append(option);
      });
  }

  function renderFranchises() {
    const definitions = [
      { label: "ASSASSIN'S CREED", title: "刺客信条", test: /刺客信条|Assassin/i },
      { label: "BATTLEFIELD", title: "战地", test: /战地|Battlefield/i },
      { label: "METRO", title: "地铁", test: /地铁|Metro/i },
      { label: "TOMB RAIDER", title: "古墓丽影", test: /Tomb Raider|古墓丽影/i },
      { label: "RUSTY LAKE", title: "锈湖", test: /Rusty Lake|Cube Escape|The Past Within/i },
      { label: "WARHAMMER", title: "战锤 40,000", test: /Warhammer 40,000|战锤/i },
    ];

    const container = $("#franchise-grid");
    container.innerHTML = definitions.map((series) => {
      const matched = games.filter((game) => series.test.test(game.name));
      const hours = matched.reduce((sum, game) => sum + game.hours, 0);
      return `
        <article class="franchise-card">
          <span>${series.label}</span>
          <h3>${series.title}</h3>
          <strong>${hours.toFixed(1)} h</strong>
          <p>${matched.length} 款游戏</p>
        </article>
      `;
    }).join("");
  }

  function truncate(text, max = 330) {
    if (!text) return "";
    const normalized = text.replace(/\s+/g, " ").trim();
    return normalized.length > max ? `${normalized.slice(0, max - 1)}…` : normalized;
  }

  function renderReviews() {
    const ids = [1238810, 1174180, 2483190, 2358720, 1659420, 3035570];
    const featured = ids.map((id) => games.find((game) => game.id === id)).filter(Boolean);
    const container = $("#featured-review-grid");
    container.innerHTML = "";

    featured.forEach((game) => {
      const card = document.createElement("article");
      card.className = "review-card";
      const statusClass = game.recommendation === "Not Recommended" ? "bad" : "good";
      const statusText = game.recommendation === "Not Recommended" ? "不推荐" : "推荐";
      card.innerHTML = `
        <div class="review-card-head">
          <div class="review-cover-slot"></div>
          <div>
            <h3>${escapeHTML(game.name)}</h3>
            <span class="review-status ${statusClass}">${statusText} · ${formatHours(game.hours)}</span>
          </div>
        </div>
        <blockquote>${escapeHTML(truncate(featuredReviews[game.id], 360))}</blockquote>
        ${game.reviewUrl ? `<a href="${game.reviewUrl}" target="_blank" rel="noopener">阅读 Steam 原评测 ↗</a>` : ""}
      `;
      $(".review-cover-slot", card).append(createImage(game));
      container.append(card);
    });
  }

  let visibleLimit = 24;
  let installedOnly = false;
  let reviewedOnly = false;

  function filteredGames() {
    const query = $("#game-search-input").value.trim().toLowerCase();
    const genre = $("#genre-filter").value;
    const sort = $("#game-sort").value;

    const result = games.filter((game) => {
      if (installedOnly && !game.installed) return false;
      if (reviewedOnly && !game.reviewUrl) return false;
      if (genre !== "all" && !game.tags.includes(genre)) return false;
      if (!query) return true;
      const haystack = [game.name, game.tags.join(" ")].join(" ").toLowerCase();
      return haystack.includes(query);
    });

    result.sort((a, b) => {
      if (sort === "recent") return b.recent - a.recent || b.hours - a.hours;
      if (sort === "lastPlayed") return String(b.lastPlayed || "").localeCompare(String(a.lastPlayed || ""));
      if (sort === "steamPositive") return (b.steamPositive || 0) - (a.steamPositive || 0) || b.hours - a.hours;
      if (sort === "name") return a.name.localeCompare(b.name, "zh-CN");
      return b.hours - a.hours;
    });
    return result;
  }

  function renderLibrary(resetLimit = false) {
    if (resetLimit) visibleLimit = 24;
    const filtered = filteredGames();
    const displayed = filtered.slice(0, visibleLimit);
    const container = $("#game-library-grid");
    container.innerHTML = "";
    $("#library-count").textContent = filtered.length;

    if (!displayed.length) {
      container.innerHTML = `<div class="empty-library">没有找到符合条件的游戏。</div>`;
    }

    displayed.forEach((game) => {
      const card = document.createElement("article");
      card.className = "library-game-card";
      const status = game.recommendation === "Recommended"
        ? `<span>我的推荐</span>`
        : game.recommendation === "Not Recommended"
          ? `<span>我的不推荐</span>`
          : "";
      const positive = game.steamPositive != null ? `<span>Steam ${game.steamPositive}%</span>` : "";
      const installed = game.installed ? `<span>已安装</span>` : "";

      card.innerHTML = `
        <div class="library-game-cover">
          <div class="library-cover-slot"></div>
          <div class="library-game-badges">${installed}${status}${positive}</div>
        </div>
        <div class="library-game-copy">
          <h3>${escapeHTML(game.name)}</h3>
          <p>${escapeHTML(game.tags.slice(0, 4).join(" · ") || "Steam 游戏")}</p>
          <div class="library-game-meta">
            <span>累计 <strong>${formatHours(game.hours)}</strong></span>
            <span>${game.recent > 0 ? `近两周 ${formatHours(game.recent)}` : formatDate(game.lastPlayed)}</span>
          </div>
          <div class="library-game-links">
            <a href="${game.store}" target="_blank" rel="noopener">商店 ↗</a>
            ${game.reviewUrl ? `<a href="${game.reviewUrl}" target="_blank" rel="noopener">我的评测 ↗</a>` : ""}
          </div>
        </div>
      `;
      $(".library-cover-slot", card).append(createImage(game));
      container.append(card);
    });

    const loadMore = $("#load-more-games");
    loadMore.hidden = visibleLimit >= filtered.length;
    loadMore.textContent = `继续显示（还剩 ${Math.max(0, filtered.length - visibleLimit)} 款）`;
  }

  function toggleFilter(button, stateSetter) {
    const next = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(next));
    stateSetter(next);
    renderLibrary(true);
  }

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    })[char]);
  }

  renderRecent();
  renderRanking();
  renderGenres();
  renderFranchises();
  renderReviews();
  renderLibrary();

  $("#game-search-input").addEventListener("input", () => renderLibrary(true));
  $("#game-sort").addEventListener("change", () => renderLibrary(true));
  $("#genre-filter").addEventListener("change", () => renderLibrary(true));
  $("#installed-filter").addEventListener("click", (event) => toggleFilter(event.currentTarget, (value) => installedOnly = value));
  $("#reviewed-filter").addEventListener("click", (event) => toggleFilter(event.currentTarget, (value) => reviewedOnly = value));
  $("#load-more-games").addEventListener("click", () => {
    visibleLimit += 24;
    renderLibrary();
  });
})();
