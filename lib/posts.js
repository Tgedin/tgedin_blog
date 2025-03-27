import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import postsData from '../posts.json';

// Returns all post metadata
export function getAllPosts() {
  return postsData;
}

// Get posts by year
export function getPostsByYear(year) {
  return postsData.filter(post => post.year === year);
}

// Get all years that have posts
export function getAllYears() {
  return [...new Set(postsData.map(post => post.year))].sort((a, b) => b - a);
}

// Get a post by year and slug
export async function getPostBySlug(year, slug) {
  // Match the post from posts.json
  const postData = postsData.find(post => post.year === year && post.id === slug);
  
  if (!postData) {
    console.log(`Post not found in posts.json: year=${year}, slug=${slug}`);
    return null;
  }
  
  // Look for the MDX file in the content structure
  const contentPath = path.join(process.cwd(), 'content', year, slug, 'index.mdx');
  
  // If the file doesn't exist, return null
  if (!fs.existsSync(contentPath)) {
    console.log(`MDX file not found: ${contentPath}`);
    return null;
  }
  
  // Read and parse the MDX file
  const fileContents = fs.readFileSync(contentPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Serialize the MDX content
  const mdxSource = await serialize(content);
  
  return {
    frontmatter: data,
    slug,
    year,
    content: mdxSource
  };
}

// Add a new post to posts.json
export function addPost(post) {
  const updatedPosts = [...postsData, post];
  fs.writeFileSync(
    path.join(process.cwd(), 'posts.json'),
    JSON.stringify(updatedPosts, null, 2)
  );
  return updatedPosts;
}
