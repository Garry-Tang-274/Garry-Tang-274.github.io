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
      <p class="home-lead">Biomedical Informatics undergraduate. Research projects, photographs, software, music, game reviews, and essays.</p>
      <p class="zh-secondary">生物医学信息学本科生。这里有科研项目、摄影作品、自己做的软件，以及音乐、游戏和日常随笔。</p>
      <div class="home-actions">
        <a class="button primary" href="#rooms">Explore the site</a>
        <a class="button secondary" href="{{ '/notes' | relative_url }}">Notes · 随笔</a>
      </div>
    </div>
    <figure class="home-hero-photo">
      <a href="{{ '/assets/photography/hero-rock-silhouette.webp?v=20260806-hq' | relative_url }}" target="_blank" rel="noopener">
        <img src="{{ '/assets/photography/gallery/photo-861ac5912ac5d4f9-1600.webp' | relative_url }}" alt="A figure standing between rock formations in Xinjiang" width="2048" height="944" fetchpriority="high" decoding="async">
      </a>
    </figure>
  </section>

  <section class="home-intro">
    <div>
      <p class="home-kicker">ABOUT</p>
      <h2>What I am working on</h2>
      <p class="zh-secondary">目前在做什么</p>
    </div>
    <div class="home-intro-copy">
      <p>My current research looks at TCR alpha–beta pairing. I compare sequence models, check the data for errors and leakage, and test whether the results hold under different controls.</p>
      <p class="zh-secondary">目前在做 TCR α–β 链配对研究，比较序列模型，检查数据质量与信息泄漏，并通过不同的对照检验结果。</p>
    </div>
  </section>

  <section class="home-section" id="current-build">
    <div class="home-section-head">
      <div><p class="home-kicker">CURRENT BUILD · 最近开发</p><h2>AI Lightroom</h2></div>
      <p>A Windows photo editor with manual controls and optional AI editing suggestions.</p>
    </div>
    <div class="room-grid">
      <a class="room-card room-photo" href="{{ '/ai-lightroom' | relative_url }}">
        <span>AI</span>
        <div>
          <small>WINDOWS · PHOTO EDITING · OPEN SOURCE</small>
          <h3>AI Lightroom</h3>
          <p>Adjust exposure, colour, curves, and masks by hand, or describe the changes you want and let AI suggest settings. Edits can be revised without changing the original file.</p>
          <p class="zh-secondary">可以手动调整曝光、色彩、曲线和蒙版，也可以用文字描述效果，让 AI 建议参数。调整随时可以修改，原始文件保留。</p>
        </div>
        <b>Open project page ↗</b>
      </a>
    </div>
  </section>

  <section id="rooms" class="home-section">
    <div class="home-section-head">
      <div><p class="home-kicker">EXPLORE</p><h2>On this site · 网站内容</h2></div>
    </div>
    <div class="room-grid">
      <a class="room-card room-photo" href="{{ '/photography' | relative_url }}">
        <span>01</span><div><small>PHOTOGRAPHY</small><h3>Photography · 摄影</h3><p>Street scenes, people, landscapes, architecture, and aerial work.</p></div><b>Open gallery ↗</b>
      </a>
      <a class="room-card" href="{{ '/music' | relative_url }}">
        <span>02</span><div><small>MUSIC</small><h3>Music · 音乐</h3><p>Rock, folk, country, and Chinese indie.</p></div><b>Open music page ↗</b>
      </a>
      <a class="room-card" href="{{ '/games' | relative_url }}">
        <span>03</span><div><small>GAMES</small><h3>Games · 游戏</h3><p>Steam library and game reviews.</p></div><b>Open game library ↗</b>
      </a>
      <a class="room-card" href="{{ '/cv' | relative_url }}">
        <span>04</span><div><small>RESEARCH</small><h3>Research & CV · 科研</h3><p>Computational immunology, TCR analysis, public projects, and academic experience.</p></div><b>Open CV ↗</b>
      </a>
      <a class="room-card" href="{{ '/notes' | relative_url }}">
        <span>05</span><div><small>NOTES</small><h3>Notes & Journal · 随笔</h3><p>Photography, travel, games, films, and everyday life.</p></div><b>Open notes ↗</b>
      </a>
    </div>
  </section>

  <section class="home-section home-panorama-section">
    <a class="home-panorama" href="{{ '/assets/photography/featured/hangzhou-qianjiang-panorama-2026-original.jpg?v=20260812-original' | relative_url }}" target="_blank" rel="noopener">
      <img src="{{ '/assets/photography/gallery/photo-3953d6e4858d3e71-1600.webp' | relative_url }}" alt="Qianjiang Century City panorama in Hangzhou" width="21494" height="3663" loading="lazy" decoding="async">
    </a>
  </section>

  <section class="home-section">
    <div class="home-section-head">
      <div><p class="home-kicker">SELECTED PHOTOGRAPHY</p><h2>Selected photographs · 摄影精选</h2></div>
    </div>
    <div class="home-gallery">
      {% for photo in site.data.home_gallery %}
        {% unless photo.visible == false %}
        <figure class="home-gallery-item {{ photo.size | default: 'standard' }}">
          <a href="{{ photo.original | default: photo.image | relative_url }}" target="_blank" rel="noopener">
            <img src="{{ photo.image | relative_url }}" alt="{{ photo.alt | escape }}" width="{{ photo.width }}" height="{{ photo.height }}" loading="lazy" decoding="async">
          </a>
        </figure>
        {% endunless %}
      {% endfor %}
    </div>
    <div class="home-gallery-actions">
      <a class="button secondary" href="{{ '/photography' | relative_url }}">Full photography page</a>
      <a class="button secondary" href="{{ '/manage' | relative_url }}">Manage photos · 图片管理</a>
    </div>
  </section>

  <section class="home-section latest-notes">
    <div class="home-section-head">
      <div><p class="home-kicker">RECENT NOTES</p><h2>Recent notes · 最近记录</h2></div>
    </div>
    <div class="note-preview-grid">
      {% for post in site.posts limit:3 %}
      <a class="note-preview" href="{{ post.url | relative_url }}">
        <div><span>{{ post.category | default: 'Note' }}</span></div>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
      </a>
      {% endfor %}
    </div>
    <a class="text-link" href="{{ '/notes' | relative_url }}">View all notes →</a>
  </section>

</div>
