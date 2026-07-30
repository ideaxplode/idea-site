# Static blog

The blog landing page lives at `blog/index.html` with its own `index.css` and
`index.js`. Each post lives in its own slug directory and is served by that
directory's `index.html`:

```text
blog/
  index.html
  index.css
  index.js
  blog.css
  story.css
  article.js
  post-title/
    index.html
```

To add a post, copy an existing post directory, rename it to the new URL slug,
and replace the article content and metadata. The long-form article uses
`blog.css`; shorter editorial stories add `story.css`. Shared reading progress
behaviour lives in `article.js`. Post-specific content stays in the post's
`index.html`. Add the published post to the landing page once it is ready to be
listed.
