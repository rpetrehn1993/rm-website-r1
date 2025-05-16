const fs = require('fs');
const path = require('path');

// Create necessary directories
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Move director's reel
const directorsReel = path.join(process.cwd(), 'public', 'videos', '240117Directors reel_R1.mov');
const reelTarget = path.join(process.cwd(), 'public', 'projects', 'film-series', 'content', 'videos', 'directors-reel.mov');

if (fs.existsSync(directorsReel)) {
  ensureDirectoryExists(path.dirname(reelTarget));
  fs.copyFileSync(directorsReel, reelTarget);
  console.log('Moved director\'s reel to film series project');
}

// Update film series metadata to include the reel
const filmSeriesMetadata = path.join(process.cwd(), 'public', 'projects', 'film-series', 'metadata', 'project-info.json');
if (fs.existsSync(filmSeriesMetadata)) {
  const metadata = JSON.parse(fs.readFileSync(filmSeriesMetadata, 'utf8'));
  
  // Add directors reel to the gallery
  metadata.layout.content.blocks.push({
    "type": "video",
    "title": "Director's Reel",
    "layout": "full",
    "assets": [
      {
        "path": "content/videos/directors-reel.mov",
        "alt": "Director's Reel",
        "type": "video",
        "format": "mov",
        "title": "Director's Reel 2024",
        "caption": "A collection of recent work"
      }
    ]
  });

  fs.writeFileSync(filmSeriesMetadata, JSON.stringify(metadata, null, 2));
  console.log('Updated film series metadata to include director\'s reel');
}

// Fix food culture hover video
const foodCultureHover = path.join(process.cwd(), 'public', 'projects', 'food-culture', 'hero', 'hover', 'video.mp4');
if (!fs.existsSync(foodCultureHover)) {
  // If the hover video is missing, we should notify
  console.log('Warning: Food culture hover video is missing at:', foodCultureHover);
  console.log('Please ensure the video is placed at this location for the hover effect to work.');
} 