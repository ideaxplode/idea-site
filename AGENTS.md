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
5. The supplied draft is the editorial source of truth. Preserve its title, author, publication date, summaries, headings, paragraphs, lists, emphasis, conclusion, wording, casing, punctuation, and order exactly. Never rewrite, shorten, expand, paraphrase, or otherwise alter editorial content; ask HA only when editorial content is missing or ambiguous.
6. Use draft `001` as the structural reference. A draft needs only a title (bold text optionally marks the accented title phrase), author, publication date (`YYYY-MM-DD`), article-page/blog-index/homepage summaries, and the article. Optional `## Lead` and `## Conclusion` sections contain one paragraph each; the conclusion receives the larger centered closing-line treatment. Within `## Article`, `###` headings become section headings, and standard Markdown paragraphs, lists, bold, and italics retain their meaning. Do not use pull quotes.
7. Derive implementation details from the draft, matching image, and existing conventions: serial and asset references, slug, author image, modification date, reading time, metadata section, accent theme (`coral`, `blue`, or `plum`), image alt text, related posts, SEO and social metadata, canonical URLs, HTML and analytics identifiers, structured data, and sitemap entries. Do not ask HA to supply these unless they cannot be derived reliably.

### Publishing a New Blog Post

A request to publish according to the established workflow means completing this sequence:

1. Use the serial named in the publishing request; when none is supplied, select the most recent draft (the highest serialized draft filename). Match its hero image and validate the required editorial content and assets.
2. Derive the implementation details listed above, then create the permanent route and render the supplied editorial content and formatting exactly.
3. Make it the newest post on the blog index and homepage; update listing order, relevant related posts, author imagery, and all reused links and supplied copy.
4. Add complete SEO and social metadata, structured data, and the canonical sitemap entry; update relevant `<lastmod>` values.
5. Verify desktop/mobile presentation, accessibility basics, links, assets, metadata, structured data, image dimensions, listing order, related posts, and sitemap coverage.
