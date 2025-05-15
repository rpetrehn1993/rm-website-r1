import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getAllFilesRecursively(dir: string, baseDir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    if (file.startsWith('.') || file === '.DS_Store') return;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilesRecursively(filePath, baseDir));
    } else {
      // Return the path relative to the baseDir (public/projects/[projectId]/content)
      results.push(path.relative(baseDir, filePath));
    }
  });
  return results;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const directory = searchParams.get('directory');

  if (!directory) {
    return NextResponse.json({ error: 'Directory parameter is required' }, { status: 400 });
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', directory);
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
    }
    const files = getAllFilesRecursively(fullPath, fullPath)
      .sort((a, b) => {
        // Sort by modification time, most recent first
        const aTime = fs.statSync(path.join(fullPath, a)).mtime.getTime();
        const bTime = fs.statSync(path.join(fullPath, b)).mtime.getTime();
        return bTime - aTime;
      });
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error getting project files:', error);
    return NextResponse.json({ error: 'Failed to get project files' }, { status: 500 });
  }
} 