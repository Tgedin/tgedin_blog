import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

// Base directory for all content
const contentDirectory = path.join(process.cwd(), 'content');

// Create content directory if it doesn't exist
if (!fs.existsSync(contentDirectory)) {
  try {
    fs.mkdirSync(contentDirectory, { recursive: true });
    console.log(`Created content directory at ${contentDirectory}`);
  } catch (error) {
    console.error(`Failed to create content directory: ${error.message}`);
  }
}

/**
 * Gets all posts for a given year
 * @param {string} year - The year to get posts for
 * @returns {Array} Array of post metadata
 */
export async function getPostsByYear(year) {
  const yearDirectory = path.join(contentDirectory, year);
  
  // Check if directory exists
  if (!fs.existsSync(yearDirectory)) {
    console.log(`Year directory does not exist: ${yearDirectory}`);
    return [];
  }
  
  try {
    // Get all directories within the year directory (each is a post)
    const postDirectories = fs.readdirSync(yearDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    console.log(`Found ${postDirectories.length} post directories for year ${year}`);
    
    const posts = [];
    
    for (const postSlug of postDirectories) {
      const indexPath = path.join(yearDirectory, postSlug, 'index.mdx');
      
      // Skip if no index.mdx file exists
      if (!fs.existsSync(indexPath)) {
        console.log(`No index.mdx found for post: ${postSlug}`);
        continue;
      }
      
      // Read the file content
      const fileContents = fs.readFileSync(indexPath, 'utf8');
      
      // Extract frontmatter
      const { data } = matter(fileContents);
      
      posts.push({
        slug: postSlug,
        frontmatter: data,
        year
      });
    }
    
    // Sort posts by date in descending order
    return posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  } catch (error) {
    console.error(`Error getting posts for year ${year}:`, error);
    return [];
  }
}

/**
 * Gets all available years with posts
 * @returns {Array} Array of years with posts
 */
export async function getAllYears() {
  // Get directories in content folder
  const directories = fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => /^\d{4}$/.test(name)) // Only include 4-digit years
    .sort((a, b) => b - a); // Sort years in descending order
  
  return directories;
}

/**
 * Gets a specific post by year and slug
 * @param {string} year - Year of the post
 * @param {string} slug - Slug of the post
 * @returns {Object} Post data and content
 */
export async function getPostBySlug(year, slug) {
  const filePath = path.join(contentDirectory, year, slug, 'index.mdx');
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Extract frontmatter and content
  const { data, content } = matter(fileContents);
  
  // Serialize MDX content
  const mdxSource = await serialize(content);
  
  return {
    frontmatter: data,
    slug,
    year,
    content: mdxSource
  };
}

/**
 * Gets all posts across all years
 * @returns {Array} Array of all posts
 */
export async function getAllPosts() {
  const years = await getAllYears();
  
  const posts = [];
  
  for (const year of years) {
    const yearPosts = await getPostsByYear(year);
    posts.push(...yearPosts);
  }
  
  return posts;
}
