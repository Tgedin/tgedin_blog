const fs = require('fs');
const path = require('path');

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];
console.log(`Today's date: ${today}`);

// Update projects.json
const projectsPath = path.join(process.cwd(), 'projects.json');
try {
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  
  // Update all projects or selected ones
  const updatedProjects = projects.map(project => ({
    ...project,
    lastUpdated: today
  }));
  
  fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2));
  console.log('Updated lastUpdated dates in projects.json');
} catch (error) {
  console.error('Error updating projects.json:', error.message);
}

console.log('Date updates completed!');
