const fs = require("fs");
const path = require("path");

// Load posts data
const postsJsonPath = path.join(process.cwd(), "posts.json");
let posts = [];

try {
  const postsData = fs.readFileSync(postsJsonPath, "utf8");
  posts = JSON.parse(postsData);
  console.log(`✓ Successfully loaded posts.json with ${posts.length} entries`);
} catch (error) {
  console.error(`Error reading posts.json: ${error.message}`);
  process.exit(1);
}

// Check content directory structure
const contentDir = path.join(process.cwd(), "content");
try {
  if (fs.existsSync(contentDir)) {
    const contentStat = fs.statSync(contentDir);
    console.log(`✓ Content directory exists at ${contentDir}`);
    console.log(`  - Directory permissions: ${contentStat.mode.toString(8)}`);

    const years = fs.readdirSync(contentDir);
    console.log(
      `  - Found ${years.length} year directories: ${years.join(", ")}`
    );
  } else {
    console.error(`✗ Content directory does not exist at ${contentDir}`);
    fs.mkdirSync(contentDir, { recursive: true });
    console.log(`✓ Created content directory at ${contentDir}`);
  }
} catch (error) {
  console.error(`Error checking content directory: ${error.message}`);
}

// Check each post
console.log("\nChecking individual posts:");
posts.forEach((post) => {
  console.log(`\nPost: ${post.year}/${post.id}`);

  // Check content directory path
  const postDir = path.join(contentDir, post.year, post.id);
  const indexPath = path.join(postDir, "index.mdx");

  try {
    if (fs.existsSync(postDir)) {
      console.log(`✓ Post directory exists at ${postDir}`);

      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf8");
        console.log(`✓ Found index.mdx (${content.length} bytes)`);

        // Check if year in frontmatter matches
        if (content.includes(`year: "${post.year}"`)) {
          console.log(`✓ Year in frontmatter matches: ${post.year}`);
        } else {
          console.log(`✗ Year missing or mismatched in frontmatter`);
        }
      } else {
        console.error(`✗ index.mdx not found at ${indexPath}`);
      }
    } else {
      console.error(`✗ Post directory does not exist at ${postDir}`);
    }
  } catch (error) {
    console.error(`Error checking post ${post.id}: ${error.message}`);
  }

  // Check pages/blog directory (alternative location)
  const altPath = path.join(process.cwd(), "pages", "blog", `${post.id}.mdx`);
  try {
    if (fs.existsSync(altPath)) {
      console.log(`✓ Alternative file exists at ${altPath}`);
    }
  } catch (error) {
    console.error(`Error checking alternative path: ${error.message}`);
  }
});

console.log("\nCheck complete.");
