---
layout: default
title: 随笔与记录 | 唐直
permalink: /notes/
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<div class="content-shell">
  <section class="content-hero">
    <p class="home-kicker">NOTES · JOURNAL</p>
    <h1>随笔与记录</h1>
    <p>科研过程中的判断、摄影练习、游戏体验，以及一些不需要放在主页上的日常更新。短内容和长文章都统一收在这里。</p>
  </section>

  <section class="content-section">
    <div class="content-section-head"><h2>全部记录</h2><span>{{ site.posts | size }} 篇</span></div>
    <div class="notes-list">
      {% for post in site.posts %}
      <a class="notes-list-item" href="{{ post.url | relative_url }}">
        <div class="notes-list-meta"><span>{{ post.category | default: '记录' }}</span><time>{{ post.date | date: '%Y.%m.%d' }}</time></div>
        <div><h3>{{ post.title }}</h3><p>{{ post.excerpt | strip_html | truncate: 180 }}</p></div>
      </a>
      {% endfor %}
    </div>
  </section>
</div>
