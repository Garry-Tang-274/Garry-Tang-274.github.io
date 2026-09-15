---
layout: default
title: Notes & Journal | Tang Zhi
permalink: /notes/
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<div class="content-shell">
  <section class="content-hero">
    <p class="home-kicker">NOTES · JOURNAL · 随笔与记录</p>
    <h1>Notes & Journal</h1>
    <p>Essays on photography, travel, games, films, and everyday life.</p>
    <p class="zh-secondary">随笔、游记、摄影记录，还有游戏与电影的感想。</p>
  </section>

  <section class="content-section">
    <div class="content-section-head"><h2>All entries · 全部记录</h2><span>{{ site.posts | size }} entries</span></div>
    <div class="notes-list">
      {% for post in site.posts %}
      <a class="notes-list-item" href="{{ post.url | relative_url }}">
        <div class="notes-list-meta"><span>{{ post.category | default: 'Note' }}</span></div>
        <div><h3>{{ post.title }}</h3><p>{{ post.excerpt | strip_html | truncate: 180 }}</p></div>
      </a>
      {% endfor %}
    </div>
  </section>
</div>
