import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import postsData from "../posts.json";
import { getFromCache, invalidateCache } from "./redis";

// Define contentDirectory constant
const contentDirectory = path.join(process.cwd(), "content");

const POSTS_CACHE_TTL = parseInt(process.env.POSTS_CACHE_TTL || "3600", 10);

// Function to extract first image from content
function extractFirstImage(content) {
  // Look for markdown image syntax ![alt](src)
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
  const markdownMatch = content.match(markdownImageRegex);

  // Look for HTML img tags <img src="...">
  const htmlImageRegex = /<img.*?src=["'](.*?)["']/;
  const htmlMatch = content.match(htmlImageRegex);

  // Return the first match found (markdown has priority)
  if (markdownMatch && markdownMatch[1]) {
    return markdownMatch[1];
  } else if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1];
  }

  return null;
}

// Returns all post metadata
export function getAllPosts() {
  // Sort posts by date descending before returning
  return postsData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Get posts by year
export function getPostsByYear(year) {
  return postsData.filter((post) => post.year === year);
}

// Get a post by year and slug with Redis caching
export async function getPostBySlug(year, slug) {
  console.log(`Getting post: ${year}/${slug}`);

  const cacheKey = `post:${year}:${slug}`;

  try {
    // Try getting from cache first
    return getFromCache(
      cacheKey,
      async () => {
        console.log(`Cache miss, loading from file: ${year}/${slug}`);
        const fullPath = path.join(contentDirectory, year, slug, "index.mdx");
        console.log(`Full path: ${fullPath}`);

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
          console.error(`File not found: ${fullPath}`);
          return null;
        }

        try {
          const rawFileContents = fs.readFileSync(fullPath, "utf8");
          console.log(`File loaded, length: ${rawFileContents.length}`);

          const { data, content } = matter(rawFileContents);
          console.log(`Matter parsed, frontmatter:`, data);

          const firstImage = extractFirstImage(content);

          // Simplify the MDX serialization to use automatic runtime detection
          const mdxSource = await serialize(content, {
            scope: data,
            mdxOptions: {
              development: false,
            },
          });

          console.log(`MDX serialized successfully`);

          // Return the post with mdxSource
          return {
            id: slug,
            slug: slug, // Add explicit slug property
            year,
            frontMatter: {
              ...data,
              image: data.image || firstImage,
            },
            mdxSource,
          };
        } catch (error) {
          console.error(`Error processing post ${year}/${slug}:`, error);
          return null;
        }
      },
      POSTS_CACHE_TTL
    );
  } catch (error) {
    console.error(`Error in getPostBySlug for ${year}/${slug}:`, error);
    return null;
  }
}

// Add a new post to posts.json
export function addPost(post) {
  const updatedPosts = [...postsData, post];
  fs.writeFileSync(
    path.join(process.cwd(), "posts.json"),
    JSON.stringify(updatedPosts, null, 2)
  );
  return updatedPosts;
}
