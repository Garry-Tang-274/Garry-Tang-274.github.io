---
layout: default
title: 网站维护入口 | 唐直
permalink: /manage/
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<div class="content-shell manage-shell">
  <section class="content-hero">
    <p class="home-kicker">SITE MANAGEMENT</p>
    <h1>网站维护入口</h1>
    <p>摄影画廊不显示作品标题。维护时保留原图，为预览图设置分类和替代文字；文章在随笔目录单独管理。</p>
  </section>

  <section class="manage-grid">
    <article class="manage-card">
      <span>01</span><h2>保留原图，生成预览</h2>
      <p>原图不缩小、不覆盖。先检查与已有作品是否重复，再生成用于画廊的轻量预览和占位图；点击作品时打开原图。</p>
      <a class="button primary" href="https://github.com/Garry-Tang-274/Garry-Tang-274.github.io/releases/tag/gallery-originals-20260927" target="_blank" rel="noopener">查看原图存档 ↗</a>
    </article>

    <article class="manage-card">
      <span>02</span><h2>分类与主页精选</h2>
      <p>一张作品可以同时归入人像、人文、风光、极简、都市、自然或纪实等分类。不要新增可见标题或注脚；替代文字只需客观描述画面，供辅助阅读使用。军训作品在画廊中集中排列。</p>
      <a class="button primary" href="https://github.com/Garry-Tang-274/Garry-Tang-274.github.io/edit/main/_data/photography.json" target="_blank" rel="noopener">编辑画廊作品清单 ↗</a>
      <a class="button primary" href="https://github.com/Garry-Tang-274/Garry-Tang-274.github.io/edit/main/_data/home_gallery.yml" target="_blank" rel="noopener">编辑主页图片清单 ↗</a>
    </article>

    <article class="manage-card">
      <span>03</span><h2>新增随笔或长文</h2>
      <p>在 <code>_posts</code> 目录创建 Markdown 文件。文件名必须是 <code>YYYY-MM-DD-title.md</code>。</p>
      <a class="button primary" href="https://github.com/Garry-Tang-274/Garry-Tang-274.github.io/new/main/_posts" target="_blank" rel="noopener">新建一篇记录 ↗</a>
    </article>
  </section>

  <section class="content-section manage-guide">
    <h2>画廊作品清单</h2>
    <p><code>_data/photography.json</code> 保存全部作品。每项使用 <code>thumb</code> 作为缩略图、<code>preview</code> 作为较大预览、<code>original</code> 作为原图；宽高与 <code>placeholder</code> 用于提前留好画面位置，避免加载时出现空白。原图的校验值用于核对文件，不能用预览图替换。</p>
    <p><code>tags</code> 是多选列表：<code>portrait</code>（人像）、<code>culture</code>（人文）、<code>landscape</code>（风光）、<code>minimal</code>（极简）、<code>urban</code>（都市）、<code>nature</code>（自然）、<code>documentary</code>（纪实）、<code>military</code>（军训）。军训作品同时设置 <code>group: military</code>，并在清单中连续排列。其他作品可以混排。</p>
  </section>

  <section class="content-section manage-guide">
    <h2>主页图片条目模板</h2>
    <p>把下面这一段复制到 <code>_data/home_gallery.yml</code> 最后，并替换内容：</p>
<pre><code>- image: /assets/photography/gallery/your-preview.webp
  original: 原图的完整地址
  alt: 用一句话客观描述图片内容
  width: 原图宽度
  height: 原图高度
  size: standard
  visible: true</code></pre>
    <p>这里仅控制主页精选，画廊及分类使用独立作品清单。<code>image</code> 指向预览，<code>original</code> 指向保留原始分辨率的文件；二者不要混用。<code>size</code> 可以使用 <code>standard</code>、<code>wide</code> 或 <code>tall</code>。提交后，确认 GitHub Pages 构建成功，再检查线上页面。</p>
  </section>

  <section class="content-section manage-guide">
    <h2>文章模板</h2>
<pre><code>---
layout: post
title: 文章标题
category: 摄影
---

从这里开始写正文。</code></pre>
    <p>分类建议使用：科研、摄影、游戏、音乐、随笔或日常。</p>
  </section>
</div>
