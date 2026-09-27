---
layout: default
title: Games | Tang Zhi
permalink: /games/
description: Played games, Steam reviews, and the full game library.
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/games.css' | relative_url }}?v=20260915">
<link rel="stylesheet" href="{{ '/assets/css/games-refresh.css' | relative_url }}?v=20260915">
<link rel="stylesheet" href="{{ '/assets/css/games-personal.css' | relative_url }}?v=20260915">

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

<div class="games-shell" data-game-revision="20260927-random">
  <section class="games-hero">
    <div class="games-hero-copy">
      <p class="games-eyebrow">PLAYED WORLDS · 游戏档案</p>
      <h1>Games & reviews<br>游戏与评测</h1>
      <p class="games-lead">Played games, excerpts from Steam reviews, and links to the full reviews.</p>
      <p class="zh-secondary">玩过的游戏，写过的评测。下面选了十段，完整游戏库可以按名称、类型和游玩记录查找。</p>
      <div class="games-hero-actions">
        <a class="games-button primary" href="#featured-games">Review excerpts</a>
        <a class="games-button" href="#game-categories">Browse by type</a>
        <a class="games-button" href="#library">Full library</a>
        <a class="games-button" href="https://steamcommunity.com/id/Tang0630paradise/recommended/" target="_blank" rel="noopener">Steam reviews ↗</a>
        <button class="games-button motion-button" id="game-motion-toggle" type="button" aria-pressed="false">Pause moving background</button>
      </div>
      <p class="archive-note" id="library-sync-status">Loading library details · 正在读取游戏记录</p>
    </div>
  </section>

  <section class="games-section featured-games-section" id="featured-games">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">FROM STEAM REVIEWS</p><h2>Ten excerpts · 十段评测</h2></div>
      <p>Each excerpt links to the complete review on Steam. · 摘录自 Steam 原评测，点开可以读全文。</p>
    </div>
    <div class="memory-grid featured-game-grid" id="featured-game-grid"></div>
  </section>

  <section class="games-section category-section" id="game-categories">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">BROWSE</p><h2>By type · 按类型浏览</h2></div>
      <p>A game may appear in several groups. · 同一款游戏可能出现在多个分类里。</p>
    </div>
    <div class="series-grid category-grid" id="category-grid"></div>
  </section>

  <section class="games-section revision-section">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">A REVIEW CAN KEEP CHANGING</p><h2>Assassin's Creed III · 刺客信条 3</h2></div>
      <p>Four edits, from a negative review to 9/10. · 从差评到 9/10，改了四次。</p>
    </div>
    <div class="revision-story">
      <div class="revision-cover" id="revision-cover"></div>
      <ol class="revision-timeline" lang="zh-CN">
        <li><span>一编</span><strong>1/10，差评。</strong><p>不满意演出、任务设计、读盘和操作。喜欢海尔森和双阵营叙事，但当时觉得这些不足以弥补其他问题。</p></li>
        <li><span>二编</span><strong>冷静后给到 5—6 分，仍然差评。</strong><p>开始重新看待康纳的塑造，以及剧情与真实历史的结合。</p></li>
        <li><span>三编</span><strong>“不行了我要改成好评了…”</strong><p>又想起杀父、查尔斯·李倒酒、华盛顿烧村子的桥段，越回味越喜欢这段剧情。</p></li>
        <li><span>DLC 通关四编</span><strong>“dlc再加一分，9/10特别好评！”</strong><p>喜欢三种动物能力，也喜欢暴君华盛顿那条假想故事线的结尾。</p></li>
      </ol>
    </div>
  </section>

  <section class="games-section library-section" id="library">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">LIBRARY</p><h2>Game library · 游戏库</h2></div>
      <p>Search by name, filter by tag, or sort by playtime. · 按名称搜索、标签筛选，也可以查看游玩时长。</p>
    </div>
    <details class="library-details" id="library-details">
      <summary>Open full library · 展开完整清单</summary>
      <div class="library-inner">
        <div class="library-controls">
          <label class="game-search"><span>⌕</span><input id="game-search-input" type="search" placeholder="Search games or Steam tags"></label>
          <select id="game-sort" aria-label="Game sorting">
            <option value="memory">Most played</option>
            <option value="recent">Recently played</option>
            <option value="reviewed">Reviewed first</option>
            <option value="name">Name</option>
          </select>
          <select id="genre-filter" aria-label="Genre filter"><option value="all">All Steam genres</option></select>
          <button class="filter-toggle" id="installed-filter" type="button" aria-pressed="false">Installed</button>
          <button class="filter-toggle" id="reviewed-filter" type="button" aria-pressed="false">Reviewed</button>
        </div>
        <p class="library-result-line" id="library-result-line">展开后显示游戏。</p>
        <div class="game-library-grid" id="game-library-grid"></div>
        <button class="load-more-games" id="load-more-games" type="button">Load more</button>
      </div>
    </details>
  </section>

  <section class="games-closing">
    <h2>Full reviews on Steam · 完整评测</h2>
    <a class="games-button" href="https://steamcommunity.com/id/Tang0630paradise/recommended/" target="_blank" rel="noopener">Read all reviews · 阅读全部评测 ↗</a>
  </section>
</div>

<script src="{{ '/assets/js/steam-games-data.js' | relative_url }}?v=20260915"></script>
<script src="{{ '/assets/js/games.js' | relative_url }}?v=20260915"></script>
<script src="{{ '/assets/js/games-perspective.js' | relative_url }}?v=20260927-random"></script>
