# Agent Instructions (Project-Specific)

*Project-specific instructions/information for CA*

## About this project/website

* **Name:** Idea Site  
* **Type:** Website for a software development company  
* **Tech Stack:** HTML, CSS, JavaScript (vanilla)  
* **Notes:**  
  * This website was originally cloned from a legacy website that was built using [Bubble.io](http://Bubble.io).  
  * The index.html was originally saved from Chrome using the “web page, complete” option.  
  * We have changed/edited the index.html so far to make it standalone without having any Bubble.io dependencies; we also should continue to do so.

## Browser Tool (Vercel’s agent-browser)

1. **How to use:** For direct/manual browser actions, use **agent-browser** commands directly (example: **agent-browser \--session dev open [http://localhost:\\](http://localhost:\\)\<port\>** (you can use the active dev URL), then **agent-browser \--session dev snapshot \-i**).  
2. **Headless/Headed mode:** You should run the browser in headless mode unless you’re instructed to run the browser “visually”; finally, close the session yourself – for both headless/headed modes.  
3. **Headed/Visual mode:** Always open browser window maximized in headed mode e.g. **agent-browser \--session dev \--headed \--args "--start-maximized" open [http://localhost:3000](http://localhost:3000)**

## Blog System

1. The blog is static: drafts are supplied in `blog/drafts/`, the listing is `blog/index.html`, and published posts use `blog/<three-digit-serial>-<slug>/index.html`. Serials are permanent and organizational only—use them in URLs and asset filenames, never in the UI.
2. A post’s hero/social image is `blog/images/<serial>.jpg`: require a 1200 × 630 sRGB JPEG. `000-cover.jpg` is reserved for the blog-index hero; author images belong in `blog/images/authors/`, with `placeholder.svg` used only until an approved headshot is supplied.
3. When asked to publish, read and validate the finalized draft and image, then integrate the exact title, description, author, pull quotes, body, reading time, publication date, useful headings, image alt text, and analytics identifier. Use the latest published post as the primary reference; retained post `004` may also be consulted for established long-form patterns. Keep reusable presentation and behaviour in `blog/blog.css`, `blog/story.css`, and `blog/article.js`; do not add post-specific stylesheets.
4. Make the new post the latest item wherever appropriate, keep listings newest-first, and update the blog index, homepage cards, related posts, author imagery, and every reused title, summary, URL, and asset. Select related posts by genuine subject relevance.
5. Give every public page accurate canonical, robots, Open Graph, X, and JSON-LD metadata (`BlogPosting`/`Blog` and `BreadcrumbList` as appropriate). Update canonical HTTPS entries and `<lastmod>` values in `sitemap.xml` whenever indexable routes or meaningful public content change; keep `robots.txt` pointing to it and verify links, metadata, structured data, image dimensions, and sitemap coverage together.
6. Post `004` is a non-indexed visual reference: keep it out of public listings, related posts, and `sitemap.xml` unless HA explicitly publishes it. Finalized source drafts may remain in `blog/drafts/` but must not be linked from public pages.
