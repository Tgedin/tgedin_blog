const fs = require("fs");
const path = require("path");

// Load posts data
const postsJsonPath = path.join(process.cwd(), "posts.json");
let posts = [];

try {
  const postsData = fs.readFileSync(postsJsonPath, "utf8");
  posts = JSON.parse(postsData);
  console.log(`Loaded ${posts.length} posts from posts.json`);
} catch (error) {
  console.error(`Error reading posts.json: ${error.message}`);
  process.exit(1);
}

// Create content directory structure
const contentDir = path.join(process.cwd(), "content");
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
  console.log(`Created content directory at ${contentDir}`);
}

// Create year directories and post directories
posts.forEach((post) => {
  const yearDir = path.join(contentDir, post.year);
  const postDir = path.join(yearDir, post.id);

  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
    console.log(`Created year directory at ${yearDir}`);
  }

  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
    console.log(`Created post directory at ${postDir}`);
  }

  // Check if the index.mdx file exists in the pages/blog directory
  const pagesPath = path.join(process.cwd(), "pages", "blog", `${post.id}.mdx`);
  const indexPath = path.join(postDir, "index.mdx");

  if (!fs.existsSync(indexPath) && fs.existsSync(pagesPath)) {
    // Copy from pages/blog to content directory
    const content = fs.readFileSync(pagesPath, "utf8");
    fs.writeFileSync(indexPath, content);
    console.log(`Copied content from ${pagesPath} to ${indexPath}`);
  }
});

console.log("Content directory structure created successfully");
