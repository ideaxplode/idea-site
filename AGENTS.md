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
4. Public blog pages require canonical, robots, Open Graph, X, and appropriate JSON-LD metadata. `sitemap.xml` contains canonical HTTPS routes with accurate `<lastmod>` dates, and `robots.txt` points crawlers to it.
5. The supplied draft is the editorial source of truth. Preserve its title, author, publication date, summaries, headings, paragraphs, lists, emphasis, conclusion, wording, casing, punctuation, and order exactly. Never rewrite, shorten, expand, paraphrase, or otherwise alter editorial content; ask HA only when editorial content is missing or ambiguous.
6. Use draft `001` as the structural reference. A draft needs only a title (bold text optionally marks the accented title phrase), author, publication date (`YYYY-MM-DD`), article-page/blog-index/homepage summaries, and the article. Optional `## Lead` and `## Conclusion` sections contain one paragraph each; the conclusion receives the larger centered closing-line treatment. Within `## Article`, `###` headings become section headings, and standard Markdown paragraphs, lists, bold, and italics retain their meaning. Do not use pull quotes.
7. Strip only the title’s Markdown formatting and use its editorial text unchanged for the H1, listing and related-card titles, Open Graph and X titles, JSON-LD headline, and breadcrumb. Use the same title plus the fixed ` | ideaXplode` suffix for the browser `<title>`; never generate an alternative SEO title.
8. Derive implementation details from the draft, matching image, and existing conventions: serial and asset references, slug, author image, modification date, reading time, metadata section, accent theme (`coral`, `blue`, or `plum`), image alt text, related posts, SEO and social descriptions, canonical URLs, HTML and analytics identifiers, structured data, and sitemap entries. Do not ask HA to supply these unless they cannot be derived reliably.
9. Google offers no programmatic per-URL indexing request for an ordinary article. After every new or significantly updated post is verified live, explicitly prompt HA to open Search Console, select `ideaxplode.com`, inspect the exact canonical URL, select **Test live URL**, then **Request indexing**. Provide each affected URL in its own copyable code block; never give this prompt before deployment.

### Publishing a New Blog Post

A request to publish according to the established workflow authorizes this complete sequence:

1. Use the serial named in the request; otherwise select the highest serialized draft. Identify its draft, hero image, and any supplied author asset while preserving unrelated work.
2. Move uncommitted draft-related changes from the current branch to an untracked publication branch created from the latest `origin/main`, named `rathan-publish-blog-<serial>` (or `rathan-publish-blogs-<serials>`), and commit those inputs there before implementation. Use that branch for all publication work. If inputs are already committed, cherry-pick the relevant commits and do not rewrite the source branch without HA’s explicit permission.
3. Validate the editorial inputs, derive the implementation details, create each permanent route, and render the supplied content and formatting exactly.
4. Make the new post or posts the newest entries on the blog index and homepage; update ordering, relevant related posts, author imagery, reused links, and supplied copy.
5. Add complete SEO/social metadata, structured data, and sitemap entries with accurate `<lastmod>` values, then perform all standard desktop/mobile, accessibility, link, asset, metadata, image, ordering, related-post, and sitemap checks.
6. Commit the completed publication work, consummate the publication branch using the global workflow, deploy `origin/main` to `origin/live` once, and verify every new canonical URL on the live site.
7. Only after successful live verification, prompt HA to request Google indexing using the General Blog System instructions, listing every newly published URL separately.

### Updating a Published Blog Post

1. Apply the supplied editorial changes exactly. Preserve the post’s serial, route, publication date, and listing position unless HA explicitly changes them; a modification does not become a new publication.
2. Update every affected reuse of the content plus SEO/social metadata, structured data, related posts, and author details. Set the article modification date and all relevant sitemap `<lastmod>` dates to the significant-update date.
3. Run the same publication checks and complete the requested Git/deployment workflow. After verifying the update live, prompt HA to request indexing for the exact canonical URL using the General Blog System instructions.
