import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import projectsData from '../projects.json';

// Returns all project metadata
export function getAllProjects() {
  return projectsData;
}

// Get featured projects
export function getFeaturedProjects() {
  return projectsData.filter(project => project.featured);
}

// Get completed projects
export function getCompletedProjects() {
  return projectsData.filter(project => project.completed);
}

// Get a project by slug
export async function getProjectBySlug(slug) {
  // Match the project from projects.json
  const projectData = projectsData.find(project => project.id === slug);
  
  if (!projectData) {
    return null;
  }
  
  // Look for the MDX file in the content structure
  const contentPath = path.join(process.cwd(), 'content', 'projects', slug, 'index.mdx');
  
  // If the file doesn't exist, return null
  if (!fs.existsSync(contentPath)) {
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
    content: mdxSource
  };
}
