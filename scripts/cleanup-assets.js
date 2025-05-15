const fs = require('fs');
const path = require('path');

// Files to remove
const filesToRemove = [
  // Food Culture
  path.join(process.cwd(), 'public', 'videos', 'food-culture-preview.mp4'),
  
  // Florence 16mm videos
  path.join(process.cwd(), 'public', 'videos', '220312_Florence 16mm_01.mov'),
  path.join(process.cwd(), 'public', 'videos', '220312_Florence 16mm_02.mov'),
  path.join(process.cwd(), 'public', 'videos', '220312_Florence 16mm_03.mov'),
  path.join(process.cwd(), 'public', 'videos', '220312_Florence 16mm_04.mov'),
  path.join(process.cwd(), 'public', 'videos', '220312_Florence 16mm_05.mov'),
  path.join(process.cwd(), 'public', 'videos', '220312_Florence 16mm_06.mov')
];

// Remove files
filesToRemove.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Removed ${path.basename(file)}`);
  }
}); 