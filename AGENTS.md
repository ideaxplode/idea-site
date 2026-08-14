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

### General Blog System

1. The blog is static: its listing is `blog/index.html`, and posts use `blog/<three-digit-serial>-<slug>/index.html`. Drafts in `blog/drafts/` are source material and must not be linked publicly.
2. Serials are permanent and organizational only—use them in URLs and asset filenames, never in the UI. Hero/social images are 1200 × 630 sRGB JPEGs at `blog/images/<serial>.jpg`; `000-cover.jpg` is the blog-index hero, and author images belong in `blog/images/authors/`.
3. Use the latest published post as the reference while allowing content-appropriate variations. Keep shared presentation and behaviour in `blog/blog.css`, `blog/story.css`, and `blog/article.js`; do not add post-specific stylesheets.
4. Public blog pages require canonical, robots, Open Graph, X, and appropriate JSON-LD metadata. `sitemap.xml` contains canonical HTTPS routes, and `robots.txt` points crawlers to it.

### Publishing a New Blog Post

A request to publish according to the established workflow means completing this sequence:

1. Match and validate the supplied serialized draft and hero image.
2. Create the permanent post route with the supplied content, author, publication details, reading time, pull quotes, alt text, and analytics identifier.
3. Make it the newest post on the blog index and homepage; update listing order, genuinely relevant related posts, author imagery, and all reused links and copy.
4. Add complete page and social metadata, structured data, and the canonical sitemap entry; update relevant `<lastmod>` values.
5. Verify desktop/mobile presentation, accessibility basics, links, assets, metadata, structured data, image dimensions, listing order, related posts, and sitemap coverage.
