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

  const featuredDefinitions = [
    {
      id: 1174180,
      label: "开放世界 · 慢速沉浸",
      title: "有些游戏需要等到合适的时候",
      text: "《荒野大镖客 2》第一次打开一个小时我就放弃了。后来在一个下雨的返校日重新下载，它才真正开始。它让我意识到，作品没有变，变化的是我终于愿意把自己的节奏交给它。",
    },
    {
      id: 1888930,
      label: "线性叙事 · 情感",
      title: "我第一次如此确定地把游戏称作第九艺术",
      text: "《最后生还者 Part I》对我来说不是“电影化游戏”的简单胜利，而是故事、操作、音乐和结尾同时抵达同一个情绪。成就声与片尾音乐一起响起时，形式和情感真正合在了一起。",
    },
    {
      id: 2531310,
      label: "线性叙事 · 冲突",
      title: "我不要求剧情让我舒服",
      text: "《最后生还者 Part II》最重要的价值，是它让我带着愤怒行动，再强迫我面对另一套完整的动机。它不替任何人洗白，也没有把矛盾轻易解决；我喜欢的正是这种不圆满和争议。",
    },
    {
      id: 1811040,
      label: "独立游戏 · 互动叙事",
      title: "选择不一定要改变结局，也可以只是让我感受",
      text: "《极圈以南》的情绪图形几乎不改变剧情，却让慌张、坚定、温暖和低落变得可以被操作。它让我明白，游戏的交互不只负责分支，也可以负责把一个人的情感交到玩家手里。",
    },
    {
      id: 683320,
      label: "独立游戏 · 视觉表达",
      title: "简约不是空白，而是繁复之后仍有分寸",
      text: "《GRIS》的画面、音乐和玩法都很丰满，却从不互相争抢。它让我重新理解所谓“艺术游戏”：不是少说话、少画几笔，而是每一种表达都知道自己应该停在哪里。",
    },
    {
      id: 609320,
      label: "独立游戏 · 空间感",
      title: "我会对狭小、熟悉、完全可控的空间产生依恋",
      text: "《FAR: Lone Sails》里的车像一层移动的保护壳。我收集燃料、摆放小物件，也把安全感一点点放进去。旅程结束时失去这层外壳，反而让我更清楚地感到：人总要学会在没有保护的时候继续往前。",
    },
    {
      id: 2358720,
      label: "动作冒险 · 中式美学",
      title: "中式美学不该只是洁净、漂亮和古风",
      text: "《黑神话：悟空》让我在泥塑、怪物和民间视觉里感到一种非常具体的亲切。它有不少瑕疵，但它证明了中式美学可以粗粝、怪异、可怖，也仍然让中国玩家一眼认出自己文化里的东西。",
    },
    {
      id: 287390,
      label: "线性剧情 · 氛围生存",
      title: "好的机制会把我从“完成任务”带进世界",
      text: "《地铁：最后的曙光》里的道德点一开始只是通往好结局的条件，后来却让我认真听完对话、观察开放区域、理解黑暗族和不同阵营。机制没有单独说教，而是逐渐改变了我的游玩方式。",
    },
    {
      id: 911400,
      label: "历史动作 · 后劲",
      title: "我愿意承认一部游戏的后劲推翻了第一印象",
      text: "《刺客信条 3》刚结束时让我愤怒，很多系统和演出至今仍然糟糕。但康纳、海尔森和那段历史慢慢留了下来。最后我改成好评，不是忘记缺点，而是承认人物和叙事后来真的压过了它们。",
    },
    {
      id: 1341820,
      label: "互动电影 · 人物弧光",
      title: "分支数量不是互动叙事最重要的东西",
      text: "《日落黄昏时》真正打动我的是杰·霍尔特和其他人物如何带着缺陷活下去。公路片与选择系统只是形式，人物能否承担自己的过去、走出自己的阴影，才决定一段互动故事有没有重量。",
    },
  ];

  const principles = [
    {
      number: "01",
      title: "我不把“让我不舒服”当成叙事失败",
      text: "只要冲突来自人物和世界本身，我愿意接受愤怒、压抑、遗憾甚至反感。比起安全地取悦玩家，我更看重作品有没有勇气把矛盾真正推到底。",
      games: "《最后生还者 Part II》 · 《极圈以南》 · 《日落黄昏时》",
    },
    {
      number: "02",
      title: "我需要世界允许我慢下来",
      text: "开放世界对我来说不是任务数量，而是我是否愿意不看地图地走一段路、观察一个地方、在没有奖励的时候仍然留下。地图很大并不等于世界成立。",
      games: "《荒野大镖客 2》 · 《黑神话：悟空》",
    },
    {
      number: "03",
      title: "我相信小体量也能容纳完整经验",
      text: "五六个小时足够建立一种美术语言、一种空间感和一段明确的情绪。独立游戏最吸引我的，不是“以小博大”，而是它们往往更清楚自己到底想表达什么。",
      games: "《GRIS》 · 《孤帆远航》 · 《极圈以南》",
    },
    {
      number: "04",
      title: "我允许自己的评价在通关后继续变化",
      text: "刚结束时的感受很重要，但不是最后裁决。人物的后劲、重新理解的细节和一段时间后的回想，都可以让我推翻原来的结论。",
      games: "《刺客信条 3》 · 《荒野大镖客 2》",
    },
  ];

  const categoryDefinitions = [
    {
      label: "OPEN WORLD",
      title: "开放世界",
      text: "我需要的不是更大的地图，而是一个值得停留的地方。世界应该能在任务之外继续成立，让赶路、观察和偶然相遇本身也有意义。",
      ids: [1174180, 2358720, 911400],
    },
    {
      label: "LINEAR NARRATIVE",
      title: "线性剧情",
      text: "我不排斥作者替我控制节奏。相反，当演出、关卡和人物弧光能够精确配合时，线性结构往往比无限自由更有力量。",
      ids: [1888930, 2531310, 287390],
    },
    {
      label: "INDEPENDENT GAMES",
      title: "独立游戏",
      text: "我会被明确的美术语言、克制的机制和完整的小型表达吸引。体量不是价值，表达是否集中才是。",
      ids: [1811040, 683320, 609320],
    },
    {
      label: "INTERACTIVE DRAMA",
      title: "互动叙事",
      text: "我在意的不是有多少条分支，而是选择有没有让我更接近人物。即使结局不变，交互也可以改变我理解一段关系的方式。",
      ids: [1341820, 1811040, 1222140],
    },
  ];

  const voiceDefinitions = [
    { id: 1174180, quote: "买了吃灰、玩不下去都没关系。有些游戏只是还没有等到你真正想进入它的那一天。" },
    { id: 2531310, quote: "没有人真正原谅了对方的所作所为，大家在做的只不过是与自己和解。" },
    { id: 1811040, quote: "我们的意义，就是那样存在过，有过情感，有过挣扎，有过爱与痛。" },
    { id: 609320, quote: "我总要学会怎么前进，不管是坐在车里，还是走在路上。" },
    { id: 287390, quote: "了解越多，越是会珍惜；每一个善意的举动，其实也是对自己行为的审视。" },
    { id: 1341820, quote: "自我救赎或和解，也许正是我们大多数人终其一生循环往复的过程。" },
  ];

  const featuredGames = featuredDefinitions
    .map((definition) => games.find((game) => game.id === definition.id))
    .filter(Boolean);

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

  function setupHeroCycle() {
    const layers = [...document.querySelectorAll(".hero-art-layer")];
    if (layers.length < 2 || !featuredGames.length) return;

    let index = 0;
    let activeLayer = 0;
    setAsset(layers[0], featuredGames[0], "hero", true);
    if (featuredGames[1]) setAsset(layers[1], featuredGames[1], "hero", true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    window.gameHeroTimer = window.setInterval(() => {
      index = (index + 1) % featuredGames.length;
      const nextLayer = 1 - activeLayer;
      const nextGame = featuredGames[index];
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
    }, 10000);
  }

  function setupCoverRibbon() {
    const track = $("#game-cover-track");
    if (!track) return;

    const batchSize = Math.min(16, games.length);
    let offset = 0;

    function renderBatch() {
      const batch = Array.from({ length: batchSize }, (_, i) => games[(offset + i) % games.length]);
      track.innerHTML = "";

      for (let copy = 0; copy < 2; copy += 1) {
        batch.forEach((game) => {
          const item = document.createElement("div");
          item.className = "cover-ribbon-item";
          item.title = game.name;
          item.append(createImage(game, "cover"));
          track.append(item);
        });
      }
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

  function renderFeatured() {
    const container = $("#featured-game-grid");
    if (!container) return;
    container.innerHTML = "";

    featuredDefinitions.forEach((definition) => {
      const game = games.find((item) => item.id === definition.id);
      if (!game) return;

      const card = document.createElement("article");
      card.className = "memory-card featured-game-card";
      card.append(createImage(game, "hero"));

      const copy = document.createElement("div");
      copy.className = "memory-card-copy";
      copy.innerHTML = `
        <span>${escapeHTML(definition.label)}</span>
        <h3>${escapeHTML(game.name)}</h3>
        <h4>${escapeHTML(definition.title)}</h4>
        <p>${escapeHTML(definition.text)}</p>
        <div class="featured-game-links">
          <a href="${game.store}" target="_blank" rel="noopener">Steam ↗</a>
          ${game.reviewUrl ? `<a href="${game.reviewUrl}" target="_blank" rel="noopener">我的完整评测 ↗</a>` : ""}
        </div>
      `;
      card.append(copy);
      container.append(card);
    });
  }

  function renderPrinciples() {
    const container = $("#principle-grid");
    if (!container) return;
    container.innerHTML = principles.map((item) => `
      <article class="principle-card">
        <span>${item.number}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.text)}</p>
        <small>${escapeHTML(item.games)}</small>
      </article>
    `).join("");
  }

  function renderCategories() {
    const container = $("#category-grid");
    if (!container) return;
    container.innerHTML = "";

    categoryDefinitions.forEach((category) => {
      const matched = category.ids.map((id) => games.find((game) => game.id === id)).filter(Boolean);
      const card = document.createElement("article");
      card.className = "series-card category-card";
      card.innerHTML = `
        <span>${escapeHTML(category.label)}</span>
        <h3>${escapeHTML(category.title)}</h3>
        <p>${escapeHTML(category.text)}</p>
        <div class="category-games">${matched.map((game) => `<a href="${game.store}" target="_blank" rel="noopener">${escapeHTML(game.name)}</a>`).join("")}</div>
      `;
      container.append(card);
    });
  }

  function renderRevisionCover() {
    const container = $("#revision-cover");
    const game = games.find((item) => item.id === 911400);
    if (!container || !game) return;
    container.innerHTML = "";
    container.append(createImage(game, "cover", "", true));
  }

  function renderVoices() {
    const container = $("#voice-list");
    if (!container) return;
    container.innerHTML = "";

    voiceDefinitions.forEach((definition) => {
      const game = games.find((item) => item.id === definition.id);
      if (!game) return;

      const story = document.createElement("article");
      story.className = "review-story";
      story.append(createImage(game, "hero", "review-story-art"));

      const copy = document.createElement("div");
      copy.className = "review-story-copy";
      copy.innerHTML = `
        <h3>${escapeHTML(game.name)}</h3>
        <blockquote>“${escapeHTML(definition.quote)}”</blockquote>
      `;

      const meta = document.createElement("div");
      meta.className = "review-story-meta";
      meta.innerHTML = game.reviewUrl
        ? `<a href="${game.reviewUrl}" target="_blank" rel="noopener">读完整评测 ↗</a>`
        : `<a href="${game.store}" target="_blank" rel="noopener">Steam ↗</a>`;

      story.append(copy, meta);
      container.append(story);
    });
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
    if (loadMore) {
      loadMore.hidden = visibleLimit >= filtered.length;
      loadMore.textContent = `继续往下翻（还有 ${Math.max(0, filtered.length - visibleLimit)} 项）`;
    }
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

  setupHeroCycle();
  setupCoverRibbon();
  renderFeatured();
  renderPrinciples();
  renderCategories();
  renderRevisionCover();
  renderVoices();
  setupLibrary();
  setupMotionToggle();
})();
