const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create interface for command-line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load projects
const projectsPath = path.join(process.cwd(), 'projects.json');
let projects = [];

try {
  projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
} catch (error) {
  console.error('Error loading projects:', error.message);
  process.exit(1);
}

// List all projects
console.log('\nAvailable Projects:');
projects.forEach((project, index) => {
  console.log(`${index + 1}. ${project.title} (${project.completed ? 'Completed' : 'Ongoing'})`);
});

// Ask which project to update
rl.question('\nEnter the number of the project to update: ', (projectNum) => {
  const index = parseInt(projectNum) - 1;
  
  if (isNaN(index) || index < 0 || index >= projects.length) {
    console.log('Invalid project number.');
    rl.close();
    return;
  }
  
  const project = projects[index];
  
  console.log(`\nUpdating: ${project.title}`);
  console.log('Current status:', project.completed ? 'Completed' : 'Ongoing');
  
  rl.question('Toggle completion status? (y/n): ', (toggle) => {
    if (toggle.toLowerCase() === 'y') {
      project.completed = !project.completed;
      console.log('New status:', project.completed ? 'Completed' : 'Ongoing');
    }
    
    rl.question('Update "last updated" date to today? (y/n): ', (updateDate) => {
      if (updateDate.toLowerCase() === 'y') {
        const today = new Date().toISOString().split('T')[0];
        project.lastUpdated = today;
        console.log('Last updated date set to:', today);
      }
      
      // Save changes
      fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
      console.log('\nProject updated successfully!');
      
      rl.close();
    });
  });
});
