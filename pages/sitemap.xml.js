import { getAllPosts } from '../lib/posts';
import { getAllProjects } from '../lib/projects';

const SITE_URL = 'https://tgedin.dev';

function generateSiteMap(posts, projects) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Main pages -->
     <url>
       <loc>${SITE_URL}</loc>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${SITE_URL}/about</loc>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${SITE_URL}/blog</loc>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${SITE_URL}/projects</loc>
       <priority>0.8</priority>
     </url>
     
     <!-- Blog posts -->
     ${posts
       .map(({ id, year }) => {
         return `
       <url>
           <loc>${SITE_URL}/blog/${year}/${id}</loc>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
     
     <!-- Projects -->
     ${projects
       .map(({ id }) => {
         return `
       <url>
           <loc>${SITE_URL}/projects/${id}</loc>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export default function SiteMap() {
  // Empty component as this is just to generate XML
  return null;
}

export async function getServerSideProps({ res }) {
  const posts = getAllPosts();
  const projects = getAllProjects();
  
  // Generate the XML sitemap
  const sitemap = generateSiteMap(posts, projects);
  
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  
  return {
    props: {},
  };
}
