# Content Creation Workflow

Simple guide for adding content to the blog.

## Adding a New Post

### Automated Method

```bash
# Run the creation script and follow prompts
node scripts/create-post.js
```

### Manual Method

1. Create directory: `content/YYYY/your-post-slug/`
2. Add `index.mdx` with frontmatter:
   ```mdx
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   description: "Brief description"
   tags: ["tag1", "tag2"]
   ---

   # Your Post Title

   Content goes here...
   ```
3. Update `posts.json` with your post metadata

## Managing Projects

Use the project update script:
```bash
# Update project status or last-updated date
node scripts/update-project.js
```

## Git Workflow

1. Create a new branch: `git checkout -b new-post-slug-name`
2. Add content and test locally: `npm run dev`
3. Commit changes: `git add . && git commit -m "Add new post: Title"`
4. Push to GitHub: `git push origin new-post-slug-name`
5. Create a Pull Request to merge into main
6. Review the preview deployment
7. Merge when ready - site auto-deploys

## Branch Naming

- `new-post-{slug}` - New blog posts
- `update-post-{slug}` - Updates to existing posts
- `feature-{name}` - New features
- `fix-{issue}` - Bug fixes

