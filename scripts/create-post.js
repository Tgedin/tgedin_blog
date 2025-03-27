const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create interface for command-line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask questions to gather post metadata
rl.question('Post title: ', (title) => {
  rl.question('Post description: ', (description) => {
    rl.question('Year (YYYY): ', (year) => {
      rl.question('Tags (comma separated): ', (tagsInput) => {
        rl.question('Featured post? (y/n): ', (featured) => {
          // Generate slug from title
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          
          // Parse tags
          const tags = tagsInput.split(',').map(tag => tag.trim());
          
          // Create content directory structure
          const postDir = path.join(process.cwd(), 'content', year, slug);
          const imagesDir = path.join(postDir, 'images');
          
          // Create directories if they don't exist
          fs.mkdirSync(postDir, { recursive: true });
          fs.mkdirSync(imagesDir, { recursive: true });
          
          // Create MDX file with frontmatter
          const today = new Date().toISOString().split('T')[0];
          const mdxContent = `---
title: "${title}"
date: "${today}"
description: "${description}"
tags: ${JSON.stringify(tags)}
---

# ${title}

Write your content here...

## Section 1

Your first section content...

![Image description](/content/${year}/${slug}/images/example.jpg)

## Section 2

Your second section content...

---

*Conclusion goes here.*
`;
          
          // Write MDX file
          fs.writeFileSync(path.join(postDir, 'index.mdx'), mdxContent);
          
          // Update posts.json
          const postsJsonPath = path.join(process.cwd(), 'posts.json');
          let postsData = [];
          
          if (fs.existsSync(postsJsonPath)) {
            const postsContent = fs.readFileSync(postsJsonPath, 'utf8');
            postsData = JSON.parse(postsContent);
          }
          
          // Add new post to posts.json
          postsData.push({
            id: slug,
            title: title,
            date: today,
            description: description,
            tags: tags,
            year: year,
            featured: featured.toLowerCase() === 'y'
          });
          
          // Write updated posts.json
          fs.writeFileSync(postsJsonPath, JSON.stringify(postsData, null, 2));
          
          console.log(`\nPost created successfully!`);
          console.log(`- Content directory: ${postDir}`);
          console.log(`- Images directory: ${imagesDir}`);
          console.log(`- Added to posts.json`);
          console.log(`\nNext steps:`);
          console.log(`1. Write your content in ${path.join(postDir, 'index.mdx')}`);
          console.log(`2. Add images to ${imagesDir}`);
          console.log(`3. Test locally with 'npm run dev'`);
          console.log(`4. Commit and push your changes`);
          
          rl.close();
        });
      });
    });
  });
});
