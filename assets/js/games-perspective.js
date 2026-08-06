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

  const featured = [
    [1174180, "开放世界 · 慢速沉浸", "进入一部作品，也需要合适的时机", "《荒野大镖客：救赎 2》第一次打开只坚持了一个小时。后来在一个下雨的返校日重新下载，作品没有改变，真正变化的是游玩者终于愿意放慢节奏。所谓“开局抓不住人”，有时并不是无聊，只是彼此还没有在正确的时刻相遇。", "54% 42%"],
    [1888930, "线性叙事 · 情感完成度", "游戏作为第九艺术，关键在整体完成度", "《最后生还者 Part I》的力量不只是剧情本身，而是故事、操作、音乐、表演与结尾在同一个时刻完成收束。片尾音乐与成就提示同时响起时，那不是简单的“像电影”，而是只有游戏这种形式才能形成的整体情绪。", "38% 46%"],
    [2531310, "线性叙事 · 冲突与视角", "不舒服，并不等于叙事失败", "《最后生还者 Part II》先让愤怒支配行动，再迫使玩家面对另一套同样完整的动机。它没有轻易原谅任何人，也没有把复仇写成痛快的闭环。真正留下来的，是人在精疲力尽之后如何停止伤害，并尝试与自己和解。", "64% 42%"],
    [1811040, "独立游戏 · 情绪交互", "选择也可以只负责传递情绪", "《极圈以南》的情绪图形几乎不改变剧情，却把坚定、温暖、慌张和低落真正交给了玩家。交互的价值不只有分支和结果；一次按键，也可以只是让一个人的处境变得更具体。", "58% 45%"],
    [683320, "独立游戏 · 视觉表达", "简约来自克制，而不是空白", "《GRIS》的画面、音乐和玩法都很丰满，却没有任何一部分抢着证明自己。所谓艺术游戏，不是少说话、少画几笔，而是每一种表达都知道应该出现到什么程度，又应该在什么时候停下。", "50% 50%"],
    [609320, "独立游戏 · 空间与依恋", "空间一旦承载安全感，就会成为角色", "《FAR: Lone Sails》里的车像一层移动的保护壳。燃料、小物件和熟悉的舱室共同构成了安全感；旅程结束后失去这层外壳，才更清楚地显出那条朴素的命题：保护终究会消失，人仍要继续往前。", "50% 50%"],
    [2358720, "动作冒险 · 中式美学", "中式美学不必永远洁净、漂亮和古风", "《黑神话：悟空》里的泥塑、怪物、残破建筑和民间视觉并不像陈列柜里的精致展品，却有一种一眼可辨的文化亲切感。中式表达可以粗粝、怪异、可怖，也仍然扎根于熟悉的文化经验。", "64% 42%"],
    [287390, "线性剧情 · 氛围与机制", "机制最有力量的时候，是它改变行为", "《地铁：最后的曙光》里的道德点起初只是通往好结局的条件，后来却促使玩家认真听完对话、观察开放区域，并重新理解黑暗族和不同阵营。机制没有单独站出来说教，而是悄悄改变了人在世界里的行动方式。", "44% 46%"],
    [911400, "历史动作 · 评价的后劲", "后劲可以推翻第一印象", "《刺客信条 3》的系统、演出和任务设计存在大量问题，这些批评至今仍然成立。但康纳、海尔森和那段历史在通关后不断回返。把差评改成好评，并不是忘记缺点，而是承认人物与叙事最终在时间里压过了它们。", "36% 43%"],
    [1341820, "互动电影 · 人物弧光", "互动叙事的重量不取决于分支数量", "《日落黄昏时》真正留下来的不是路线数量，而是杰·霍尔特和其他人物如何背着缺陷继续生活，偿还并不完全属于自己的罪，并试着走出与生俱来的阴影。选择系统只是形式，人物能否承担过去才决定故事有没有重量。", "42% 44%"],
  ].map(([id, label, title, text, position]) => ({ id, label, title, text, position }));

  const focalPositions = new Map(featured.map((item) => [item.id, item.position]));
  [
    [1238810, "50% 42%"], [2483190, "50% 50%"], [812140, "48% 42%"],
    [582160, "55% 44%"], [750920, "58% 42%"], [753640, "50% 48%"],
    [1449560, "50% 45%"], [1222140, "42% 44%"], [870780, "56% 42%"],
    [1659420, "55% 42%"], [205100, "45% 45%"], [1057090, "50% 50%"],
  ].forEach(([id, position]) => focalPositions.set(id, position));

  const principles = [
    ["01", "不舒服，并不直接等于叙事失败", "只要冲突来自人物和世界本身，愤怒、压抑、遗憾甚至反感都可以是有效体验。比起安全地取悦玩家，更重要的是作品有没有勇气把矛盾推到不能轻易解决的地方。", "《最后生还者 Part II》 · 《极圈以南》 · 《日落黄昏时》"],
    ["02", "开放世界首先应该值得停留", "地图面积和图标数量并不能证明世界成立。真正重要的是：在没有即时奖励的时候，赶路、观察、绕远和偶然相遇是否仍然值得。", "《荒野大镖客：救赎 2》 · 《黑神话：悟空》 · 《刺客信条》系列"],
    ["03", "小体量完全可以容纳完整经验", "五六个小时足够建立一种美术语言、一种空间关系和一段明确的情绪。独立游戏的价值不在“以小博大”，而在表达足够集中，也清楚自己的边界。", "《GRIS》 · 《FAR: Lone Sails》 · 《极圈以南》"],
    ["04", "评价可以在通关以后继续变化", "刚结束时的感受是真实的，但不必成为最后裁决。人物的后劲、重新理解的细节和一段时间后的回想，都可能修改甚至推翻最初的结论。", "《刺客信条 3》 · 《荒野大镖客：救赎 2》"],
  ];

  const categories = [
    {
      label: "OPEN WORLD", title: "开放世界",
      text: "世界需要在任务之外继续成立；地图不是清单，而是允许停留、观察和偶然相遇的地方。",
      match: (g) => /Red Dead|荒野大镖客|GTA|Grand Theft Auto|巫师|Witcher|刺客信条|Assassin|黑神话|地平线|Forza|DEATH STRANDING|博德之门|Baldur/i.test(g.name) || g.tags.includes("开放世界"),
    },
    {
      label: "LINEAR NARRATIVE", title: "线性剧情",
      text: "作者控制节奏并不是缺点。演出、关卡、操作和人物弧光配合得足够精确时，线性结构反而更有力量。",
      match: (g) => /Last of Us|最后生还者|地铁|Metro|Uncharted|神秘海域|Tomb Raider|古墓丽影|Titanfall|Dishonored|耻辱|Control|控制|Ori|LIMBO|FAR:|GRIS/i.test(g.name),
    },
    {
      label: "INDEPENDENT GAMES", title: "独立游戏",
      text: "体量不决定价值。明确的美术语言、克制的机制和完整的小型表达，往往比无限扩张更有记忆点。",
      match: (g) => g.tags.includes("独立") || /GRIS|FAR:|极圈以南|Rusty Lake|Cube Escape|Gorogoa|Viewfinder|LIMBO|Hollow Knight|空洞骑士|To the Moon|去月球|Edith Finch|Monument Valley|历历在目|Last Campfire|ABZÛ|Lost in Play/i.test(g.name),
    },
    {
      label: "INTERACTIVE DRAMA", title: "互动叙事",
      text: "分支数量不是唯一尺度。选择是否让人物更具体、关系更难回避，才决定互动有没有真正进入叙事。",
      match: (g) => /As Dusk Falls|日落黄昏时|底特律|Detroit|极圈以南|Before Your Eyes|历历在目|Edith Finch|Life is Strange|Telltale/i.test(g.name),
    },
    {
      label: "HISTORICAL WORLDS", title: "历史与时代",
      text: "时代不该只是背景板；它需要真实地挤压人物、限制选择，并让个人命运在更大的结构里获得重量。",
      match: (g) => /刺客信条|Assassin|Red Dead|荒野大镖客|极圈以南|地铁|Metro|Battlefield|战地/i.test(g.name),
    },
    {
      label: "ATMOSPHERE & SPACE", title: "氛围与空间",
      text: "一辆车、一条隧道、一场雨或一种颜色，都可以比对白更早留在记忆里。空间本身也能承担叙事。",
      match: (g) => /FAR:|地铁|Metro|GRIS|ABZÛ|Outer Wilds|Control|控制|DEATH STRANDING|LIMBO|Ori|Hollow Knight|空洞骑士|Viewfinder|Gorogoa|Last Campfire|Monument Valley|Wavetale/i.test(g.name),
    },
  ];

  const voices = [
    [1174180, "买了吃灰、玩不下去都没关系。有些游戏只是还没有等到真正想进入它的那一天。"],
    [2531310, "没有人真正原谅了对方。大家做的，只是在复仇把一切烧光以后，尝试与自己和解。"],
    [1811040, "时代在历史书里可能只是一行话，但对身处其中的人来说，那就是全部生活。"],
    [609320, "总要学会怎么前进，不管是坐在车里，还是走在路上。"],
    [287390, "了解得越多，越愿意珍惜；每一次善意，也是在重新审视此前的行为。"],
    [1341820, "自我救赎或和解，也许正是大多数人终其一生反复经历的过程。"],
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
      copy.innerHTML = `<span>${escapeHTML(item.label)}</span><h3>${escapeHTML(game.name)}</h3><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.text)}</p><div class="featured-game-links"><a href="${game.store}" target="_blank" rel="noopener">Steam ↗</a>${game.review ? `<a href="${game.review}" target="_blank" rel="noopener">完整评测 ↗</a>` : ""}</div>`;
      card.append(copy);
      container.append(card);
    });
  }

  function renderPrinciples() {
    const container = document.querySelector("#principle-grid");
    if (!container) return;
    container.innerHTML = principles.map(([number, title, text, examples]) => `<article class="principle-card"><span>${number}</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p><small>${escapeHTML(examples)}</small></article>`).join("");
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

  function renderVoices() {
    const container = document.querySelector("#voice-list");
    if (!container) return;
    container.innerHTML = "";
    voices.forEach(([id, text]) => {
      const game = byId.get(id);
      if (!game || game.hours <= 0) return;
      const article = document.createElement("article");
      article.className = "review-story";
      const image = makeImage(game, "hero");
      image.className = "review-story-art";
      article.append(image);
      const copy = document.createElement("div");
      copy.className = "review-story-copy";
      copy.innerHTML = `<h3>${escapeHTML(game.name)}</h3><p class="voice-text">${escapeHTML(text)}</p>`;
      article.append(copy);
      const meta = document.createElement("div");
      meta.className = "review-story-meta";
      meta.innerHTML = game.review ? `<a href="${game.review}" target="_blank" rel="noopener">完整评测 ↗</a>` : `<a href="${game.store}" target="_blank" rel="noopener">Steam ↗</a>`;
      article.append(meta);
      container.append(article);
    });
  }

  function refineStaticCopy() {
    const heroTitle = document.querySelector(".games-hero h1");
    if (heroTitle) heroTitle.innerHTML = "留下来的不是游玩时长，<br>而是游戏改变判断的方式。";
    const heroLead = document.querySelector(".games-lead");
    if (heroLead) heroLead.textContent = "真正值得记住的作品未必属于同一种类型：可能是一片愿意让人慢下来的开放世界，一段不怕制造冲突的线性叙事，也可能只是五六个小时、却把一种情绪讲得足够完整的独立游戏。这里记录的是它们为什么留下。";
    const principleTitle = document.querySelector("#principles .games-section-heading h2");
    if (principleTitle) principleTitle.textContent = "评价游戏时，更在意这些事情";
    const archiveNote = document.querySelector("#archive-note");
    if (archiveNote) archiveNote.textContent = "背景循环只使用已经实际游玩过的游戏。重点作品、分类和文字判断独立维护，不会因游玩时间变化而自动改写。";
    const closingTitle = document.querySelector(".games-closing h2");
    if (closingTitle) closingTitle.textContent = "继续记录判断，而不只是增加清单。";
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

  document.documentElement.dataset.gameRevision = "20260806-2315";
  refineStaticCopy();
  renderFeatured();
  renderPrinciples();
  renderCategories();
  renderVoices();
  setupBackdrop();
})();
