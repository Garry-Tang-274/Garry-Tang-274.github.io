---
layout: default
title: 唐直 · Tang Zhi
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-fullbleed.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<div class="home-shell">
  <section class="home-hero">
    <div class="home-hero-copy">
      <p class="home-kicker">PERSONAL WEBSITE · 个人主页</p>
      <h1>唐直 <span>Tang Zhi</span></h1>
      <p class="home-lead">我是一名生物信息学本科生，也长期拍照、听摇滚、玩游戏和收藏模型。这个网站不是一份只谈科研的简历，而是把这些彼此不同、但都属于我的东西放在一起。</p>
      <div class="home-actions">
        <a class="button primary" href="#rooms">浏览主页</a>
        <a class="button secondary" href="{{ '/notes' | relative_url }}">随笔与记录</a>
      </div>
    </div>
    <figure class="home-hero-photo">
      <img src="{{ '/assets/photography/hero-rock-silhouette.webp?v=20260806-hq' | relative_url }}" alt="新疆岩壁之间的人物剪影">
      <figcaption>《岩壁之间》· 新疆 · 2023</figcaption>
    </figure>
  </section>

  <section class="home-intro">
    <div>
      <p class="home-kicker">ABOUT</p>
      <h2>我在做什么</h2>
    </div>
    <div class="home-intro-copy">
      <p>目前的科研兴趣集中在计算免疫学、TCR 序列分析和机器学习方法审计。我更关心模型到底学到了什么、结论能不能经得住对照，而不只是最后的分数。</p>
      <p>科研之外，我拍摄城市、建筑、自然与航拍景观；音乐以摇滚为主，也听民谣、乡村和华语独立；游戏方面更在意机制、叙事和具体的游玩记忆。</p>
    </div>
  </section>

  <section id="rooms" class="home-section">
    <div class="home-section-head">
      <div><p class="home-kicker">FIVE ROOMS</p><h2>这个网站的几个入口</h2></div>
      <p>主页负责介绍和展示；短更新、随笔和长文统一放进独立的记录区。</p>
    </div>
    <div class="room-grid">
      <a class="room-card room-photo" href="{{ '/photography' | relative_url }}">
        <span>01</span><div><small>PHOTOGRAPHY</small><h3>摄影</h3><p>城市、建筑、自然风光与航拍作品。</p></div><b>进入画廊 ↗</b>
      </a>
      <a class="room-card" href="{{ '/music' | relative_url }}">
        <span>02</span><div><small>MUSIC</small><h3>音乐</h3><p>长期喜欢的乐队、专辑和听歌记录。</p></div><b>查看音乐页 ↗</b>
      </a>
      <a class="room-card" href="{{ '/games' | relative_url }}">
        <span>03</span><div><small>GAMES</small><h3>游戏</h3><p>单机叙事、多人机制与游玩档案。</p></div><b>查看游戏页 ↗</b>
      </a>
      <a class="room-card" href="{{ '/cv' | relative_url }}">
        <span>04</span><div><small>RESEARCH</small><h3>科研与学习</h3><p>研究方向、公开项目和学术经历。</p></div><b>查看 CV ↗</b>
      </a>
      <a class="room-card" href="{{ '/notes' | relative_url }}">
        <span>05</span><div><small>NOTES</small><h3>随笔与记录</h3><p>短更新、科研复盘、摄影手记和游戏感想。</p></div><b>进入记录区 ↗</b>
      </a>
    </div>
  </section>

  <section class="home-section home-panorama-section">
    <div class="home-section-head">
      <div><p class="home-kicker">FEATURED PANORAMA</p><h2>钱江世纪城</h2></div>
      <p>杭州 · 2026 · Nikon Z6 II。点击查看大图。</p>
    </div>
    <a class="home-panorama" href="{{ '/assets/photography/hangzhou-qianjiang-panorama-2026.svg?v=20260806-new' | relative_url }}" target="_blank" rel="noopener">
      <img src="{{ '/assets/photography/hangzhou-qianjiang-panorama-2026.svg?v=20260806-new' | relative_url }}" alt="钱江世纪城夜景全景图">
    </a>
  </section>

  <section class="home-section">
    <div class="home-section-head">
      <div><p class="home-kicker">SELECTED PHOTOGRAPHY</p><h2>主页精选图片</h2></div>
      <p>这里由一个单独的数据文件控制，你可以自己添加图片、标题和注脚。</p>
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
      <a class="button secondary" href="{{ '/photography' | relative_url }}">查看完整摄影页</a>
      <a class="button secondary" href="{{ '/manage' | relative_url }}">自己维护主页图片</a>
    </div>
  </section>

  <section class="home-section latest-notes">
    <div class="home-section-head">
      <div><p class="home-kicker">RECENT NOTES</p><h2>最近记录</h2></div>
      <p>这里只显示最新几条，不让主页变成信息流。</p>
    </div>
    <div class="note-preview-grid">
      {% for post in site.posts limit:3 %}
      <a class="note-preview" href="{{ post.url | relative_url }}">
        <div><span>{{ post.category | default: '记录' }}</span><time>{{ post.date | date: '%Y.%m.%d' }}</time></div>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
      </a>
      {% endfor %}
    </div>
    <a class="text-link" href="{{ '/notes' | relative_url }}">查看全部随笔与记录 →</a>
  </section>

  <section class="home-closing">
    <p class="home-kicker">ONGOING</p>
    <h2>这个网站会随着内容慢慢长出来。</h2>
    <p>先把真正想留下来的东西放进来，再决定它最终应该长成什么样。</p>
  </section>
</div>
