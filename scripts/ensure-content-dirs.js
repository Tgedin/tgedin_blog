const fs = require("fs");
const path = require("path");

// Load posts data
const postsJsonPath = path.join(process.cwd(), "posts.json");
const posts = JSON.parse(fs.readFileSync(postsJsonPath, "utf8"));

// Create content base directory if it doesn't exist
const contentDir = path.join(process.cwd(), "content");
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
  console.log(`Created content directory at ${contentDir}`);
}

// Ensure year and post directories exist for each post
posts.forEach((post) => {
  const yearDir = path.join(contentDir, post.year);
  const postDir = path.join(yearDir, post.id);

  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
    console.log(`Created year directory: ${yearDir}`);
  }

  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
    console.log(`Created post directory: ${postDir}`);
  }

  // Ensure post has an index.mdx file (don't overwrite existing)
  const postFile = path.join(postDir, "index.mdx");
  if (!fs.existsSync(postFile)) {
    console.log(
      `Post file not found at ${postFile} - check if it exists in another location`
    );
  } else {
    console.log(`Post file exists at ${postFile}`);
  }
});

console.log("Finished ensuring content directories exist");
