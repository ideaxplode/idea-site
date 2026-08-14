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

1. The blog is static: its listing is `blog/index.html`, and posts use `blog/<three-digit-serial>-<slug>/index.html`. Serial numbers are permanent, organizational only, and used in URLs and asset filenames—not displayed in the UI.
2. Use the latest published post as the reference when adding a post. Preserve the blog’s overall visual, responsive, and accessibility standards, while allowing content-appropriate variations. Keep reusable presentation and behaviour in `blog/blog.css`, `blog/story.css`, and `blog/article.js`; do not create post-specific stylesheets.
3. Hero/social images live in `blog/images/` as `<serial>.jpg`; `000-cover.jpg` is reserved for the blog-index hero.
4. For a new post, assign the next serial and integrate the supplied content/image, accurate publication details, reading time, alt text, and analytics identifier. Feature it as the latest post on the blog and main-page listings, keep other posts newest-first, and select genuinely relevant related posts. Check every reused title, summary, link, and asset.
5. Give every public page accurate canonical, robots, Open Graph, X, and JSON-LD metadata (`BlogPosting`/`Blog` and `BreadcrumbList` as appropriate). When indexable public routes or meaningful page content change, update the canonical-only HTTPS `sitemap.xml` and relevant `<lastmod>` values; keep `robots.txt` pointing to it and verify internal links, metadata, structured data, and sitemap coverage together.
