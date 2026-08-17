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
    <p>Research decisions, photography practice, game writing, software notes, and longer records that do not need to live on the homepage. Entries stay in the language in which they were originally written.</p>
    <p class="zh-secondary">科研判断、摄影练习、游戏体验、软件开发和一些更长的记录。文章正文保留原本使用的语言，不强行翻译成统一语气。</p>
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
