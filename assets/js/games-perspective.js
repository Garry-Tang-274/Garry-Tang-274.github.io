(() => {
  const rows = Array.isArray(window.STEAM_GAME_ROWS) ? window.STEAM_GAME_ROWS : [];
  if (!rows.length) return;

  const games = rows.map(([id, name, hours, recent, installed, recommendation, steamPositive, lastPlayed, tags]) => ({
    id: Number(id),
    name,
    hours: Number(hours || 0),
    recent: Number(recent || 0),
    installed: Boolean(installed),
    recommendation,
    steamPositive,
    lastPlayed,
    tags: tags ? String(tags).split("|").filter(Boolean) : [],
    store: `https://store.steampowered.com/app/${id}/`,
    review: recommendation ? `https://steamcommunity.com/id/Tang0630paradise/recommended/${id}/` : null,
  }));

  const byId = new Map(games.map((game) => [game.id, game]));
  const officialBase = (id) => `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${id}`;
  const legacyBase = (id) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}`;

  const featured = [
    {
      id: 1174180,
      label: "开放世界 · 慢速沉浸",
      title: "我后来才明白，进入一部作品也需要合适的时机",
      text: "我第一次打开《荒野大镖客：救赎 2》只玩了一个小时就放弃了。后来返校那天下着雨，随机歌单正好放到 That's the Way It Is，我重新把它下载回来。作品没有改变，是我终于愿意放慢下来，把自己的节奏交给它。它让我不再把“开局抓不住人”简单理解成游戏无聊。",
    },
    {
      id: 1888930,
      label: "线性叙事 · 情感完成度",
      title: "它让我第一次很确定地把游戏称作第九艺术",
      text: "《最后生还者 Part I》真正打动我的，不只是剧情本身，而是故事、操作、音乐、表演和结尾在同一个时刻完成收束。片尾音乐与成就提示同时响起时，我感受到的不是“像电影”，而是只有游戏这种形式才能完成的整体情绪。",
    },
    {
      id: 2531310,
      label: "线性叙事 · 冲突与视角",
      title: "我不要求一段剧情让我舒服",
      text: "《最后生还者 Part II》让我带着愤怒一路行动，再突然要求我面对另一套同样完整的动机。我喜欢它没有轻易原谅任何人，也没有把复仇写成一个痛快的闭环。到最后，艾莉与艾比都不是在原谅对方，而是在精疲力尽之后尝试与自己和解。",
    },
    {
      id: 1811040,
      label: "独立游戏 · 情绪交互",
      title: "选择不一定要改变结局，也可以只负责让我感受",
      text: "《极圈以南》里的情绪图形几乎不改变剧情，但坚定、温暖、慌张和低落被真正交到了我手上。它让我意识到，交互的价值不只有分支和结果；有时按下一个选择，只是为了让我更具体地进入一个人的处境。",
    },
    {
      id: 683320,
      label: "独立游戏 · 视觉表达",
      title: "我理解的简约，不是空白，而是繁复之后仍有分寸",
      text: "《GRIS》的画面、音乐和玩法都很丰满，却没有任何一部分抢着证明自己。它让我重新理解所谓艺术游戏：不是少说话、少画几笔，而是每一种表达都知道自己应该出现到什么程度，又应该在什么时候停下。",
    },
    {
      id: 609320,
      label: "独立游戏 · 空间与依恋",
      title: "我会对狭小、熟悉、完全可控的空间产生依恋",
      text: "《FAR: Lone Sails》里的车让我想起小时候用枕头搭出的窝、Minecraft 里挖出的地洞和宿舍里刚好能蜷进去的角落。我把燃料和小物件整齐放进去，也把安全感放了进去。旅程结束后失去这层外壳，我才真正感到：人总要学会在没有保护的时候继续往前。",
    },
    {
      id: 2358720,
      label: "动作冒险 · 中式美学",
      title: "它让我看到，中式美学不必永远洁净、漂亮和古风",
      text: "《黑神话：悟空》里那些泥塑、怪物、残破建筑和民间视觉，让我产生了一种非常具体的亲切感。它们并不精致得像展示品，却能让我一眼认出自己文化里的东西。对我来说，这比简单复刻古风符号更有意义。",
    },
    {
      id: 287390,
      label: "线性剧情 · 氛围与机制",
      title: "好的机制会慢慢改变我在世界里的行为",
      text: "《地铁：最后的曙光》里的道德点，最开始只是我通往好结局的条件。后来我开始主动听完对话、观察开放区域，也愿意重新理解黑暗族和不同阵营。机制没有单独站出来说教，却逐渐把我从“完成任务”带进了这个世界。",
    },
    {
      id: 911400,
      label: "历史动作 · 评价的后劲",
      title: "我愿意承认，一部游戏的后劲可以推翻第一印象",
      text: "《刺客信条 3》刚通关时让我非常愤怒，系统、演出和任务设计上的问题至今仍然成立。但康纳、海尔森和那段历史后来一直留在我脑子里。我最终把差评改成好评，不是忘记缺点，而是承认人物和叙事确实在时间里压过了它们。",
    },
    {
      id: 1341820,
      label: "互动电影 · 人物弧光",
      title: "分支数量不是互动叙事最重要的东西",
      text: "《日落黄昏时》不到七小时，却塑造了一个在我心里可以和亚瑟、乔尔并列的人物。真正留下来的不是路线数量，而是杰·霍尔特和其他人如何背着缺陷继续生活、偿还并不完全属于自己的罪、试着走出与生俱来的阴影。",
    },
  ];

  const principles = [
    {
      number: "01",
      title: "我不把“让我难受”直接当成叙事失败",
      text: "只要冲突来自人物和世界本身，我愿意接受愤怒、压抑、遗憾甚至反感。比起安全地取悦我，我更看重作品有没有勇气把矛盾推到不能轻易解决的地方。",
      games: "《最后生还者 Part II》 · 《极圈以南》 · 《日落黄昏时》",
    },
    {
      number: "02",
      title: "我需要世界允许我停下来，而不是不停地向我派发任务",
      text: "开放世界对我来说不是面积和图标数量。我更在意自己是否愿意不看地图地走一段路、观察一个地方，甚至在没有奖励的时候仍然留下。",
      games: "《荒野大镖客：救赎 2》 · 《黑神话：悟空》",
    },
    {
      number: "03",
      title: "我相信小体量完全可以容纳一段完整经验",
      text: "五六个小时足够建立一种美术语言、一种空间关系和一段明确的情绪。独立游戏吸引我的，不是所谓“以小博大”，而是它们往往更清楚自己究竟想表达什么。",
      games: "《GRIS》 · 《FAR: Lone Sails》 · 《极圈以南》",
    },
    {
      number: "04",
      title: "我允许自己的评价在通关以后继续变化",
      text: "刚结束时的感受是真实的，但不一定是最后裁决。人物的后劲、重新理解的细节和一段时间后的回想，都可以让我修改甚至推翻最初的结论。",
      games: "《刺客信条 3》 · 《荒野大镖客：救赎 2》",
    },
  ];

  const categories = [
    {
      label: "OPEN WORLD",
      title: "开放世界",
      text: "我喜欢的开放世界不是“内容很多”，而是世界在任务之外仍然成立。我愿意慢下来、绕远路、观察环境，并在没有即时奖励的时候继续停留。",
      ids: [1174180, 2358720, 911400],
    },
    {
      label: "LINEAR NARRATIVE",
      title: "线性剧情",
      text: "我不排斥作者控制节奏。只要演出、关卡、操作和人物弧光能够精确配合，线性结构反而能带来更集中、更难回避的情绪。",
      ids: [1888930, 2531310, 287390],
    },
    {
      label: "INDEPENDENT GAMES",
      title: "独立游戏",
      text: "我会被明确的美术语言、克制的机制和完整的小型表达吸引。体量不决定价值，表达是否集中、是否知道自己的边界才决定。",
      ids: [1811040, 683320, 609320],
    },
    {
      label: "INTERACTIVE DRAMA",
      title: "互动叙事",
      text: "我在意的不是有多少结局，而是选择有没有让我更靠近人物。即使剧情最终汇合，交互也可以改变我理解一段关系和一场冲突的方式。",
      ids: [1341820, 1811040, 2531310],
    },
    {
      label: "HISTORICAL WORLDS",
      title: "历史与时代",
      text: "我喜欢个人命运被放进更大的历史结构里。时代不只是背景板，它应该真实地挤压人物、限制选择，并让每一次挣扎都带着具体的重量。",
      ids: [911400, 1811040, 287390, 1174180],
    },
    {
      label: "ATMOSPHERE & SPACE",
      title: "氛围与空间",
      text: "有些作品最先留在我记忆里的并不是剧情，而是一辆车、一条地铁隧道、一场雨或一种颜色。空间本身也可以成为叙事的一部分。",
      ids: [609320, 287390, 683320, 1174180],
    },
  ];

  const voices = [
    { id: 1174180, quote: "买了吃灰、玩不下去都没关系。有些游戏只是还没有等到我真正想进入它的那一天。" },
    { id: 2531310, quote: "没有人真正原谅了对方。大家做的，只是在复仇把一切烧光以后，尝试与自己和解。" },
    { id: 1811040, quote: "时代在历史书里可能只是一行话，但对身处其中的人来说，那就是全部生活。" },
    { id: 609320, quote: "我总要学会怎么前进，不管是坐在车里，还是走在路上。" },
    { id: 287390, quote: "了解得越多，我越愿意珍惜；每一次善意，也是在重新审视自己此前的行为。" },
    { id: 1341820, quote: "自我救赎或和解，也许正是大多数人终其一生反复经历的过程。" },
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

  function assetCandidates(id, kind = "hero") {
    if (kind === "hero") {
      return [
        `${officialBase(id)}/library_hero_2x.jpg`,
        `${officialBase(id)}/library_hero.jpg`,
        `${legacyBase(id)}/library_hero.jpg`,
        `${officialBase(id)}/header.jpg`,
        `${legacyBase(id)}/header.jpg`,
      ];
    }
    return [
      `${officialBase(id)}/library_600x900_2x.jpg`,
      `${officialBase(id)}/library_600x900.jpg`,
      `${legacyBase(id)}/library_600x900.jpg`,
      `${officialBase(id)}/library_capsule.jpg`,
      `${officialBase(id)}/header.jpg`,
    ];
  }

  function makeImage(game, kind = "hero") {
    const image = document.createElement("img");
    const candidates = assetCandidates(game.id, kind);
    let index = 0;
    image.alt = game.name;
    image.loading = "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    const next = () => {
      if (index >= candidates.length) return;
      image.src = candidates[index++];
    };
    image.addEventListener("error", next);
    next();
    return image;
  }

  function renderFeatured() {
    const container = document.querySelector("#featured-game-grid");
    if (!container) return;
    container.innerHTML = "";

    featured.forEach((item) => {
      const game = byId.get(item.id);
      if (!game) return;
      const card = document.createElement("article");
      card.className = "memory-card featured-game-card";
      card.append(makeImage(game));
      const copy = document.createElement("div");
      copy.className = "memory-card-copy";
      copy.innerHTML = `
        <span>${escapeHTML(item.label)}</span>
        <h3>${escapeHTML(game.name)}</h3>
        <h4>${escapeHTML(item.title)}</h4>
        <p>${escapeHTML(item.text)}</p>
        <div class="featured-game-links">
          <a href="${game.store}" target="_blank" rel="noopener">Steam ↗</a>
          ${game.review ? `<a href="${game.review}" target="_blank" rel="noopener">我的评测 ↗</a>` : ""}
        </div>`;
      card.append(copy);
      container.append(card);
    });
  }

  function renderPrinciples() {
    const container = document.querySelector("#principle-grid");
    if (!container) return;
    container.innerHTML = principles.map((item) => `
      <article class="principle-card">
        <span>${item.number}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.text)}</p>
        <small>${escapeHTML(item.games)}</small>
      </article>`).join("");
  }

  function renderCategories() {
    const container = document.querySelector("#category-grid");
    if (!container) return;
    container.innerHTML = "";
    categories.forEach((category) => {
      const card = document.createElement("article");
      card.className = "series-card category-card";
      const links = category.ids.map((id) => byId.get(id)).filter(Boolean).map((game) =>
        `<a href="${game.store}" target="_blank" rel="noopener">${escapeHTML(game.name)}</a>`
      ).join("");
      card.innerHTML = `
        <span>${escapeHTML(category.label)}</span>
        <h3>${escapeHTML(category.title)}</h3>
        <p>${escapeHTML(category.text)}</p>
        <div class="category-games">${links}</div>`;
      container.append(card);
    });
  }

  function renderVoices() {
    const container = document.querySelector("#voice-list");
    if (!container) return;
    container.innerHTML = "";
    voices.forEach((item) => {
      const game = byId.get(item.id);
      if (!game) return;
      const article = document.createElement("article");
      article.className = "review-story";
      const image = makeImage(game, "hero");
      image.className = "review-story-art";
      article.append(image);
      const copy = document.createElement("div");
      copy.className = "review-story-copy";
      copy.innerHTML = `<h3>${escapeHTML(game.name)}</h3><blockquote>“${escapeHTML(item.quote)}”</blockquote>`;
      article.append(copy);
      const meta = document.createElement("div");
      meta.className = "review-story-meta";
      meta.innerHTML = `${game.review ? `<a href="${game.review}" target="_blank" rel="noopener">完整评测 ↗</a>` : ""}`;
      article.append(meta);
      container.append(article);
    });
  }

  function addArchiveNote() {
    const note = document.querySelector("#archive-note");
    if (!note) return;
    note.innerHTML = "背景循环使用我玩过的游戏的 Steam 官方封面与商店艺术图。重点作品、分类和文字判断由我自己维护，不会因为游玩时长变化而自动改写。";
  }

  renderFeatured();
  renderPrinciples();
  renderCategories();
  renderVoices();
  addArchiveNote();
})();
