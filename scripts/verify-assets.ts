import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface AssetReference {
  file: string;
  line: number;
  type: 'image' | 'video' | 'gif';
  path: string;
}

async function findAssetReferences(): Promise<AssetReference[]> {
  const files = await glob('app/**/*.{tsx,jsx,ts,js}');
  const references: AssetReference[] = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    // Find image references
    const imageRegex = /src=["'](\/images\/[^"']+)["']/g;
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      const line = content.slice(0, match.index).split('\n').length;
      references.push({
        file,
        line,
        type: 'image',
        path: match[1],
      });
    }

    // Find video references
    const videoRegex = /src=["'](\/videos\/[^"']+)["']/g;
    while ((match = videoRegex.exec(content)) !== null) {
      const line = content.slice(0, match.index).split('\n').length;
      references.push({
        file,
        line,
        type: 'video',
        path: match[1],
      });
    }

    // Find GIF references
    const gifRegex = /src=["'](\/gifs\/[^"']+)["']/g;
    while ((match = gifRegex.exec(content)) !== null) {
      const line = content.slice(0, match.index).split('\n').length;
      references.push({
        file,
        line,
        type: 'gif',
        path: match[1],
      });
    }
  }

  return references;
}

async function verifyAssets() {
  const references = await findAssetReferences();
  const missingAssets: AssetReference[] = [];

  for (const ref of references) {
    const assetPath = path.join(process.cwd(), 'public', ref.path);
    if (!fs.existsSync(assetPath)) {
      missingAssets.push(ref);
    }
  }

  if (missingAssets.length > 0) {
    console.error('\nMissing Assets:');
    missingAssets.forEach(({ file, line, type, path }) => {
      console.error(`- ${type.toUpperCase()}: ${path}`);
      console.error(`  Referenced in ${file}:${line}`);
    });
    process.exit(1);
  } else {
    console.log('All assets verified successfully!');
  }
}

verifyAssets().catch(console.error); 