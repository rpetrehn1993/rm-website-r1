const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(process.cwd(), 'public', 'projects');

// Ensure all required directories exist
function ensureDirectories(projectPath) {
  const dirs = [
    'hero/main',
    'hero/hover',
    'content/images',
    'content/copy',
    'metadata'
  ];

  dirs.forEach(dir => {
    const fullPath = path.join(projectPath, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
}

// Move files to their correct locations
function organizeProjectAssets(projectPath) {
  const projectName = path.basename(projectPath);
  
  // Ensure all directories exist
  ensureDirectories(projectPath);

  // Move hero image if it exists
  const heroImage = path.join(projectPath, 'hero.jpg');
  if (fs.existsSync(heroImage)) {
    fs.renameSync(
      heroImage,
      path.join(projectPath, 'hero', 'main', 'main.jpg')
    );
  }

  // Move hover video if it exists
  const hoverVideo = path.join(projectPath, 'hover.mp4');
  if (fs.existsSync(hoverVideo)) {
    fs.renameSync(
      hoverVideo,
      path.join(projectPath, 'hero', 'hover', 'video.mp4')
    );
  }

  // Move gallery images
  const imagesDir = path.join(projectPath, 'images');
  if (fs.existsSync(imagesDir)) {
    const images = fs.readdirSync(imagesDir);
    images.forEach(image => {
      fs.renameSync(
        path.join(imagesDir, image),
        path.join(projectPath, 'content', 'images', image)
      );
    });
    fs.rmdirSync(imagesDir);
  }

  // Move project description
  const descriptionFile = path.join(projectPath, 'description.md');
  if (fs.existsSync(descriptionFile)) {
    fs.renameSync(
      descriptionFile,
      path.join(projectPath, 'content', 'copy', 'project-description.md')
    );
  }

  // Create project-info.json if it doesn't exist
  const projectInfoPath = path.join(projectPath, 'metadata', 'project-info.json');
  if (!fs.existsSync(projectInfoPath)) {
    const projectInfo = {
      title: projectName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      description: `Description for ${projectName}`,
      year: new Date().getFullYear().toString(),
      category: "Project",
      layout: {
        hero: {
          type: "full",
          height: "full"
        },
        content: {
          blocks: []
        }
      },
      assets: {
        hero: {
          main: {
            path: "hero/main/main.jpg",
            alt: `${projectName} main image`,
            type: "image",
            format: "jpg"
          },
          hover: {
            type: "video",
            assets: [
              {
                path: "hero/hover/video.mp4",
                alt: `${projectName} hover video`,
                type: "video",
                format: "mp4"
              }
            ]
          }
        }
      }
    };

    fs.writeFileSync(projectInfoPath, JSON.stringify(projectInfo, null, 2));
  }
}

// Process all projects
function processAllProjects() {
  const projects = fs.readdirSync(PROJECTS_DIR);
  
  projects.forEach(project => {
    const projectPath = path.join(PROJECTS_DIR, project);
    if (fs.statSync(projectPath).isDirectory()) {
      console.log(`Organizing assets for ${project}...`);
      organizeProjectAssets(projectPath);
    }
  });
}

// Run the script
processAllProjects(); 