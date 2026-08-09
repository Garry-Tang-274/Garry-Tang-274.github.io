---
layout: default
title: Games | Tang Zhi
permalink: /games/
description: Personal notes on games, narrative, mechanics, worlds, and play.
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/games.css' | relative_url }}?v=20260809-en">
<link rel="stylesheet" href="{{ '/assets/css/games-refresh.css' | relative_url }}?v=20260809-en">
<link rel="stylesheet" href="{{ '/assets/css/games-personal.css' | relative_url }}?v=20260809-en">

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

<div class="games-shell" data-game-revision="20260809-en">
  <section class="games-hero">
    <div class="games-hero-copy">
      <p class="games-eyebrow">PLAYED WORLDS · 游戏档案</p>
      <h1>What stays is not the playtime,<br>but the way a game changes judgement.</h1>
      <p class="games-lead">The games worth remembering do not need to belong to the same genre. One may be an open world that rewards slowing down; another may be a tightly controlled linear narrative willing to create discomfort; another may last only a few hours and still complete an emotional idea. The Chinese reflections below keep the language in which many of these thoughts were first written.</p>
      <p class="zh-secondary">真正留下来的不是游玩时长，而是游戏如何改变判断的方式。重点感悟保留中文原始表达。</p>
      <div class="games-hero-actions">
        <a class="games-button primary" href="#featured-games">Selected works</a>
        <a class="games-button" href="#game-categories">Ways of playing</a>
        <a class="games-button" href="#library">Full library</a>
        <a class="games-button" href="https://steamcommunity.com/id/Tang0630paradise/recommended/" target="_blank" rel="noopener">Steam reviews ↗</a>
        <button class="games-button motion-button" id="game-motion-toggle" type="button" aria-pressed="false">Pause moving background</button>
      </div>
      <p class="archive-note" id="archive-note">The moving background uses only games that have actually been played. Personal categories and writing remain editorial rather than being rewritten by playtime data.</p>
    </div>
  </section>

  <section class="games-section featured-games-section" id="featured-games">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">GAMES THAT STAYED WITH ME</p><h2>Ten works that stayed · 十部留下来的作品</h2></div>
      <p>Not a ranked list. Each card asks what a particular game changed in the way games are understood.</p>
    </div>
    <div class="memory-grid featured-game-grid" id="featured-game-grid"></div>
  </section>

  <section class="games-section principle-section" id="principles">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">HOW TO JUDGE A GAME</p><h2>What matters more than headline metrics</h2></div>
      <p>Not map size, graphics, or hours in isolation, but whether a work establishes its own rhythm, world, and form of expression.</p>
    </div>
    <div class="principle-grid" id="principle-grid"></div>
  </section>

  <section class="games-section category-section" id="game-categories">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">WAYS OF PLAYING</p><h2>Genres as different ways in · 类型是不同的进入方式</h2></div>
      <p>A game can belong to more than one category. These groups describe how the games in the full played library are experienced rather than simply repeating store labels.</p>
    </div>
    <div class="series-grid category-grid" id="category-grid"></div>
  </section>

  <section class="games-section revision-section">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">A REVIEW CAN KEEP CHANGING</p><h2>Assassin's Creed III · 刺客信条 3</h2></div>
      <p>From an angry first judgement to a later reassessment of character, historical ambition, and the strange weight a game can gain after it ends.</p>
    </div>
    <div class="revision-story">
      <div class="revision-cover" id="revision-cover"></div>
      <ol class="revision-timeline">
        <li><span>First completion · 初次通关</span><strong>System design, presentation, and mission structure dominated the first impression.</strong><p>That reaction was real, but it was not the whole work.</p></li>
        <li><span>After distance · 冷静以后</span><strong>Narrative ambition and execution problems became easier to judge separately.</strong><p>The dual perspectives, historical figures, and Connor's position gained weight.</p></li>
        <li><span>Aftertaste · 后劲出现</span><strong>Characters and individual scenes kept returning after the immediate frustration faded.</strong><p>The memory of the work changed the balance of the judgement.</p></li>
        <li><span>After the DLC · DLC 之后</span><strong>The review was eventually changed from negative to positive.</strong><p>A flawed design and a lasting emotional effect can both be true.</p></li>
      </ol>
    </div>
  </section>

  <section class="games-section voice-section">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">IN ORIGINAL WORDS</p><h2>Closest to the original feeling · 接近原始感受的话</h2></div>
      <p>These short passages are not objective descriptions; they keep the voice of the original Chinese reflections without quotation marks.</p>
    </div>
    <div class="featured-review-list voice-list" id="voice-list"></div>
  </section>

  <section class="games-section library-section" id="library">
    <div class="games-section-heading">
      <div><p class="games-eyebrow">THE COMPLETE SHELF</p><h2>Played library · 完整游戏书架</h2></div>
      <p>A searchable archive, not a scoreboard. Cover art begins loading only when the shelf is opened.</p>
    </div>
    <details class="library-details" id="library-details">
      <summary>Open full library · 展开完整清单</summary>
      <div class="library-inner">
        <div class="library-controls">
          <label class="game-search"><span>⌕</span><input id="game-search-input" type="search" placeholder="Search games or Steam tags"></label>
          <select id="game-sort" aria-label="Game sorting">
            <option value="memory">Archive order</option>
            <option value="recent">Recently played</option>
            <option value="reviewed">Reviewed first</option>
            <option value="name">Name</option>
          </select>
          <select id="genre-filter" aria-label="Genre filter"><option value="all">All Steam genres</option></select>
          <button class="filter-toggle" id="installed-filter" type="button" aria-pressed="false">Installed</button>
          <button class="filter-toggle" id="reviewed-filter" type="button" aria-pressed="false">Reviewed</button>
        </div>
        <p class="library-result-line" id="library-result-line">Covers load after the shelf is opened.</p>
        <div class="game-library-grid" id="game-library-grid"></div>
        <button class="load-more-games" id="load-more-games" type="button">Load more</button>
      </div>
    </details>
  </section>

  <section class="games-closing">
    <p class="games-eyebrow">STILL PLAYING</p>
    <h2>Keep recording judgement, not only adding titles.</h2>
    <p>Future entries can include screenshots, long-form writing, series comparisons, and the changes that happen when the same game is reopened years later.</p>
    <a class="games-button" href="{{ '/notes' | relative_url }}">Game notes & long-form writing →</a>
  </section>
</div>

<script src="{{ '/assets/js/steam-games-data.js' | relative_url }}?v=20260809-en"></script>
<script src="{{ '/assets/js/games.js' | relative_url }}?v=20260809-en"></script>
<script src="{{ '/assets/js/games-perspective.js' | relative_url }}?v=20260809-en"></script>