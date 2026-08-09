---
layout: default
title: AI Lightroom | Tang Zhi
permalink: /ai-lightroom/
description: AI Lightroom is a non-destructive Windows photo editor with optional natural-language AI colour-grading plans.
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<div class="page-shell">
  <section class="page-hero">
    <p class="page-kicker">SOFTWARE · RECENT BUILD · 最近开发</p>
    <h1>AI Lightroom</h1>
    <p class="lead-cn">A Windows desktop photo editor built around non-destructive traditional adjustments, with optional natural-language AI colour-grading plans and pluggable providers.</p>
    <p class="zh-secondary">一款 Windows 桌面摄影后期工具：传统非破坏性参数负责真正修改图像，AI 作为可选的自然语言调色规划层。</p>
    <div class="page-actions">
      <a class="button primary" href="https://github.com/Garry-Tang-274/AI-Lightroom" target="_blank" rel="noopener">GitHub repository ↗</a>
      <a class="button secondary" href="{{ '/' | relative_url }}">Home</a>
      <a class="button secondary" href="{{ '/photography' | relative_url }}">Photography</a>
    </div>
  </section>

  <section class="cv-section">
    <h2>Why I built it · 为什么做它</h2>
    <p>AI-assisted photo editing is useful when natural language can describe an intention, but the actual image should still be edited through transparent photographic parameters rather than silently regenerated. AI Lightroom keeps those two layers separate: a provider may propose an editing plan, while the local renderer performs the supported exposure, colour, HSL, curve, mask, and watermark operations.</p>
    <p class="zh-secondary">自然语言适合描述“想把照片调成什么样”，但真正落到图片上的修改仍应当是可解释、可撤销的摄影参数，而不是把画面重新生成一遍。这个软件把“AI 规划”和“本地执行”分开。</p>
  </section>

  <section class="cv-section">
    <h2>Current capabilities</h2>
    <ul>
      <li>Non-destructive Basic adjustments, HSL, RGB/channel curves, colour grading, masks, brush masks, and watermark layers.</li>
      <li>Before/after, undo/redo, histogram, zoom, full-resolution JPG/PNG export, and crash-recovery sessions.</li>
      <li>One shared editing state for manual controls and optional AI providers.</li>
      <li>Provider routes for JarvisArt Local GGUF, Gemini, OpenAI, Qwen / DashScope, DeepSeek text adjustments, custom OpenAI-compatible APIs, and an offline development mock.</li>
      <li>Local manual editing works without an AI account or API key.</li>
    </ul>
    <p class="zh-secondary">目前已覆盖基础参数、HSL、曲线、色彩分级、蒙版、水印、历史记录与导出，并允许本地模型和多个云端模型使用同一套编辑状态。</p>
  </section>

  <section class="cv-section">
    <h2>Design rule</h2>
    <p><strong>AI Lightroom does not treat generative replacement as a normal colour-grading operation.</strong> Supported requests are translated into editing parameters and applied locally. The project is independent and is not affiliated with or endorsed by Adobe.</p>
    <p class="zh-secondary"><strong>生成式重绘不是这个编辑器的默认调色方式。</strong> 支持的需求会转化为参数，再由本地渲染器执行。项目为独立开发，与 Adobe 无隶属或背书关系。</p>
  </section>
</div>