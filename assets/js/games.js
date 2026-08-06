(() => {
  const rows = Array.isArray(window.STEAM_GAME_ROWS) ? window.STEAM_GAME_ROWS : [];
  const games = rows.map(([id, name, hours, recent, installed, recommendation, steamPositive, lastPlayed, tags], index) => ({
    id,
    name,
    hours,
    recent,
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

  const reviewExcerpts = {
    1238810: "对我这种 FPS 新手来说，它的上手很慢。前面经常根本看不到人就被杀了，但我依然很爱《战地 V》。沉浸感、使命感、悲壮感和残酷感，是战地独有的魅力。",
    1174180: "第一次打开一个小时后就放弃了。后来返校那天外面下着雨，随机歌单放到 That's the Way It Is，我重新把它下载回来。那一刻我知道，这次不会再浅尝辄止。",
    2531310: "这不是一款可以随随便便玩的游戏。它有争议，但正因为如此，亲身经历以后一定会留下自己的判断。最后愤怒也好、赞叹也好，它带来的情绪体验很难被替代。",
    2358720: "最打动我的不只是战斗，而是它打破了很单一的‘中式美学’，把泥塑、怪物和民间视觉元素真正融进了世界。它有瑕疵，但能感到制作上的诚意。",
    1659420: "画面、演出和爽快剧情彻底压过了跑路与战斗的重复。简单但有温情的故事、扎实的地图设计和流畅动作，已经足够组成一部难得的佳作。",
    3035570: "它最让我失望的不是情怀没兑现，而是跑酷、战斗和镜头共同造成的迟滞。地图和画质变好了，但操作与关卡设计让我第一次差点放弃一部刺客信条。",
  };

  const memoryChapters = [
    {
      id: 1174180,
      label: "一段生活与一款游戏重合",
      title: "有些作品需要等到合适的时候",
      text: "《荒野大镖客 2》第一次只玩了一个小时。真正进入它，是后来一个下雨的返校日。游戏本身没有变，变化的是我当时愿意给它的时间。",
    },
    {
      id: 2531310,
      label: "叙事不一定让人舒服",
      title: "留下来的往往不是圆满",
      text: "我很在意游戏能不能制造真正的情绪和思考。它可以让我愤怒、迟疑甚至反感，但只要这些感受来自完整的体验，就比一段安全的剧情更难忘。",
    },
    {
      id: 1238810,
      label: "多人游戏的临场变化",
      title: "无法复刻的一局，比胜负更重要",
      text: "战地吸引我的不是竞技排名，而是前线突然崩开、小队临时改变路线、原本陌生的人自然完成配合。那种现场感每一局都不一样。",
    },
    {
      id: 753640,
      label: "探索与理解",
      title: "世界不是地图上的任务清单",
      text: "我喜欢那些不急着把答案塞给玩家的游戏。探索、观察和自己建立联系的过程，比不断清图和领取奖励更容易让我真正进入一个世界。",
    },
  ];

  const seriesDefinitions = [
    {
      label: "ASSASSIN'S CREED",
      title: "刺客信条",
      test: /刺客信条|Assassin/i,
      text: "从艾吉奥到神话三部曲，再到对《幻景》的强烈失望。这个系列几乎完整记录了我对历史城市、跑酷和开放世界设计的偏好。",
    },
    {
      label: "BATTLEFIELD",
      title: "战地",
      test: /战地|Battlefield/i,
      text: "我并不是传统 FPS 玩家，但大战场、历史氛围和偶然形成的团队协作，让它成为少数会长期回去的多人游戏。",
    },
    {
      label: "METRO",
      title: "地铁",
      test: /地铁|Metro/i,
      text: "压抑的空间、有限资源和缓慢建立起来的末世氛围。它吸引我的不是单纯射击，而是人在地下世界里怎样继续生活。",
    },
    {
      label: "RUSTY LAKE",
      title: "锈湖",
      test: /Rusty Lake|Cube Escape|The Past Within|White Door/i,
      text: "体量不大，却一直保持自己的视觉、谜题和叙事方式。它像一套不断补全的私人暗号。",
    },
    {
      label: "TOMB RAIDER",
      title: "古墓丽影",
      test: /Tomb Raider|古墓丽影/i,
      text: "它代表的是更直接的冒险乐趣：探索遗迹、穿越环境、解谜和一段足够顺畅的电影式旅程。",
    },
    {
      label: "WARHAMMER 40,000",
      title: "战锤 40K",
      test: /Warhammer 40,000|战锤/i,
      text: "桌面模型和电子游戏在这里连到了一起。比起单一作品，我更在意这个庞大世界怎样在不同媒介里继续展开。",
    },
  ];

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

  function shortHours(value) {
    const n = Number(value || 0);
    if (n < 1) return "不到 1 小时";
    return `${n.toLocaleString("zh-CN", { maximumFractionDigits: 1 })} 小时`;
  }

  function setupHeroCycle() {
    const layers = [...document.querySelectorAll(".hero-art-layer")];
    if (layers.length < 2) return;

    const ordered = [...games].sort((a, b) => b.hours - a.hours || a.archiveIndex - b.archiveIndex);
    let gameIndex = 0;
    let activeLayer = 0;

    setAsset(layers[0], ordered[0], "hero", true);
    layers[0].classList.add("is-active");
    setAsset(layers[1], ordered[1], "hero", true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.setInterval(() => {
      gameIndex = (gameIndex + 1) % ordered.length;
      const nextLayer = 1 - activeLayer;
      const nextGame = ordered[gameIndex];
      const preload = new Image();
      const urls = candidates(nextGame, "hero");
      let candidateIndex = 0;

      const tryLoad = () => {
        if (candidateIndex >= urls.length) return;
        preload.src = urls[candidateIndex++];
      };

      preload.onload = () => {
        layers[nextLayer].src = preload.src;
        layers[nextLayer].alt = "";
        layers[nextLayer].classList.add("is-active");
        layers[activeLayer].classList.remove("is-active");
        activeLayer = nextLayer;
      };
      preload.onerror = tryLoad;
      tryLoad();
    }, 9000);
  }

  function setupCoverRibbon() {
    const track = $("#game-cover-track");
    if (!track) return;

    const batchSize = 14;
    let offset = 0;

    function renderBatch() {
      const batch = Array.from({ length: batchSize }, (_, i) => games[(offset + i) % games.length]);
      track.innerHTML = "";

      const appendBatch = () => {
        batch.forEach((game) => {
          const item = document.createElement("div");
          item.className = "cover-ribbon-item";
          item.append(createImage(game, "cover"));
          track.append(item);
        });
      };

      appendBatch();
      appendBatch();
    }

    renderBatch();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    track.addEventListener("animationiteration", () => {
      offset = (offset + batchSize) % games.length;
      track.style.animation = "none";
      renderBatch();
      void track.offsetWidth;
      track.style.animation = "";
    });
  }

  function renderMemories() {
    const container = $("#memory-grid");
    container.innerHTML = "";

    memoryChapters.forEach((chapter) => {
      const game = games.find((item) => item.id === chapter.id);
      if (!game) return;
      const card = document.createElement("article");
      card.className = "memory-card";
      card.append(createImage(game, "hero"));
      const copy = document.createElement("div");
      copy.className = "memory-card-copy";
      copy.innerHTML = `
        <span>${escapeHTML(chapter.label)}</span>
        <h3>${escapeHTML(chapter.title)}</h3>
        <p>${escapeHTML(chapter.text)}</p>
      `;
      card.append(copy);
      container.append(card);
    });
  }

  function renderRecent() {
    const container = $("#recent-game-grid");
    const recent = games
      .filter((game) => game.recent > 0)
      .sort((a, b) => b.recent - a.recent || b.hours - a.hours)
      .slice(0, 8);

    container.innerHTML = "";
    recent.forEach((game) => {
      const card = document.createElement("article");
      card.className = "recent-card";
      const art = document.createElement("div");
      art.className = "recent-card-art";
      art.append(createImage(game, "hero"));
      const copy = document.createElement("div");
      copy.className = "recent-card-copy";
      copy.innerHTML = `
        <h3>${escapeHTML(game.name)}</h3>
        <p>${game.installed ? "现在仍装在电脑里" : `最近游玩于 ${formatDate(game.lastPlayed)}`} · 近两周 ${shortHours(game.recent)}</p>
      `;
      card.append(art, copy);
      container.append(card);
    });
  }

  function renderReviews() {
    const container = $("#featured-review-list");
    const reviewIds = [1174180, 2531310, 1238810, 2358720, 1659420, 3035570];
    container.innerHTML = "";

    reviewIds.forEach((id) => {
      const game = games.find((item) => item.id === id);
      if (!game) return;
      const story = document.createElement("article");
      story.className = "review-story";
      story.append(createImage(game, "hero", "review-story-art"));

      const copy = document.createElement("div");
      copy.className = "review-story-copy";
      copy.innerHTML = `
        <h3>${escapeHTML(game.name)}</h3>
        <blockquote>${escapeHTML(reviewExcerpts[id] || "")}</blockquote>
      `;

      const meta = document.createElement("div");
      meta.className = "review-story-meta";
      const statusClass = game.recommendation === "Not Recommended" ? "bad" : "good";
      const statusText = game.recommendation === "Not Recommended" ? "不推荐" : "推荐";
      meta.innerHTML = `
        <span class="${statusClass}">${statusText}</span>
        ${game.reviewUrl ? `<a href="${game.reviewUrl}" target="_blank" rel="noopener">读完整评测 ↗</a>` : ""}
      `;

      story.append(copy, meta);
      container.append(story);
    });
  }

  function renderSeries() {
    const container = $("#series-grid");
    container.innerHTML = "";

    seriesDefinitions.forEach((series) => {
      const matched = games.filter((game) => series.test.test(game.name));
      if (!matched.length) return;
      const card = document.createElement("article");
      card.className = "series-card";
      card.innerHTML = `
        <span>${series.label}</span>
        <h3>${series.title}</h3>
        <p>${series.text}</p>
        <small>${matched.length} 部已记录作品</small>
      `;
      container.append(card);
    });
  }

  let visibleLimit = 20;
  let installedOnly = false;
  let reviewedOnly = false;

  function setupGenres() {
    const counts = new Map();
    games.forEach((game) => game.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
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

  function filteredGames() {
    const query = $("#game-search-input").value.trim().toLowerCase();
    const genre = $("#genre-filter").value;
    const sort = $("#game-sort").value;

    const result = games.filter((game) => {
      if (installedOnly && !game.installed) return false;
      if (reviewedOnly && !game.reviewUrl) return false;
      if (genre !== "all" && !game.tags.includes(genre)) return false;
      if (!query) return true;
      return `${game.name} ${game.tags.join(" ")}`.toLowerCase().includes(query);
    });

    result.sort((a, b) => {
      if (sort === "recent") return String(b.lastPlayed || "").localeCompare(String(a.lastPlayed || ""));
      if (sort === "hours") return b.hours - a.hours;
      if (sort === "steamPositive") return (b.steamPositive || 0) - (a.steamPositive || 0) || b.hours - a.hours;
      if (sort === "name") return a.name.localeCompare(b.name, "zh-CN");
      return a.archiveIndex - b.archiveIndex;
    });

    return result;
  }

  function renderLibrary(reset = false) {
    if (reset) visibleLimit = 20;
    const filtered = filteredGames();
    const displayed = filtered.slice(0, visibleLimit);
    const container = $("#game-library-grid");
    const resultLine = $("#library-result-line");
    container.innerHTML = "";

    resultLine.textContent = filtered.length === games.length
      ? `这份书架里目前有 ${games.length} 款实际游戏。`
      : `当前筛选显示 ${filtered.length} 款游戏。`;

    if (!displayed.length) {
      container.innerHTML = `<div class="empty-library">没有找到符合条件的游戏。</div>`;
    }

    displayed.forEach((game) => {
      const card = document.createElement("article");
      card.className = "library-game-card";
      const badges = [
        game.installed ? "已安装" : "",
        game.recommendation === "Recommended" ? "我的推荐" : "",
        game.recommendation === "Not Recommended" ? "我的不推荐" : "",
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
            <span>${shortHours(game.hours)}</span>
            <span>${formatDate(game.lastPlayed)}</span>
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
    loadMore.textContent = `继续往下翻（还有 ${Math.max(0, filtered.length - visibleLimit)} 款）`;
  }

  function toggleFilter(button, setter) {
    const next = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(next));
    setter(next);
    renderLibrary(true);
  }

  $("#archive-note").textContent = `Steam 游玩记录更新于 2026 年 8 月。完整书架收录 ${games.length} 款实际游戏。`;

  setupHeroCycle();
  setupCoverRibbon();
  renderMemories();
  renderRecent();
  renderReviews();
  renderSeries();
  setupGenres();
  renderLibrary();

  $("#game-search-input").addEventListener("input", () => renderLibrary(true));
  $("#game-sort").addEventListener("change", () => renderLibrary(true));
  $("#genre-filter").addEventListener("change", () => renderLibrary(true));
  $("#installed-filter").addEventListener("click", (event) => toggleFilter(event.currentTarget, (value) => installedOnly = value));
  $("#reviewed-filter").addEventListener("click", (event) => toggleFilter(event.currentTarget, (value) => reviewedOnly = value));
  $("#load-more-games").addEventListener("click", () => {
    visibleLimit += 20;
    renderLibrary();
  });
})();
