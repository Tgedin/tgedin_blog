const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

console.log("BLOG POST DIAGNOSTIC TOOL");
console.log("========================\n");

// Load posts.json
const postsJsonPath = path.join(process.cwd(), "posts.json");
let posts = [];

try {
  console.log(`Reading posts.json from: ${postsJsonPath}`);
  if (fs.existsSync(postsJsonPath)) {
    const postsData = fs.readFileSync(postsJsonPath, "utf8");
    posts = JSON.parse(postsData);
    console.log(
      `✓ Successfully loaded posts.json with ${posts.length} entries`
    );
  } else {
    console.error(`✗ posts.json not found at ${postsJsonPath}`);
  }
} catch (error) {
  console.error(`Error reading posts.json: ${error.message}`);
}

// Check content directory
const contentDir = path.join(process.cwd(), "content");
console.log(`\nChecking content directory: ${contentDir}`);

try {
  if (fs.existsSync(contentDir)) {
    console.log(`✓ Content directory exists`);

    // Check content directory is readable
    try {
      const stats = fs.statSync(contentDir);
      console.log(`  Mode: ${stats.mode.toString(8)}`);
      console.log(`  Is directory: ${stats.isDirectory()}`);
      console.log(
        `  Readable: ${
          fs.accessSync(contentDir, fs.constants.R_OK) === undefined
        }`
      );
    } catch (error) {
      console.error(`  Error accessing content directory: ${error.message}`);
    }

    // List year directories
    try {
      const years = fs.readdirSync(contentDir);
      console.log(`  Years found: ${years.join(", ")}`);

      // Check each year directory
      for (const year of years) {
        const yearPath = path.join(contentDir, year);
        console.log(`\n  Checking year: ${year} (${yearPath})`);

        try {
          if (fs.statSync(yearPath).isDirectory()) {
            const slugs = fs.readdirSync(yearPath);
            console.log(`    Slugs found: ${slugs.join(", ")}`);

            // Check each slug directory
            for (const slug of slugs) {
              const slugPath = path.join(yearPath, slug);
              console.log(`\n    Checking slug: ${slug} (${slugPath})`);

              try {
                if (fs.statSync(slugPath).isDirectory()) {
                  const indexPath = path.join(slugPath, "index.mdx");
                  console.log(`      Looking for index.mdx: ${indexPath}`);

                  if (fs.existsSync(indexPath)) {
                    console.log(`      ✓ index.mdx exists`);

                    // Check file content
                    try {
                      const content = fs.readFileSync(indexPath, "utf8");
                      console.log(`      File size: ${content.length} bytes`);

                      // Parse frontmatter
                      try {
                        const { data } = matter(content);
                        console.log(`      ✓ Frontmatter parsed successfully`);
                        console.log(`      Title: ${data.title}`);
                        console.log(`      Year in frontmatter: ${data.year}`);
                      } catch (error) {
                        console.error(
                          `      ✗ Error parsing frontmatter: ${error.message}`
                        );
                      }
                    } catch (error) {
                      console.error(
                        `      ✗ Error reading index.mdx: ${error.message}`
                      );
                    }
                  } else {
                    console.error(`      ✗ index.mdx not found`);
                  }
                } else {
                  console.error(`    ✗ ${slug} is not a directory`);
                }
              } catch (error) {
                console.error(
                  `    ✗ Error accessing slug directory: ${error.message}`
                );
              }
            }
          } else {
            console.error(`  ✗ ${year} is not a directory`);
          }
        } catch (error) {
          console.error(`  ✗ Error accessing year directory: ${error.message}`);
        }
      }
    } catch (error) {
      console.error(`  ✗ Error reading content directory: ${error.message}`);
    }
  } else {
    console.error(`✗ Content directory does not exist. Creating it...`);
    try {
      fs.mkdirSync(contentDir, { recursive: true });
      console.log(`✓ Created content directory`);
    } catch (error) {
      console.error(`✗ Error creating content directory: ${error.message}`);
    }
  }
} catch (error) {
  console.error(`Error checking content directory: ${error.message}`);
}

// Cross-reference posts.json with content files
console.log("\nCross-referencing posts.json with content files:");

for (const post of posts) {
  console.log(`\nPost: ${post.id} (${post.year})`);

  // Check if directory exists
  const postDir = path.join(contentDir, post.year, post.id);
  console.log(`  Directory: ${postDir}`);

  if (fs.existsSync(postDir)) {
    console.log(`  ✓ Directory exists`);

    // Check if index.mdx exists
    const indexPath = path.join(postDir, "index.mdx");
    console.log(`  Index file: ${indexPath}`);

    if (fs.existsSync(indexPath)) {
      console.log(`  ✓ index.mdx exists`);
    } else {
      console.error(`  ✗ index.mdx not found`);

      // Check if it exists in pages/blog
      const pagesPath = path.join(
        process.cwd(),
        "pages",
        "blog",
        `${post.id}.mdx`
      );
      console.log(`  Checking alternative location: ${pagesPath}`);

      if (fs.existsSync(pagesPath)) {
        console.log(`  ✓ Found at alternative location`);
        console.log(`  ! Consider copying to content directory`);
      } else {
        console.error(`  ✗ Not found at alternative location either`);
      }
    }
  } else {
    console.error(`  ✗ Directory does not exist`);

    // Check if it exists in pages/blog
    const pagesPath = path.join(
      process.cwd(),
      "pages",
      "blog",
      `${post.id}.mdx`
    );
    console.log(`  Checking alternative location: ${pagesPath}`);

    if (fs.existsSync(pagesPath)) {
      console.log(`  ✓ Found at alternative location`);
      console.log(`  ! Consider creating directory and copying file`);
    } else {
      console.error(`  ✗ Not found at alternative location either`);
    }
  }
}

console.log("\nDiagnostic complete.");
