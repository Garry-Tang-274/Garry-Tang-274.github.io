---
layout: default
title: Tang Zhi · 唐直
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-fullbleed.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<div class="home-shell">
  <section class="home-hero">
    <div class="home-hero-copy">
      <p class="home-kicker">PERSONAL WEBSITE · 个人网站</p>
      <h1>Tang Zhi <span>唐直</span></h1>
      <p class="home-lead">Biomedical Informatics undergraduate working across computational immunology, photography, software, music, and games. This site is a place for the work I build, the images I keep, and the ideas that remain worth returning to.</p>
      <p class="zh-secondary">生物医学信息学本科生。这里同时记录科研、摄影、软件开发、音乐与游戏——不是一份只谈学术的简历，而是一个持续生长的个人档案。</p>
      <div class="home-actions">
        <a class="button primary" href="#rooms">Explore the site</a>
        <a class="button secondary" href="{{ '/notes' | relative_url }}">Notes · 随笔</a>
      </div>
    </div>
    <figure class="home-hero-photo">
      <img src="{{ '/assets/photography/hero-rock-silhouette.webp?v=20260806-hq' | relative_url }}" alt="A figure standing between rock formations in Xinjiang">
      <figcaption>Figure Between Rocks · 岩壁之间 · Xinjiang, 2023</figcaption>
    </figure>
  </section>

  <section class="home-intro">
    <div>
      <p class="home-kicker">ABOUT</p>
      <h2>What I am working on</h2>
      <p class="zh-secondary">目前在做什么</p>
    </div>
    <div class="home-intro-copy">
      <p>My research interests centre on computational immunology, TCR sequence analysis, and careful evaluation of machine-learning methods for biological data. I care less about a single headline score than about what a model has actually learned, whether controls are fair, and whether a conclusion survives leakage checks and matched comparisons.</p>
      <p>Outside research, I photograph cities, landscapes, architecture, and ordinary people; build small software tools; listen mostly to rock; and keep a personal archive of games that changed how I think about narrative, space, and interaction.</p>
      <p class="zh-secondary">科研之外，摄影、软件、摇滚与游戏并不是“附加兴趣”，而是同一套观察和表达方式的不同出口。</p>
    </div>
  </section>

  <section class="home-section" id="current-build">
    <div class="home-section-head">
      <div><p class="home-kicker">CURRENT BUILD · 最近开发</p><h2>AI Lightroom</h2></div>
      <p>A non-destructive Windows photo editor with optional natural-language AI colour-grading plans.</p>
    </div>
    <div class="room-grid">
      <a class="room-card room-photo" href="{{ '/ai-lightroom' | relative_url }}">
        <span>AI</span>
        <div>
          <small>WINDOWS · PHOTO EDITING · OPEN SOURCE</small>
          <h3>AI Lightroom</h3>
          <p>Traditional local adjustments, HSL, curves, masks and watermark layers share one editing state with optional AI providers. The renderer applies supported edits instead of redrawing or replacing the photograph.</p>
          <p class="zh-secondary">把传统非破坏性后期与可选的自然语言调色计划放在同一个桌面编辑器里；AI 只生成调整方案，本地渲染器负责真正执行参数。</p>
        </div>
        <b>Open project page ↗</b>
      </a>
    </div>
  </section>

  <section id="rooms" class="home-section">
    <div class="home-section-head">
      <div><p class="home-kicker">FIVE ROOMS</p><h2>Five ways into the site</h2></div>
      <p>English is the primary language; concise Chinese notes remain alongside it where they add context.</p>
    </div>
    <div class="room-grid">
      <a class="room-card room-photo" href="{{ '/photography' | relative_url }}">
        <span>01</span><div><small>PHOTOGRAPHY</small><h3>Photography · 摄影</h3><p>Street scenes, people, landscapes, architecture, and aerial work.</p></div><b>Open gallery ↗</b>
      </a>
      <a class="room-card" href="{{ '/music' | relative_url }}">
        <span>02</span><div><small>MUSIC</small><h3>Music · 音乐</h3><p>Rock at the centre, with albums and artists that have stayed for years.</p></div><b>Open music page ↗</b>
      </a>
      <a class="room-card" href="{{ '/games' | relative_url }}">
        <span>03</span><div><small>GAMES</small><h3>Games · 游戏</h3><p>Personal reflections on narrative, mechanics, worlds, and play.</p></div><b>Open game archive ↗</b>
      </a>
      <a class="room-card" href="{{ '/cv' | relative_url }}">
        <span>04</span><div><small>RESEARCH</small><h3>Research & CV · 科研</h3><p>Computational immunology, TCR analysis, public projects, and academic experience.</p></div><b>Open CV ↗</b>
      </a>
      <a class="room-card" href="{{ '/notes' | relative_url }}">
        <span>05</span><div><small>NOTES</small><h3>Notes & Journal · 随笔</h3><p>Research reflections, photography notes, game writing, and longer records.</p></div><b>Open notes ↗</b>
      </a>
    </div>
  </section>

  <section class="home-section home-panorama-section">
    <div class="home-section-head">
      <div><p class="home-kicker">FEATURED PANORAMA</p><h2>Qianjiang Century City · 钱江世纪城</h2></div>
      <p>Hangzhou, Zhejiang · 2026 · Nikon Z6 II · Updated high-resolution web edition.</p>
    </div>
    <a class="home-panorama" href="{{ '/assets/photography/featured/hangzhou-qianjiang-panorama-2026.avif?v=20260809' | relative_url }}" target="_blank" rel="noopener">
      <img src="{{ '/assets/photography/featured/hangzhou-qianjiang-panorama-2026.avif?v=20260809' | relative_url }}" alt="Qianjiang Century City panorama in Hangzhou">
    </a>
  </section>

  <section class="home-section">
    <div class="home-section-head">
      <div><p class="home-kicker">SELECTED PHOTOGRAPHY</p><h2>Selected photographs · 摄影精选</h2></div>
      <p>A small rotating selection from the full photography archive.</p>
    </div>
    <div class="home-gallery">
      {% for photo in site.data.home_gallery %}
        {% unless photo.visible == false %}
        <figure class="home-gallery-item {{ photo.size | default: 'standard' }}">
          <a href="{{ photo.original | default: photo.image | relative_url }}" target="_blank" rel="noopener">
            <img src="{{ photo.image | relative_url }}" alt="{{ photo.alt | escape }}" loading="lazy">
          </a>
          <figcaption><strong>{{ photo.title }}</strong><span>{{ photo.caption }}</span></figcaption>
        </figure>
        {% endunless %}
      {% endfor %}
    </div>
    <div class="home-gallery-actions">
      <a class="button secondary" href="{{ '/photography' | relative_url }}">Full photography page</a>
      <a class="button secondary" href="{{ '/manage' | relative_url }}">Maintain homepage images · 自助维护</a>
    </div>
  </section>

  <section class="home-section latest-notes">
    <div class="home-section-head">
      <div><p class="home-kicker">RECENT NOTES</p><h2>Recent notes · 最近记录</h2></div>
      <p>Only the latest entries appear here; the full journal lives on its own page.</p>
    </div>
    <div class="note-preview-grid">
      {% for post in site.posts limit:3 %}
      <a class="note-preview" href="{{ post.url | relative_url }}">
        <div><span>{{ post.category | default: 'Note' }}</span><time>{{ post.date | date: '%Y.%m.%d' }}</time></div>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
      </a>
      {% endfor %}
    </div>
    <a class="text-link" href="{{ '/notes' | relative_url }}">View all notes →</a>
  </section>

  <section class="home-closing">
    <p class="home-kicker">ONGOING</p>
    <h2>A personal archive that keeps changing.</h2>
    <p>Keep the things worth returning to; let the structure grow around them.</p>
    <p class="zh-secondary">先留下真正值得回看的东西，再让这个网站慢慢长成它该有的样子。</p>
  </section>
</div>