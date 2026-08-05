# Tang Zhi Personal Website

This repository powers the public website at `https://garry-tang-274.github.io`.

## Site structure

- `/` — personal homepage and selected work
- `/photography/` — photography gallery
- `/music/` — music interests
- `/games/` — game records
- `/notes/` — short notes and long-form writing
- `/cv/` — academic CV
- `/manage/` — self-service maintenance links and templates

## Add a homepage photo without editing page code

1. Upload the image to `assets/photography/home/`.
2. Edit `_data/home_gallery.yml`.
3. Copy an existing entry and change the image path, title, caption and alt text.
4. Commit the change. GitHub Pages will rebuild automatically.

## Add a note or article

Create a file under `_posts/` named `YYYY-MM-DD-title.md` with front matter:

```yaml
---
layout: post
title: Article title
category: Photography
---
```

The newest three posts appear on the homepage; all posts appear under `/notes/`.
