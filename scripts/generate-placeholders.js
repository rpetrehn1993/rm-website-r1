const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
  'public/videos',
  'public/gifs',
  'public/images/home'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Base64 encoded 1x1 transparent PNG
const transparentPNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

// Write the transparent PNG to the image file
fs.writeFileSync('public/images/home/art-collection-alt.jpg', Buffer.from(transparentPNG, 'base64'));

// Create a simple video file (just a text file for now)
fs.writeFileSync(
  'public/videos/food-culture-preview.mp4',
  'This is a placeholder video file. Replace with actual video content.'
);

// Create a simple GIF file (just a text file for now)
fs.writeFileSync(
  'public/gifs/documentary-preview.gif',
  'This is a placeholder GIF file. Replace with actual GIF content.'
);

console.log('Placeholder files generated successfully!'); 