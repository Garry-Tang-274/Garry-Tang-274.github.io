---
layout: default
title: 游戏档案 | 唐直
permalink: /games/
description: 唐直的游戏记忆、Steam 游玩记录与个人评测。
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/games.css' | relative_url }}">

<div class="game-world-backdrop" aria-hidden="true">
  <div class="game-hero-art" id="game-hero-art">
    <img class="hero-art-layer is-active" alt="">
    <img class="hero-art-layer" alt="">
  </div>
  <div class="game-cover-ribbon">
    <div class="game-cover-track" id="game-cover-track"></div>
  </div>
  <div class="game-world-shade"></div>
</div>

<div class="games-shell">
  <section class="games-hero">
    <div class="games-hero-copy">
      <p class="games-eyebrow">PLAYED WORLDS · 游戏档案</p>
      <h1>我玩过的游戏，<br>和它们留下来的东西。</h1>
      <p class="games-lead">
        这里不做成一张按时长和数量排列的成绩单。更想留下的是：一款游戏为什么会在某个时间吸引我，
        哪个世界值得反复回去，以及通关以后还有什么没有忘记。
      </p>
      <div class="games-hero-actions">
        <a class="games-button primary" href="#memories">从记忆开始</a>
        <a class="games-button" href="#library">翻完整游戏库</a>
        <a class="games-button" href="https://steamcommunity.com/id/Tang0630paradise/recommended/" target="_blank" rel="noopener">Steam 评测 ↗</a>
      </div>
      <p class="archive-note" id="archive-note">Steam 游玩记录更新于 2026 年 8 月。</p>
    </div>
  </section>

  <section class="games-section memory-section" id="memories">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">WHAT STAYS</p>
        <h2>我为什么会记住一款游戏</h2>
      </div>
      <p>不是统一标准，也不是客观评分。只是几种经常让我留下来的体验。</p>
    </div>
    <div class="memory-grid" id="memory-grid"></div>
  </section>

  <section class="games-section recent-section">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">OPENED RECENTLY</p>
        <h2>最近打开的几个世界</h2>
      </div>
      <p>只记录最近实际玩过什么，不把它包装成“本月推荐”。</p>
    </div>
    <div class="recent-game-grid" id="recent-game-grid"></div>
  </section>

  <section class="games-section review-section">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">IN MY OWN WORDS</p>
        <h2>我真正写过的几段话</h2>
      </div>
      <p>有喜欢，也有不喜欢。保留当时说话的方式，不统一改成评测模板。</p>
    </div>
    <div class="featured-review-list" id="featured-review-list"></div>
  </section>

  <section class="games-section series-section">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">RETURNING PLACES</p>
        <h2>反复回去的系列与世界</h2>
      </div>
      <p>有些偏好不是由一部作品形成的，而是几年里一次次回到同一个地方。</p>
    </div>
    <div class="series-grid" id="series-grid"></div>
  </section>

  <section class="games-section library-section" id="library">
    <div class="games-section-heading library-heading">
      <div>
        <p class="games-eyebrow">THE SHELF</p>
        <h2>完整游戏书架</h2>
      </div>
      <p>这里才保留完整清单。可以搜索、筛选和排序，但默认不让数字抢走页面。</p>
    </div>

    <div class="library-controls">
      <label class="game-search">
        <span>⌕</span>
        <input id="game-search-input" type="search" placeholder="搜索游戏或类型">
      </label>
      <select id="game-sort" aria-label="游戏排序">
        <option value="memory">按个人档案顺序</option>
        <option value="recent">最近游玩</option>
        <option value="hours">游玩时长</option>
        <option value="steamPositive">Steam 好评率</option>
        <option value="name">名称</option>
      </select>
      <select id="genre-filter" aria-label="类型筛选">
        <option value="all">全部类型</option>
      </select>
      <button class="filter-toggle" id="installed-filter" type="button" aria-pressed="false">当前已安装</button>
      <button class="filter-toggle" id="reviewed-filter" type="button" aria-pressed="false">我写过评测</button>
    </div>

    <p class="library-result-line" id="library-result-line"></p>
    <div class="game-library-grid" id="game-library-grid"></div>
    <button class="load-more-games" id="load-more-games" type="button">继续往下翻</button>
  </section>

  <section class="games-closing">
    <p class="games-eyebrow">STILL PLAYING</p>
    <h2>这不是一份“玩过即完成”的清单。</h2>
    <p>以后这里会继续加入截图、通关状态、跨平台游戏和更完整的长文记录。</p>
    <a class="games-button" href="{{ '/notes' | relative_url }}">查看游戏随笔与长文 →</a>
  </section>
</div>

<script src="{{ '/assets/js/steam-games-data.js' | relative_url }}"></script>
<script src="{{ '/assets/js/games.js' | relative_url }}"></script>
