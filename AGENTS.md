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

1. The blog is static: the listing is `blog/index.html`; each post is `blog/<three-digit-serial>-<slug>/index.html`. Serial numbers are permanent and appear in URLs and asset filenames.  
2. Treat `blog/004-fast-software-needs-strong-foundation/index.html` as the canonical post template for markup, layout, typography, responsive behaviour, and accessibility. All posts inherit `blog/blog.css`, `blog/story.css`, and `blog/article.js`; do not add post-specific stylesheets.  
3. Post hero/social images live in `blog/images/` as `<serial>.jpg`. `cover.jpg` is reserved for the blog-index hero.  
4. When HA supplies a post and numbered hero image: assign the next unused serial, create the route from post `004`, add the content and accurate visible publication details, make it the featured/latest post on `blog/index.html` and in the main-page blog preview, list remaining posts newest-first, and choose related posts by genuine topical relevance. Update every reused title, summary, link, image, alt text, reading time, and analytics identifier.  
5. Every public blog page needs a unique title and description, absolute canonical URL, index/follow robots directive, complete Open Graph and X large-image metadata, and matching JSON-LD. Posts use `BlogPosting` plus `BreadcrumbList` with accurate headline, description, canonical URL, dates, author, publisher, and image dimensions; the listing uses `Blog` plus `BreadcrumbList`. Metadata must describe visible page content.  
6. `robots.txt` references the root `sitemap.xml`. Whenever a canonical public route is added, renamed, removed, or materially changed, update the sitemap accordingly; include only indexable canonical HTTPS URLs and use `<lastmod>` only for significant content, structured-data, or link changes. Recheck internal links, canonicals, social metadata, structured data, and sitemap entries together.
