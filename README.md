# Tang Zhi Personal Website

This repository powers the public website at `https://garry-tang-274.github.io`.

## Site structure

- `/` — personal homepage and selected work
- `/ai-lightroom/` — AI Lightroom project page
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

## Photography quality rules

Do not use tiny thumbnail exports for full-width photographs. A file that looks acceptable in a card can become visibly soft when stretched across a desktop display.

For featured panoramas and other full-width work:

1. Keep a high-quality original web copy under `assets/photography/featured/`.
2. Preserve the photograph's native aspect ratio and do not enlarge it beyond its useful source resolution.
3. Link the displayed photograph to the original web copy so it can be opened directly.
4. Use a new filename or version query when replacing a previously cached image.
5. Remove EXIF/GPS metadata from public copies when location metadata should not be published.
6. Blur identifiable private contact details and license plates when they are not part of the intended public information.

The Qianjiang Century City panorama is maintained as a dedicated high-resolution featured asset rather than a generic gallery thumbnail. The same rule should be used for future panoramas.

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

## Public-content boundary

The site may link to public repositories and a public academic CV, but it should not expose private application records, unpublished research data, credentials, server details, private calendar identifiers, or raw personal contact information beyond addresses intentionally published for contact.
