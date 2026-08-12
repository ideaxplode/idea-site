# Agent Instructions (Project-Specific)

*Project-specific instructions/information for CA*

## About this project/app

* **Name:** Idea Site  
* **Type:** Website for a software development company  
* **Tech Stack:** HTML, CSS, JavaScript (vanilla)  
* **Notes:**  
  * This is a cloning project where we clone the legacy website that’s already available at [https://ideaxplode.com](https://ideaxplode.com) (which was built using [Bubble.io](http://Bubble.io)).  
  * For this project, we’re cloning from the original to rebuild it EXACTLY using plain HTML+CSS+JS.   
  * The index.html was originally saved from Chrome using the “web page, complete” option.  
  * We have changed/edited the index.html so far to make it standalone without having any [Bubble.io](http://Bubble.io) dependencies; we also should continue to do so.  
  * You can still find a copy of the originally saved Chrome files at `./cloning-inputs/original.html` and the folder `original_files` in the same path. You can use this for your reference while cloning/editing various aspects of the site/page that we're developing.
  * You can find the complete, scrolled screenshot, for your reference, here: **./cloning-inputs/screenshot.png**  
  * You can also browse the live site (at aforementioned URL) to compare with your implementation using the browser tool; you may have to hover/click on items to understand their true behaviours.

## Browser Tool (Vercel’s agent-browser)

1. **How to use:** For direct/manual browser actions, use **agent-browser** commands directly (example: **agent-browser \--session dev open http://localhost:\<port\>** (you can use the active dev URL), then **agent-browser \--session dev snapshot \-i**).  
2. **Headless/Headed mode:** You should run the browser in headless mode unless you’re instructed to run the browser “visually”; finally, close the session yourself – for both headless/headed modes.  
3. **Headed/Visual mode:** Always open browser window maximized in headed mode e.g. **agent-browser \--session dev \--headed \--args "--start-maximized" open http://localhost:3000**

## Blog System

1. The blog is static: the listing is `blog/index.html`; each post is `blog/<three-digit-serial>-<slug>/index.html`. Serial numbers are permanent and appear only in URLs and asset filenames, never in the UI.
2. Treat `blog/004-fast-software-needs-strong-foundation/index.html` as the canonical post template for markup, layout, typography, responsive behaviour, and accessibility. All posts inherit `blog/blog.css`, `blog/story.css`, and `blog/article.js`; do not add post-specific stylesheets.
3. Post hero/social images live in `blog/images/` as `<serial>.jpg`. Standardize them to a 1.91:1 sRGB JPEG (ideally 2400×1260; minimum 1600×838) with important content centred so site crops remain safe. `cover.jpg` is reserved for the blog-index hero.
4. When Rathan supplies a post and numbered hero image: assign the next unused serial, create the route from post `004`, add the content and accurate visible publication details, make it the featured/latest post on `blog/index.html` and in the main-page blog preview, list remaining posts newest-first, and choose related posts by genuine topical relevance. Update every reused title, summary, link, image, alt text, reading time, and analytics identifier.
5. Every public blog page needs a unique title and description, absolute canonical URL, index/follow robots directive, complete Open Graph and X large-image metadata, and matching JSON-LD. Posts use `BlogPosting` plus `BreadcrumbList` with accurate headline, description, canonical URL, dates, author, publisher, and image dimensions; the listing uses `Blog` plus `BreadcrumbList`. Metadata must describe visible page content.
6. `robots.txt` references the root `sitemap.xml`. Whenever a canonical public route is added, renamed, removed, or materially changed, update the sitemap accordingly; include only indexable canonical HTTPS URLs and use `<lastmod>` only for significant content, structured-data, or link changes. Recheck internal links, canonicals, social metadata, structured data, and sitemap entries together.
