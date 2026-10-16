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
      <p class="home-lead">Biomedical Informatics undergraduate. I work on TCR sequence analysis, build small tools, and take a lot of photographs.</p>
      <p class="zh-secondary">生物医学信息学本科生。平时做 TCR 序列分析，也写工具、拍照，顺手把值得留下的东西放在这里。</p>
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
      <p>Most of my research time is going into TCR alpha–beta pairing. I spend a lot of it cleaning data, setting up fair comparisons, and checking whether a model is learning pairing information or something easier.</p>
      <p class="zh-secondary">现在主要做 TCR α–β 链配对。很多时间其实花在清数据、做对照和排查泄漏上，而不只是训练模型。</p>
    </div>
  </section>

  <section class="home-section" id="current-build">
    <div class="home-section-head">
      <div><p class="home-kicker">CURRENT BUILD · 最近开发</p><h2>AI Lightroom</h2></div>
      <p>The project I have been working on most recently.</p>
    </div>
    <div class="room-grid">
      <a class="room-card room-photo" href="{{ '/ai-lightroom' | relative_url }}">
        <span>AI</span>
        <div>
          <small>WINDOWS · PHOTO EDITING · OPEN SOURCE</small>
          <h3>AI Lightroom</h3>
          <p>A Windows photo editor with the controls I actually use—exposure, colour, curves, HSL, masks, history and export. The prompt box is optional: it turns a description into editable settings rather than replacing the photograph.</p>
          <p class="zh-secondary">一个自己在用的 Windows 照片编辑器。常规调色都能手动做，也可以用文字生成一组还能继续修改的参数。</p>
        </div>
        <b>Open project page ↗</b>
      </a>
    </div>
  </section>

  <section class="home-section">
    <div class="home-section-head">
      <div><p class="home-kicker">RECENT WORK</p><h2>A few things I keep using</h2></div>
      <p class="zh-secondary">最近还在持续维护的几个小项目。</p>
    </div>
    <div class="room-grid">
      <a class="room-card" href="https://github.com/Garry-Tang-274/bioinformatics-paper-reading-workflow">
        <span>01</span><div><small>RESEARCH</small><h3>Paper Reading Workflow</h3><p>Checklists for reading methods papers, checking baselines and deciding what is worth reproducing.</p></div><b>GitHub ↗</b>
      </a>
      <a class="room-card" href="https://github.com/Garry-Tang-274/windows-remote-research-playbook">
        <span>02</span><div><small>TOOLS</small><h3>Remote Research Playbook</h3><p>Notes from SSH, VPN, TUN, proxy and remote-development problems I have actually run into.</p></div><b>GitHub ↗</b>
      </a>
      <a class="room-card" href="https://github.com/Garry-Tang-274/student-calendar-coordinator">
        <span>03</span><div><small>WORKFLOW</small><h3>Calendar Coordinator</h3><p>Rules for keeping mail, Blackboard updates, meetings and deadlines in one cleaner schedule.</p></div><b>GitHub ↗</b>
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
