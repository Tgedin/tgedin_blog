import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import postsData from "../posts.json";
import { getFromCache, invalidateCache } from "./redis";

// Define contentDirectory constant - this is correctly defined but let's make sure
// we use it consistently throughout the function
const contentDirectory = path.join(process.cwd(), "content");

// Cache TTL from environment variables with fallback
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

// Modified getPostBySlug function with simpler MDX handling
export async function getPostBySlug(year, slug, includeRaw = false) {
  console.log(`Getting post: ${year}/${slug}`);

  const fullPath = path.join(contentDirectory, year, slug, "index.mdx");
  console.log(`Checking file at path: ${fullPath}`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File does not exist: ${fullPath}`);
    return null;
  }

  try {
    // Read the file
    const fileContent = fs.readFileSync(fullPath, "utf8");
    console.log(`File loaded, size: ${fileContent.length} bytes`);

    // Parse frontmatter
    const { data, content } = matter(fileContent);
    console.log(`Frontmatter parsed:`, data);

    // Extract first image if available
    const firstImage = extractFirstImage(content);

    // Prepare consistent frontMatter format
    const frontMatter = {
      ...data,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      image: data.image || firstImage || null,
      tags: data.tags || [],
      year: data.year || year,
    };

    // If we only need raw content
    if (includeRaw) {
      return {
        id: slug,
        slug,
        year,
        frontMatter,
        rawContent: content,
      };
    }

    // Serialize MDX with improved options
    try {
      console.log(`Serializing MDX content for ${slug}`);
      const mdxSource = await serialize(content, {
        scope: frontMatter,
        mdxOptions: {
          development: process.env.NODE_ENV !== "production",
        },
      });

      return {
        id: slug,
        slug,
        year,
        frontMatter,
        mdxSource,
      };
    } catch (serializeError) {
      console.error(`Error serializing MDX for ${slug}:`, serializeError);
      // Return with raw content as fallback
      return {
        id: slug,
        slug,
        year,
        frontMatter,
        rawContent: content,
      };
    }
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
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

// Usage example (not shown in provided code but could be implemented as):
export async function getCachedPostBySlug(year, slug) {
  const cacheKey = `post:${year}:${slug}`;
  return getFromCache(
    cacheKey,
    async () => getPostBySlug(year, slug),
    POSTS_CACHE_TTL
  );
}
