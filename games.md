---
layout: default
title: 游戏 | 唐直
permalink: /games/
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<div class="content-shell">
  <section class="content-hero games-hero">
    <p class="home-kicker">GAMES</p>
    <h1>游戏</h1>
    <p>我不准备把这里做成评分网站。更想记录一款游戏具体吸引我的地方、它的机制怎样改变体验，以及它和当时生活之间留下了什么联系。</p>
  </section>

  <section class="content-section">
    <div class="content-section-head"><h2>我通常关注什么</h2></div>
    <div class="game-grid">
      <article><small>NARRATIVE</small><h3>单机叙事</h3><p>关卡节奏、空间设计、人物关系，以及通关以后还会记得的场景。</p></article>
      <article><small>SYSTEMS</small><h3>多人机制</h3><p>临场变化、队伍协作和一局游戏里无法复刻的瞬间，例如《战地 V》。</p></article>
      <article><small>TOGETHER</small><h3>同屏与聚会</h3><p>适合和朋友一起玩的合作、对抗和派对游戏。</p></article>
      <article><small>ARCHIVE</small><h3>游玩档案</h3><p>以后会逐渐补充通关记录、截图、短评和完整体验文章。</p></article>
    </div>
  </section>

  <section class="content-section">
    <div class="content-section-head"><h2>相关记录</h2></div>
    <div class="notes-list">
      {% assign game_posts = site.posts | where: 'category', '游戏' %}
      {% for post in game_posts %}
      <a class="notes-list-item" href="{{ post.url | relative_url }}">
        <div class="notes-list-meta"><span>游戏</span><time>{{ post.date | date: '%Y.%m.%d' }}</time></div>
        <div><h3>{{ post.title }}</h3><p>{{ post.excerpt | strip_html | truncate: 180 }}</p></div>
      </a>
      {% endfor %}
    </div>
  </section>
</div>
