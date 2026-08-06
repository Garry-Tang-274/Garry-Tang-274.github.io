---
layout: default
title: 游戏档案 | 唐直
permalink: /games/
description: 唐直的 Steam 游戏档案、游玩时间、个人评测与长期游戏记录。
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/games.css' | relative_url }}">

<div class="game-art-backdrop" id="game-art-backdrop" aria-hidden="true">
  <div class="art-lane cover-lane lane-one" data-kind="cover" data-size="18" data-offset="0"></div>
  <div class="art-lane hero-lane lane-two" data-kind="hero" data-size="11" data-offset="23"></div>
  <div class="art-lane cover-lane lane-three" data-kind="cover" data-size="18" data-offset="47"></div>
  <div class="art-lane hero-lane lane-four" data-kind="hero" data-size="11" data-offset="71"></div>
  <div class="game-art-shade"></div>
</div>

<div class="games-shell">
  <section class="games-hero-panel">
    <div class="games-hero-copy">
      <p class="games-eyebrow">STEAM PLAY ARCHIVE · 2026.08.06</p>
      <h1>游戏不是清单，<br>而是花过的时间。</h1>
      <p class="games-lead">
        这里收录我的 Steam 游玩记录、个人评测和长期偏好。背景中的封面与官方艺术图来自这份档案中的全部 99 款游戏，并会分批循环出现。
      </p>
      <div class="games-hero-actions">
        <a class="games-button primary" href="#library">浏览完整游戏库</a>
        <a class="games-button" href="https://steamcommunity.com/id/Tang0630paradise/recommended/" target="_blank" rel="noopener">查看 Steam 评测 ↗</a>
      </div>
    </div>

    <div class="games-stat-board">
      <article><strong>99</strong><span>款实际游戏</span></article>
      <article><strong>2,158.1</strong><span>游戏时长 / 小时</span></article>
      <article><strong>69</strong><span>公开游戏评测</span></article>
      <article><strong>61 / 8</strong><span>推荐 / 不推荐</span></article>
      <p>原始档案共 104 个 Steam 条目、2,278.9 小时；此页排除了 5 个软件或配置项。</p>
    </div>
  </section>

  <section class="games-section" id="now-playing">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">RECENTLY PLAYED</p>
        <h2>最近两周，我在玩什么</h2>
      </div>
      <p>不是愿望单，也不是推荐榜；只按最近两周实际记录排序。</p>
    </div>
    <div class="recent-game-grid" id="recent-game-grid"></div>
  </section>

  <section class="games-section">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">TIME SPENT</p>
        <h2>游玩时间留下的排序</h2>
      </div>
      <p>时长不能直接代表评价，但很诚实地说明了我把时间放在了哪里。</p>
    </div>
    <div class="playtime-layout">
      <div class="playtime-ranking" id="playtime-ranking"></div>
      <aside class="game-profile-panel">
        <p class="games-eyebrow">A ROUGH PROFILE</p>
        <h3>我的游戏偏好，大概长这样</h3>
        <div id="genre-bars" class="genre-bars"></div>
        <p class="profile-note">标签会重复计数。一款动作冒险游戏会同时进入“动作”和“冒险”，这比强行把每款游戏塞进单一分类更接近实际。</p>
      </aside>
    </div>
  </section>

  <section class="games-section">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">SERIES & WORLDS</p>
        <h2>我反复回去的系列</h2>
      </div>
      <p>有些偏好不是一款游戏形成的，而是很多年里反复进入同一个世界。</p>
    </div>
    <div class="franchise-grid" id="franchise-grid"></div>
  </section>

  <section class="games-section review-section">
    <div class="games-section-heading">
      <div>
        <p class="games-eyebrow">PERSONAL REVIEWS</p>
        <h2>几段比较能代表我的评测</h2>
      </div>
      <p>保留原本的语气，不把它们改写成统一的“专业评测腔”。</p>
    </div>
    <div class="featured-review-grid" id="featured-review-grid"></div>
  </section>

  <section class="games-section library-section" id="library">
    <div class="games-section-heading library-heading">
      <div>
        <p class="games-eyebrow">FULL LIBRARY</p>
        <h2>完整游玩档案</h2>
      </div>
      <p><span id="library-count">99</span> 款游戏。支持搜索、筛选和排序。</p>
    </div>

    <div class="library-controls">
      <label class="game-search">
        <span>⌕</span>
        <input id="game-search-input" type="search" placeholder="搜索游戏或类型标签">
      </label>
      <select id="game-sort" aria-label="游戏排序">
        <option value="hours">按总时长</option>
        <option value="recent">按近两周时长</option>
        <option value="lastPlayed">按最后游玩</option>
        <option value="steamPositive">按 Steam 好评率</option>
        <option value="name">按名称</option>
      </select>
      <select id="genre-filter" aria-label="类型筛选">
        <option value="all">全部类型</option>
      </select>
      <button class="filter-toggle" id="installed-filter" type="button" aria-pressed="false">仅已安装</button>
      <button class="filter-toggle" id="reviewed-filter" type="button" aria-pressed="false">仅有评测</button>
    </div>

    <div class="game-library-grid" id="game-library-grid"></div>
    <button class="load-more-games" id="load-more-games" type="button">继续显示</button>
  </section>

  <section class="games-closing">
    <p class="games-eyebrow">THE ARCHIVE KEEPS MOVING</p>
    <h2>这不是一份“玩过即完成”的清单。</h2>
    <p>以后这里会继续加入截图、通关状态、跨平台游戏、系列专题和更完整的长文记录。</p>
    <a class="games-button" href="{{ '/notes' | relative_url }}">查看游戏随笔与长文 →</a>
  </section>
</div>

<script src="{{ '/assets/js/steam-games-data.js' | relative_url }}"></script>
<script src="{{ '/assets/js/games.js' | relative_url }}"></script>
