---
layout: default
title: Academic CV | Zhi Tang
permalink: /cv/
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/css/portfolio-media.css' | relative_url }}">

<div class="page-shell">
  <section class="page-hero">
    <p class="page-kicker">ACADEMIC CV · PUBLIC WEB EDITION</p>
    <h1>Academic CV<br>学术简历</h1>
    <p class="lead-cn">本页依据当前一页英文暑研 CV v1.2 制作，用于公开展示已确认的教育背景、研究经历、技术能力和研究兴趣。</p>
    <p>This page is based on the current one-page summer-research CV v1.2 and presents confirmed education, research experience, technical skills, and research interests.</p>
    <div class="cv-disclosure">
      <p class="cn">公开版本不包含手机号、住址或默认年级排名；尚未完成的研究阶段、语言考试、未来暑研和未核实技能不会写成既有成果。</p>
      <p>The public edition excludes phone numbers, addresses, and default cohort ranking; incomplete research stages, language tests, future placements, and unverified skills are not presented as completed achievements.</p>
    </div>
    <div class="page-actions">
      <a class="button primary" href="{{ '/' | relative_url }}">返回首页 · Back home</a>
      <a class="button secondary" href="mailto:zhi.25@intl.zju.edu.cn">Email</a>
      <a class="button secondary" href="https://github.com/Garry-Tang-274">GitHub</a>
    </div>
  </section>

  <header class="cv-header">
    <h1>ZHI TANG</h1>
    <p><a href="mailto:zhi.25@intl.zju.edu.cn">zhi.25@intl.zju.edu.cn</a></p>
  </header>

  <section class="cv-section">
    <h2>EDUCATION</h2>
    <article class="cv-entry">
      <div class="cv-entry-header">
        <div>
          <h3>Zhejiang University–University of Edinburgh Institute (ZJE Institute)</h3>
          <p>BSc Biomedical Informatics, dual-degree program</p>
        </div>
        <p class="meta">Haining, Zhejiang, China<br>Expected Jun 2029</p>
      </div>
      <p><strong>Academic record:</strong> GPA 4.10/4.30; average 90.85/100</p>
      <p><strong>Relevant coursework:</strong> Introduction to Cellular and Molecular Biology 1 (93); Introduction to Biomedical Informatics 1 (91); Integrative Biomedical Sciences 1 (89)</p>
    </article>
  </section>

  <section class="cv-section">
    <h2>RESEARCH EXPERIENCE</h2>

    <article class="cv-entry">
      <div class="cv-entry-header">
        <div>
          <h3>Wanlu Liu Lab, ZJE Institute</h3>
          <h4>Undergraduate Researcher</h4>
          <p>Computational study of TCR alpha–beta pairing compatibility</p>
        </div>
        <p class="meta">Haining, Zhejiang, China<br>Mar 2026 – Present</p>
      </div>
      <ul>
        <li>Designed the analytical strategy and conducted a huARdb-based evaluation of whether frozen ESM2 and SCEPTR representations retain cross-chain pairing signals; audited sequence quality, V/J-gene normalization, open reading frames, duplicates, and seen/unseen data splits on a remote Linux server.</li>
        <li>Designed and interpreted a model-capability audit of SCEPTR on 819 Expression-profiled candidates, controlling for CDR3 alpha length and TRAV; OOF Spearman increased from 0.392 to 0.444 (+0.0526; 95% cluster-bootstrap CI, 0.0185–0.0856), while the authentic 1G4 beta was indistinguishable from composition-matched decoys (0.4442 vs 0.4449), supporting an alpha-dominant rather than beta-specific representation.</li>
        <li>Designed and audited globally shuffled, within-individual, and feature-matched negative sets controlling for individual, disease, CDR3 length, and V-gene usage; identified possible false-negative labels because randomly mismatched alpha–beta chains may remain biologically compatible.</li>
        <li>Identified individual-level confounding behind anomalously strong same-disease alpha-to-beta ranking and tightened evaluation to within-individual candidate sets, where performance approached random expectation.</li>
        <li>Proposed and conducted two-level residual analyses across 499,500 pairwise distances and 5-fold cross-fitted ridge models; found that SCEPTR retained more sequence structure than ESM2, while the results did not establish reliable cross-chain pairing information.</li>
      </ul>
    </article>

    <article class="cv-entry">
      <div class="cv-entry-header">
        <div>
          <h3>National-Level Student Research Training Program (SRTP), ZJE Institute</h3>
          <h4>Computational Analysis Member</h4>
          <p>Effects of CD4/CD8 cellular background on TCR alpha–beta pairing and antigen specificity</p>
        </div>
        <p class="meta">Haining, Zhejiang, China<br>Mar 2026 – Present</p>
      </div>
      <ul>
        <li>Serve as one of two computational analysis members in a three-person team investigating how CD4/CD8 cellular contexts affect TCR alpha–beta pairing and antigen specificity.</li>
        <li>Assigned to analyze forthcoming NGS data from four CD4+/CD8+ sample groups, including 1G4-anchored pairing frequencies, comparisons with random expectations, CD4/CD8 enrichment differences, and global pairing distributions; analysis will begin after data generation, and the raw-data processing, QC, and statistical pipeline remain to be finalized.</li>
      </ul>
    </article>
  </section>

  <section class="cv-section">
    <h2>TECHNICAL SKILLS</h2>
    <p><strong>Computing:</strong> Python (basic), Linux command line (basic), Git, remote Linux computing</p>
    <p><strong>Research methods:</strong> TCR repertoire data QC, confounding and leakage audits, matched negative sampling, ranking evaluation (MRR), cross-validated residual analysis</p>
    <p><strong>Tools and models used in research:</strong> scikit-learn, ESM2, SCEPTR</p>
  </section>

  <section class="cv-section">
    <h2>RESEARCH INTERESTS</h2>
    <p>Computational immunology; TCR repertoire analysis; robust evaluation of machine learning for biological sequences</p>
  </section>
</div>
