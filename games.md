---
layout: default
title: 游戏档案 | 唐直
permalink: /games/
description: 唐直关于游戏、叙事、手感、世界与游玩记忆的个人档案。
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/games.css' | relative_url }}?v=20260806-2315">
<link rel="stylesheet" href="{{ '/assets/css/games-refresh.css' | relative_url }}?v=20260806-2315">
<link rel="stylesheet" href="{{ '/assets/css/games-personal.css' | relative_url }}?v=20260806-2315">

<div class="game-world-backdrop" id="game-world-backdrop" aria-hidden="true">
  <div class="game-hero-art">
    <img class="hero-art-layer is-active" alt="">
    <img class="hero-art-layer" alt="">
  </div>
  <div class="game-cover-ribbon">
    <div class="game-cover-track" id="game-cover-track"></div>
  </div>
  <div class="game-world-shade"></div>
</div>

<div class="games-shell" data-game-revision="20260806-2315">
  <section class="games-hero">
    <div class="games-hero-copy">
      <p class="games-eyebrow">PLAYED WORLDS · 游戏档案</p>
      <h1>留下来的不是游玩时长，<br>而是游戏改变判断的方式。</h1>
      <p class="games-lead">
        真正值得记住的作品未必属于同一种类型：可能是一片愿意让人慢下来的开放世界，
        一段不怕制造冲突的线性叙事，也可能只是五六个小时、却把一种情绪讲得足够完整的独立游戏。
        这里记录的是它们为什么留下。
      </p>
      <div class="games-hero-actions">
        <a class="games-button primary" href="#featured-games">看重点作品</a>
        <a class="games-button" href="#game-categories">按体验方式浏览</a>
        <a class="games-button" href="#library">打开完整书架</a>
        <a class="games-button" href="https://steamcommunity.com/id/Tang0630paradise/recommended/" target="_blank" rel="noopener">Steam 评测 ↗</a>
        <button class="games-button motion-button" id="game-motion-toggle" type="button" aria-pressed="false">暂停流动背景</button>
      </div>
      <p class="archive-note" id="archive-note">
        背景循环只使用已经实际游玩过的游戏。重点作品、分类和文字判断独立维护，不会因游玩时间变化而自动改写。
      </p>
    </div>
  </section>

  <section class="games-section featured-games-section" id="featured-games">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">GAMES THAT STAYED WITH ME</p>
        <h2>真正留下来的十部作品</h2>
      </div>
      <p>不按分数排榜。每一张卡片只回答一个问题：它具体改变了对游戏的哪一种理解。</p>
    </div>
    <div class="memory-grid featured-game-grid" id="featured-game-grid"></div>
  </section>

  <section class="games-section principle-section" id="principles">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">HOW TO JUDGE A GAME</p>
        <h2>评价游戏时，更在意这些事情</h2>
      </div>
      <p>不是画质、地图大小或流程长度的单项比较，而是作品有没有建立自己的节奏、世界和表达。</p>
    </div>
    <div class="principle-grid" id="principle-grid"></div>
  </section>

  <section class="games-section category-section" id="game-categories">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">WAYS OF PLAYING</p>
        <h2>类型是不同的进入方式</h2>
      </div>
      <p>同一个作品可以跨越多个标签。这里不是商店分类，而是实际体验游戏时最明显的几种状态。</p>
    </div>
    <div class="series-grid category-grid" id="category-grid"></div>
  </section>

  <section class="games-section revision-section">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">A REVIEW CAN KEEP CHANGING</p>
        <h2>《刺客信条 3》：一段评价如何被后劲改写</h2>
      </div>
      <p>从最初的愤怒差评，到重新理解人物和叙事野心，再到 DLC 结束后的彻底改观。</p>
    </div>
    <div class="revision-story">
      <div class="revision-cover" id="revision-cover"></div>
      <ol class="revision-timeline">
        <li><span>第一遍通关</span><strong>首先看见的是系统、演出和任务设计相对前作的倒退。</strong><p>当时的情绪是真实的，但它不是这部作品的全部。</p></li>
        <li><span>冷静以后</span><strong>剧情的野心和执行上的问题开始被分开评价。</strong><p>双阵营叙事、历史人物的嵌入，以及康纳的处境都比第一印象更有分量。</p></li>
        <li><span>后劲出现</span><strong>杀父、烧村和最后那杯酒，慢慢压过了最初的愤怒。</strong><p>游戏结束后的回响，重新改变了对人物的理解。</p></li>
        <li><span>DLC 结束</span><strong>差评最终改成了好评。</strong><p>评价不是一次性盖章。设计上的糟糕与后来真正形成的感动可以同时成立。</p></li>
      </ol>
    </div>
  </section>

  <section class="games-section voice-section">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">IN ORIGINAL WORDS</p>
        <h2>几段最接近原始感受的话</h2>
      </div>
      <p>不是客观介绍，而是玩完以后愿意为一部作品留下的判断。</p>
    </div>
    <div class="featured-review-list voice-list" id="voice-list"></div>
  </section>

  <section class="games-section library-section" id="library">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">THE COMPLETE SHELF</p>
        <h2>完整游戏书架</h2>
      </div>
      <p>这是可检索的档案，不是用来证明“玩得多”。封面只有在展开后才开始加载。</p>
    </div>

    <details class="library-details" id="library-details">
      <summary>展开完整清单</summary>
      <div class="library-inner">
        <div class="library-controls">
          <label class="game-search">
            <span>⌕</span>
            <input id="game-search-input" type="search" placeholder="搜索游戏或 Steam 类型标签">
          </label>
          <select id="game-sort" aria-label="游戏排序">
            <option value="memory">按档案顺序</option>
            <option value="recent">按最近打开</option>
            <option value="reviewed">先看写过评测的</option>
            <option value="name">按名称</option>
          </select>
          <select id="genre-filter" aria-label="类型筛选">
            <option value="all">全部 Steam 类型</option>
          </select>
          <button class="filter-toggle" id="installed-filter" type="button" aria-pressed="false">当前已安装</button>
          <button class="filter-toggle" id="reviewed-filter" type="button" aria-pressed="false">写过评测</button>
        </div>
        <p class="library-result-line" id="library-result-line">展开后再加载封面，不拖慢页面开场。</p>
        <div class="game-library-grid" id="game-library-grid"></div>
        <button class="load-more-games" id="load-more-games" type="button">继续往下翻</button>
      </div>
    </details>
  </section>

  <section class="games-closing">
    <p class="games-eyebrow">STILL PLAYING</p>
    <h2>继续记录判断，而不只是增加清单。</h2>
    <p>以后这里会继续加入截图、完整长文、系列比较，以及多年后重新打开同一款游戏时发生的变化。</p>
    <a class="games-button" href="{{ '/notes' | relative_url }}">查看游戏随笔与长文 →</a>
  </section>
</div>

<script src="{{ '/assets/js/steam-games-data.js' | relative_url }}?v=20260806-2315"></script>
<script src="{{ '/assets/js/games.js' | relative_url }}?v=20260806-2315"></script>
<script src="{{ '/assets/js/games-perspective.js' | relative_url }}?v=20260806-2315"></script>
