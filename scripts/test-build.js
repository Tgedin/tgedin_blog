const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("Starting build verification...");

// Check if content files exist and have correct frontmatter
const contentYears = fs.readdirSync(path.join(process.cwd(), "content"));
console.log(`Found content year directories: ${contentYears.join(", ")}`);

for (const year of contentYears) {
  const yearPath = path.join(process.cwd(), "content", year);
  if (fs.statSync(yearPath).isDirectory()) {
    const posts = fs.readdirSync(yearPath);
    console.log(`Year ${year} has ${posts.length} post directories`);

    for (const post of posts) {
      const postPath = path.join(yearPath, post);
      const indexPath = path.join(postPath, "index.mdx");

      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf-8");
        console.log(`Post ${year}/${post} - Index file exists`);

        // Basic validation of frontmatter
        if (!content.startsWith("---")) {
          console.error(
            `❌ Post ${year}/${post} - Missing frontmatter delimiter`
          );
        } else if (!content.includes("title:")) {
          console.error(
            `❌ Post ${year}/${post} - Missing title in frontmatter`
          );
        } else {
          console.log(`✅ Post ${year}/${post} - Frontmatter looks valid`);
        }
      } else {
        console.error(`❌ Post ${year}/${post} - No index.mdx file found`);
      }
    }
  }
}

// Run a build test
console.log("\nRunning a test build...");
exec("npm run build", (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Build error: ${error}`);
    console.error(stderr);
    return;
  }

  console.log("✅ Build completed successfully!");
  console.log(stdout);

  console.log(
    "\nYour build should now work on Vercel. If you still encounter issues:"
  );
  console.log("1. Check your Vercel environment variables");
  console.log("2. Make sure all required images exist in the public directory");
  console.log(
    '3. Consider adding "fallback: true" in getStaticPaths if dynamic routes are causing issues'
  );
});
