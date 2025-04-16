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
  const cacheKey = `post:${year}:${slug}`;

  return getFromCache(
    cacheKey,
    async () => {
      const fullPath = path.join(contentDirectory, year, slug, "index.mdx");

      try {
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata
        const { data, content } = matter(fileContents);

        // Extract the first image from content
        const firstImage = extractFirstImage(content);

        // Use next-mdx-remote to serialize the content
        const mdxSource = await serialize(content, {
          // Configure any MDX options here
          mdxOptions: {
            remarkPlugins: [], // Add any remark plugins if needed
            rehypePlugins: [], // Add any rehype plugins if needed
          },
          scope: data,
        });

        return {
          slug,
          year,
          frontmatter: {
            ...data,
            date: data.date ? data.date.toString() : null,
            firstImage: firstImage, // Add the extracted first image
          },
          content: mdxSource,
          firstImage, // Also add at the top level for consistency
        };
      } catch (error) {
        console.log(`Error reading post file: ${error.message}`);
        return null;
      }
    },
    POSTS_CACHE_TTL
  );
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
