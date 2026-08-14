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
3. Treat a request to “publish the new blog post according to the established workflow” as an instruction to complete every publishing step below without requiring the requester to restate the checklist.
4. Match the supplied draft and image by serial, validate both, and create the permanent post route. Integrate the exact title, description, author, body, pull quotes, useful headings, reading time, publication date, image alt text, and analytics identifier. Use the latest published post as the reference while allowing content-appropriate variations. Keep reusable presentation and behaviour in `blog/blog.css`, `blog/story.css`, and `blog/article.js`; do not add post-specific stylesheets.
5. Make the post the newest item everywhere it is surfaced: update the blog index, homepage cards, related posts, author imagery, and every reused title, summary, URL, and asset. Keep listings newest-first and select related posts by genuine subject relevance.
6. Add accurate canonical, robots, Open Graph, X, `BlogPosting`, and `BreadcrumbList` metadata. Update the canonical HTTPS entry and relevant `<lastmod>` values in `sitemap.xml`; keep `robots.txt` pointing to it.
7. Before finishing, verify the page at desktop and mobile sizes, accessibility basics, internal links, assets, metadata, structured data, image dimensions, listing order, related posts, and sitemap coverage. Finalized drafts may remain in `blog/drafts/` but must not be linked from public pages.
