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
    <p>这里不是公开后台，也不会保存密码。它把最常用的维护操作集中起来：登录 GitHub 后，你可以自己上传主页图片、修改注脚和新增文章。</p>
  </section>

  <section class="manage-grid">
    <article class="manage-card">
      <span>01</span><h2>上传图片</h2>
      <p>把准备展示的图片上传到主页专用目录。建议使用英文文件名，例如 <code>hangzhou-night-2026.webp</code>。</p>
      <a class="button primary" href="https://github.com/Garry-Tang-274/Garry-Tang-274.github.io/upload/main/assets/photography/home" target="_blank" rel="noopener">打开图片上传页 ↗</a>
    </article>

    <article class="manage-card">
      <span>02</span><h2>添加标题和注脚</h2>
      <p>上传完成后，编辑主页图片清单。复制一个现有条目，只改图片路径、标题、注脚和替代文字即可。</p>
      <a class="button primary" href="https://github.com/Garry-Tang-274/Garry-Tang-274.github.io/edit/main/_data/home_gallery.yml" target="_blank" rel="noopener">编辑主页图片清单 ↗</a>
    </article>

    <article class="manage-card">
      <span>03</span><h2>新增随笔或长文</h2>
      <p>在 <code>_posts</code> 目录创建 Markdown 文件。文件名必须是 <code>YYYY-MM-DD-title.md</code>。</p>
      <a class="button primary" href="https://github.com/Garry-Tang-274/Garry-Tang-274.github.io/new/main/_posts" target="_blank" rel="noopener">新建一篇记录 ↗</a>
    </article>
  </section>

  <section class="content-section manage-guide">
    <h2>主页图片条目模板</h2>
    <p>把下面这一段复制到 <code>_data/home_gallery.yml</code> 最后，并替换内容：</p>
<pre><code>- image: /assets/photography/home/your-image.webp
  original: /assets/photography/home/your-image.webp
  title: 图片标题
  caption: 地点 · 年份 · 设备
  alt: 用一句话客观描述图片内容
  size: standard
  visible: true</code></pre>
    <p><code>size</code> 可以使用 <code>standard</code>、<code>wide</code> 或 <code>tall</code>。提交后 GitHub Pages 通常会在几分钟内更新。</p>
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
