# Static blog

The blog landing page lives at `blog/index.html` with its own `index.css` and
`index.js`. Each post lives in its own slug directory and is served by that
directory's `index.html`:

```text
blog/
  images/
    cover.png
    001.webp
    002.webp
    ...
  index.html
  index.css
  index.js
  blog.css
  story.css
  article.js
  001-post-title/
    index.html
```

To add a post, copy an existing post directory, rename it using the next serial
and a descriptive hyphenated slug (for example, `005-post-title`), and replace
the article content and metadata. The long-form article uses
`blog.css`; shorter editorial stories add `story.css`. Shared reading progress
behaviour lives in `article.js`. Post-specific content stays in the post's
`index.html`. Add the published post to the landing page once it is ready to be
listed.

## Post serial numbers and images

Serial numbers are permanent, three-digit publication IDs. Assign the next
unused number when a post is created; never renumber an existing post. Keep the
number in the directory/URL slug and cover filename only; it is not displayed
in the interface.

Blog artwork lives in the shared `blog/images/` directory because covers are
reused by the main-site preview, blog index, article pages, related-post cards,
and social metadata. Name each post's primary cover after its serial number
(`001.webp`, `002.webp`, and so on). `cover.png` is reserved for the blog index
hero artwork.

Current registry:

- `001` — `001-ai-can-help-us-build-software-faster`
- `002` — `002-what-your-mvp-actually-needs`
- `003` — `003-start-ai-automation-with-one-workflow`
- `004` — `004-fast-software-needs-strong-foundation`
