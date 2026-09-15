(() => {
  if (window.__GAME_PERSPECTIVE_LOADED__) return;
  window.__GAME_PERSPECTIVE_LOADED__ = true;

  const rows = Array.isArray(window.STEAM_GAME_ROWS) ? window.STEAM_GAME_ROWS : [];
  if (!rows.length) return;

  const games = rows.map(([id, name, hours, recent, installed, recommendation, steamPositive, lastPlayed, tags], index) => ({
    id: Number(id),
    name: String(name || `Steam App ${id}`),
    hours: Number(hours || 0),
    recent: Number(recent || 0),
    installed: Boolean(installed),
    recommendation,
    steamPositive,
    lastPlayed,
    tags: tags ? String(tags).split("|").filter(Boolean) : [],
    index,
    store: `https://store.steampowered.com/app/${id}/`,
    review: recommendation ? `https://steamcommunity.com/id/Tang0630paradise/recommended/${id}/` : null,
  }));

  const playedGames = games.filter((game) => game.hours > 0);
  const byId = new Map(games.map((game) => [game.id, game]));
  const officialBase = (id) => `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${id}`;
  const legacyBase = (id) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}`;
  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[char]);

  // Excerpts from the author's Steam reviews, verified on 2026-09-15.
  const featured = [
  [
    1174180,
    "荒野大镖客 2",
    "雨天重开",
    "大一下，返校报道日，一整个空闲的下午。外面下着雨，闲着没事干，随机歌单切到了That's the way it is，于是一时兴起下了回来。",
    "54% 42%"
  ],
  [
    1888930,
    "最后生还者 Part I",
    "通关的那一刻",
    "结尾的bgm和成就声一起响起的那一刻艺术已成\n并且dlc也水平极高\n这是真正有情感的作品！",
    "38% 46%"
  ],
  [
    2531310,
    "最后生还者 Part II",
    "复仇与和解",
    "没有人真正原谅了对方的所作所为，大家在做的只不过是与自己和解。每个人都是受害者，又都是加害者，在你死我活的漩涡里达成了一种精疲力尽的清醒。",
    "64% 42%"
  ],
  [
    1811040,
    "极圈以南",
    "选一个情绪",
    "这些情绪的选择不会左右剧情，就连对话也大同小异，它们只是让玩家去感受。感受。",
    "58% 45%"
  ],
  [
    683320,
    "GRIS",
    "画面与音乐",
    "真正的简约可以是繁复而不失分寸的画面，丰满却不为难的体验，动听却不喧宾夺主的音乐和简单但富有感染力的剧情。而这正是色灰的一切。",
    "50% 50%"
  ],
  [
    609320,
    "孤帆远航",
    "冰雹中的小车",
    "前半段游戏我一直无感，直到冰雹那一段，外面大风呼啸，冰雹砸在车上发出叮叮当当的声音，一种被保护的感觉油然而生。仿佛回到了从前夜间坐车走山路，外面一片漆黑，只有车灯照亮一小块地方，车内暖色的光亮着，父母就在身边，还放着音乐。",
    "50% 50%"
  ],
  [
    2358720,
    "黑神话：悟空",
    "小西天的泥塑金刚",
    "作为一个中国人，我在见到游戏里的某些怪物时会生出一种很亲切的感觉，尽管那些怪物奇形怪状，我也从来没听说过，但他身上的某些元素就是会让我感到中式美学的完美融入（比如小西天的泥塑金刚）。",
    "64% 42%"
  ],
  [
    287390,
    "地铁：最后的曙光",
    "为了道德点停下来",
    "在我为了道德点听了几段对话之后，我发现这些对话真的很有意思，而且可以补全世界观，之后每当出现有字幕的对话时，我都会认真听完，每个开放区域我也会仔细观察，也找到了不少有意思的彩蛋。",
    "44% 46%"
  ],
  [
    911400,
    "刺客信条 3",
    "改了四次的评测",
    "不行了后劲越来越大是怎么回事，康纳这个悲剧刺客大师的冲击后劲真的有点猛。",
    "36% 43%"
  ],
  [
    1341820,
    "日落黄昏时",
    "杰·霍尔特",
    "不到七个小时的流程，塑造了一个在我心中和亚瑟，乔尔等人一样深刻生动的游戏人物。有了公路片+线性剧情这俩我很喜欢的元素，玩之前就抱着很高的期望，但玩下来甚至还超出了我的期望。",
    "42% 44%"
  ]
]
    .map(([id, label, title, text, position]) => ({ id, label, title, text, position }));

  const focalPositions = new Map(featured.map((item) => [item.id, item.position]));
  [
    [1238810, "50% 42%"], [2483190, "50% 50%"], [812140, "48% 42%"],
    [582160, "55% 44%"], [750920, "58% 42%"], [753640, "50% 48%"],
    [1449560, "50% 45%"], [1222140, "42% 44%"], [870780, "56% 42%"],
    [1659420, "55% 42%"], [205100, "45% 45%"], [1057090, "50% 50%"],
  ].forEach(([id, position]) => focalPositions.set(id, position));

  const categories = [
    {
      label: "OPEN WORLD", title: "开放世界",
      text: "可以自由探索的大地图，路上的支线、风景与偶遇。",
      match: (g) => /Red Dead|荒野大镖客|GTA|Grand Theft Auto|巫师|Witcher|刺客信条|Assassin|黑神话|地平线|Forza|DEATH STRANDING|博德之门|Baldur/i.test(g.name) || g.tags.includes("开放世界"),
    },
    {
      label: "LINEAR NARRATIVE", title: "线性剧情",
      text: "沿着主线往前走，跟着人物经历一个故事。",
      match: (g) => /Last of Us|最后生还者|地铁|Metro|Uncharted|神秘海域|Tomb Raider|古墓丽影|Titanfall|Dishonored|耻辱|Control|控制|Ori|LIMBO|FAR:|GRIS/i.test(g.name),
    },
    {
      label: "INDEPENDENT GAMES", title: "独立游戏",
      text: "平台跳跃、解谜、冒险，以及一些短篇故事。",
      match: (g) => g.tags.includes("独立") || /GRIS|FAR:|极圈以南|Rusty Lake|Cube Escape|Gorogoa|Viewfinder|LIMBO|Hollow Knight|空洞骑士|To the Moon|去月球|Edith Finch|Monument Valley|历历在目|Last Campfire|ABZÛ|Lost in Play/i.test(g.name),
    },
    {
      label: "INTERACTIVE DRAMA", title: "互动叙事",
      text: "通过对话和选择参与剧情。",
      match: (g) => /As Dusk Falls|日落黄昏时|底特律|Detroit|极圈以南|Before Your Eyes|历历在目|Edith Finch|Life is Strange|Telltale/i.test(g.name),
    },
    {
      label: "HISTORICAL WORLDS", title: "历史与时代",
      text: "历史事件、时代背景与其中的人物。",
      match: (g) => /刺客信条|Assassin|Red Dead|荒野大镖客|极圈以南|地铁|Metro|Battlefield|战地/i.test(g.name),
    },
    {
      label: "ATMOSPHERE & SPACE", title: "氛围与空间",
      text: "靠场景、声音和色彩营造氛围的游戏。",
      match: (g) => /FAR:|地铁|Metro|GRIS|ABZÛ|Outer Wilds|Control|控制|DEATH STRANDING|LIMBO|Ori|Hollow Knight|空洞骑士|Viewfinder|Gorogoa|Last Campfire|Monument Valley|Wavetale/i.test(g.name),
    },
  ];

  function assetCandidates(id, kind = "hero") {
    const base = officialBase(id);
    const legacy = legacyBase(id);
    return kind === "hero"
      ? [`${base}/library_hero_2x.jpg`, `${base}/library_hero.jpg`, `${legacy}/library_hero.jpg`, `${base}/header.jpg`, `${legacy}/header.jpg`]
      : [`${base}/library_600x900_2x.jpg`, `${base}/library_600x900.jpg`, `${legacy}/library_600x900.jpg`, `${base}/library_capsule.jpg`, `${base}/header.jpg`, `${legacy}/header.jpg`];
  }

  function assignAsset(image, game, kind = "hero", eager = false) {
    const urls = assetCandidates(game.id, kind);
    let cursor = 0;
    image.alt = game.name;
    image.loading = eager ? "eager" : "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    image.style.objectPosition = focalPositions.get(game.id) || "50% 50%";
    const next = () => {
      if (cursor >= urls.length) {
        image.removeAttribute("src");
        image.classList.add("asset-missing");
        return;
      }
      image.src = urls[cursor++];
    };
    image.addEventListener("error", next);
    next();
  }

  function makeImage(game, kind = "hero", eager = false) {
    const image = document.createElement("img");
    assignAsset(image, game, kind, eager);
    return image;
  }

  function renderFeatured() {
    const container = document.querySelector("#featured-game-grid");
    if (!container) return;
    container.innerHTML = "";
    featured.forEach((item) => {
      const game = byId.get(item.id);
      if (!game || game.hours <= 0) return;
      const card = document.createElement("article");
      card.className = "memory-card featured-game-card";
      card.dataset.gameId = String(game.id);
      const image = makeImage(game, "hero");
      image.style.objectPosition = item.position;
      card.append(image);
      const copy = document.createElement("div");
      copy.className = "memory-card-copy";
      copy.innerHTML = `<span>${escapeHTML(item.label)}</span><h3>${escapeHTML(game.name)}</h3><h4>${escapeHTML(item.title)}</h4><p class="review-excerpt" lang="zh-CN">${escapeHTML(item.text).replace(/\n/g, "<br>")}</p><div class="featured-game-links"><a href="${game.store}" target="_blank" rel="noopener">Steam ↗</a>${game.review ? `<a href="${game.review}" target="_blank" rel="noopener">完整评测 ↗</a>` : ""}</div>`;
      card.append(copy);
      container.append(card);
    });
  }

  function renderCategories() {
    const container = document.querySelector("#category-grid");
    if (!container) return;
    container.innerHTML = "";
    categories.forEach((category) => {
      const matched = playedGames.filter(category.match).sort((a, b) => b.hours - a.hours || a.name.localeCompare(b.name, "zh-CN"));
      const card = document.createElement("article");
      card.className = "series-card category-card";
      const links = matched.map((game) => `<a href="${game.store}" target="_blank" rel="noopener">${escapeHTML(game.name)}</a>`).join("");
      card.innerHTML = `<span>${category.label}</span><h3>${escapeHTML(category.title)}</h3><p>${escapeHTML(category.text)}</p><div class="category-games">${links || '<small>暂未匹配到已玩作品</small>'}</div>`;
      container.append(card);
    });
  }

  function setupBackdrop() {
    const layers = [...document.querySelectorAll(".hero-art-layer")];
    const preferredIds = [1174180, 1888930, 2531310, 1811040, 683320, 609320, 2358720, 287390, 911400, 1341820, 1238810, 2483190, 812140, 582160, 750920, 753640, 1449560, 1222140, 870780, 1659420, 205100, 1057090, 367520, 1086940, 2183900, 292030];
    const preferred = preferredIds.map((id) => byId.get(id)).filter((game) => game && game.hours > 0);
    const remaining = playedGames.filter((game) => !preferred.some((item) => item.id === game.id)).sort((a, b) => b.hours - a.hours).slice(0, 12);
    const heroPool = [...preferred, ...remaining];

    if (window.gameHeroTimer) window.clearInterval(window.gameHeroTimer);
    if (layers.length >= 2 && heroPool.length) {
      let index = 0;
      let active = 0;
      assignAsset(layers[0], heroPool[0], "hero", true);
      layers[0].classList.add("is-active");
      if (heroPool[1]) assignAsset(layers[1], heroPool[1], "hero", true);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.gameHeroTimer = window.setInterval(() => {
          if (document.querySelector("#game-world-backdrop")?.classList.contains("motion-paused")) return;
          index = (index + 1) % heroPool.length;
          const nextLayer = 1 - active;
          const nextGame = heroPool[index];
          const preload = new Image();
          const urls = assetCandidates(nextGame.id, "hero");
          let cursor = 0;
          const next = () => { if (cursor < urls.length) preload.src = urls[cursor++]; };
          preload.onload = () => {
            layers[nextLayer].src = preload.src;
            layers[nextLayer].style.objectPosition = focalPositions.get(nextGame.id) || "50% 50%";
            layers[nextLayer].classList.add("is-active");
            layers[active].classList.remove("is-active");
            active = nextLayer;
          };
          preload.onerror = next;
          next();
        }, 7600);
      }
    }

    const oldTrack = document.querySelector("#game-cover-track");
    if (!oldTrack || !playedGames.length) return;
    const track = oldTrack.cloneNode(false);
    oldTrack.replaceWith(track);
    const ordered = [...playedGames].sort((a, b) => b.hours - a.hours || a.index - b.index);
    const batchSize = Math.min(20, ordered.length);
    let offset = 0;
    const renderBatch = () => {
      const batch = Array.from({ length: batchSize }, (_, i) => ordered[(offset + i) % ordered.length]);
      track.innerHTML = "";
      for (let copy = 0; copy < 2; copy += 1) {
        batch.forEach((game) => {
          const item = document.createElement("div");
          item.className = "cover-ribbon-item";
          item.title = game.name;
          item.dataset.playedHours = String(game.hours);
          item.append(makeImage(game, "cover"));
          track.append(item);
        });
      }
    };
    renderBatch();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.addEventListener("animationiteration", () => {
        offset = (offset + batchSize) % ordered.length;
        track.style.animation = "none";
        renderBatch();
        void track.offsetWidth;
        track.style.animation = "";
      });
    }
  }

  document.documentElement.dataset.gameRevision = "20260915";
  renderFeatured();
  renderCategories();
  setupBackdrop();
})();
