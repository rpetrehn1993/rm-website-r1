const fs = require('fs');
const path = require('path');

// Create necessary directories
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Move food culture preview
const foodCulturePreview = path.join(process.cwd(), 'public', 'videos', 'food-culture-preview.mp4');
const foodCultureTarget = path.join(process.cwd(), 'public', 'projects', 'food-culture', 'hero', 'hover', 'video.mp4');

if (fs.existsSync(foodCulturePreview)) {
  ensureDirectoryExists(path.dirname(foodCultureTarget));
  fs.copyFileSync(foodCulturePreview, foodCultureTarget);
  console.log('Moved food culture preview video');
}

// Move Florence 16mm videos
const florenceVideos = [
  '220312_Florence 16mm_01.mov',
  '220312_Florence 16mm_02.mov',
  '220312_Florence 16mm_03.mov',
  '220312_Florence 16mm_04.mov',
  '220312_Florence 16mm_05.mov',
  '220312_Florence 16mm_06.mov'
];

const filmSeriesVideosDir = path.join(process.cwd(), 'public', 'projects', 'film-series', 'content', 'videos');
ensureDirectoryExists(filmSeriesVideosDir);

florenceVideos.forEach(video => {
  const source = path.join(process.cwd(), 'public', 'videos', video);
  const target = path.join(filmSeriesVideosDir, video);
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
    console.log(`Moved ${video} to film series project`);
  }
}); 