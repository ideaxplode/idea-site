# Static blog posts

Each post lives in its own slug directory and is served by that directory's
`index.html`:

```text
blog/
  blog.css
  post-title/
    index.html
```

To add a post, copy an existing post directory, rename it to the new URL slug,
and replace the article content and metadata. Shared blog presentation belongs
in `blog.css`; post-specific content stays in the post's `index.html`.
