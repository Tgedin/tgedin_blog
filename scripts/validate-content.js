const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Validation configuration
const requiredFrontmatter = ['title', 'date', 'description'];
const postJsonPath = path.join(process.cwd(), 'posts.json');
const projectJsonPath = path.join(process.cwd(), 'projects.json');
const contentDir = path.join(process.cwd(), 'content');

// Track validation issues
let hasErrors = false;
const errors = [];

// Helper to report errors
function reportError(message) {
  console.error(`❌ ${message}`);
  errors.push(message);
  hasErrors = true;
}

// Helper to report success
function reportSuccess(message) {
  console.log(`✅ ${message}`);
}

// 1. Validate posts.json exists and is valid JSON
try {
  const posts = JSON.parse(fs.readFileSync(postJsonPath, 'utf8'));
  reportSuccess(`Posts JSON is valid with ${posts.length} entries`);
  
  // 2. Check that each post in posts.json has corresponding MDX file
  posts.forEach(post => {
    const postPath = path.join(contentDir, post.year, post.id, 'index.mdx');
    
    if (!fs.existsSync(postPath)) {
      reportError(`Post "${post.id}" in posts.json has no corresponding MDX file at ${postPath}`);
    } else {
      // Read and validate frontmatter
      const fileContents = fs.readFileSync(postPath, 'utf8');
      const { data } = matter(fileContents);
      
      requiredFrontmatter.forEach(field => {
        if (!data[field]) {
          reportError(`Post "${post.id}" is missing required frontmatter: ${field}`);
        }
      });
    }
  });
} catch (error) {
  reportError(`Failed to read posts.json: ${error.message}`);
}

// 3. Check projects.json 
try {
  const projects = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
  reportSuccess(`Projects JSON is valid with ${projects.length} entries`);
  
  // 4. Check each project has corresponding MDX file
  projects.forEach(project => {
    const projectPath = path.join(contentDir, 'projects', project.id, 'index.mdx');
    
    if (!fs.existsSync(projectPath)) {
      reportError(`Project "${project.id}" in projects.json has no corresponding MDX file at ${projectPath}`);
    } else {
      // Validate project frontmatter
      const fileContents = fs.readFileSync(projectPath, 'utf8');
      const { data } = matter(fileContents);
      
      requiredFrontmatter.forEach(field => {
        if (!data[field]) {
          reportError(`Project "${project.id}" is missing required frontmatter: ${field}`);
        }
      });
    }
  });
} catch (error) {
  reportError(`Failed to read projects.json: ${error.message}`);
}

// 5. Check for orphaned content files
function checkForOrphanedContent() {
  // Check year directories
  const yearDirs = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && /^\d{4}$/.test(dirent.name))
    .map(dirent => dirent.name);
    
  yearDirs.forEach(year => {
    const yearPath = path.join(contentDir, year);
    const postDirs = fs.readdirSync(yearPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
      
    postDirs.forEach(postDir => {
      // Check if this post directory exists in posts.json
      const posts = JSON.parse(fs.readFileSync(postJsonPath, 'utf8'));
      const postExists = posts.some(post => post.id === postDir && post.year === year);
      
      if (!postExists) {
        reportError(`Found orphaned content directory: ${year}/${postDir} (not referenced in posts.json)`);
      }
    });
  });
  
  // Check project directories
  const projectsPath = path.join(contentDir, 'projects');
  if (fs.existsSync(projectsPath)) {
    const projectDirs = fs.readdirSync(projectsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
      
    projectDirs.forEach(projectDir => {
      // Check if this project directory exists in projects.json
      const projects = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
      const projectExists = projects.some(project => project.id === projectDir);
      
      if (!projectExists) {
        reportError(`Found orphaned project directory: projects/${projectDir} (not referenced in projects.json)`);
      }
    });
  }
}

try {
  checkForOrphanedContent();
  reportSuccess('Orphaned content check completed');
} catch (error) {
  reportError(`Failed to check for orphaned content: ${error.message}`);
}

// Final report
if (hasErrors) {
  console.error('\n🚨 Content validation failed with the following errors:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
} else {
  console.log('\n✅ All content validated successfully!');
}
