# Content Creation Workflow

This document outlines the recommended workflow for adding new content to the blog.

## Creating a New Post

### Method 1: Using the Post Creation Script

```bash
# Run the post creation script
node scripts/create-post.js

# Follow the prompts to create a new post
```

### Method 2: Manual Creation

1. Create the directory structure:
   ```
   content/
   └── YYYY/               # Year (e.g., 2025)
       └── your-post-slug/ # Post slug
           ├── index.mdx   # Post content
           └── images/     # Post images
               └── ...
   ```

2. Create an `index.mdx` file with frontmatter:
   ```mdx
   ---
   title: "Your Post Title"
   date: "2025-01-15"
   description: "Brief description of your post"
   tags: ["tag1", "tag2"]
   ---

   # Your Post Title

   Content goes here...
   ```

3. Update `posts.json` to include your new post:
   ```json
   [
     // ...existing posts
     {
       "id": "your-post-slug",
       "title": "Your Post Title",
       "date": "2025-01-15",
       "description": "Brief description of your post",
       "tags": ["tag1", "tag2"],
       "year": "2025",
       "featured": false
     }
   ]
   ```

## Git Workflow

1. Create a branch for your new content:
   ```bash
   git checkout -b new-post-your-post-slug
   ```

2. Write and test your content locally:
   ```bash
   npm run dev
   ```

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Add new post: Your Post Title"
   ```

4. Push to GitHub:
   ```bash
   git push origin new-post-your-post-slug
   ```

5. Create a Pull Request on GitHub to merge into the main branch

6. Vercel will automatically create a preview deployment

7. Review the preview, and when satisfied, merge the PR

8. The changes will automatically deploy to production

## Recommended Branch Naming Conventions

- `new-post-{slug}` - For new blog posts
- `update-post-{slug}` - For updates to existing posts
- `feature-{name}` - For new features
- `fix-{issue}` - For bug fixes

## Content Organization

