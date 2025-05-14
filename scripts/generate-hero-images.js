const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = ['public/images/heroes'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Define hero images with different aspect ratios
const heroImages = [
  {
    name: 'hero-1',
    width: 1920,
    height: 1080, // 16:9
    title: 'Cinematic Food Story'
  },
  {
    name: 'hero-2',
    width: 1920,
    height: 782, // 2.45:1
    title: 'Cultural Documentary'
  },
  {
    name: 'hero-3',
    width: 1920,
    height: 1440, // 4:3
    title: 'Visual Art Series'
  },
  {
    name: 'hero-4',
    width: 1920,
    height: 960, // 2:1
    title: 'Hospitality Experience'
  },
  {
    name: 'hero-5',
    width: 1920,
    height: 1280, // 3:2
    title: 'Design Process'
  },
  {
    name: 'hero-6',
    width: 1920,
    height: 1200, // 8:5
    title: 'Creative Direction'
  },
  {
    name: 'hero-7',
    width: 1920,
    height: 1080, // 16:9
    title: 'Film Production'
  }
];

// Generate and save each hero image
heroImages.forEach(image => {
  const svg = `
<svg width="${image.width}" height="${image.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#666" text-anchor="middle">
    ${image.title} (${image.width}x${image.height})
  </text>
  <text x="50%" y="60%" font-family="Arial" font-size="16" fill="#999" text-anchor="middle">
    Aspect Ratio: ${(image.width/image.height).toFixed(2)}:1
  </text>
</svg>
`;
  
  fs.writeFileSync(path.join('public/images/heroes', `${image.name}.svg`), Buffer.from(svg));
});

console.log('Hero images generated successfully!'); 