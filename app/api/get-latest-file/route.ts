import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const directory = searchParams.get('directory');

  if (!directory) {
    return NextResponse.json({ error: 'Directory parameter is required' }, { status: 400 });
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', directory);
    const files = fs.readdirSync(fullPath)
      .filter(file => !file.startsWith('.') && file !== '.DS_Store'); // Exclude hidden files and .DS_Store
    
    if (files.length === 0) {
      return NextResponse.json({ error: 'No files found in directory' }, { status: 404 });
    }

    // Get the most recent file
    const latestFile = files
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(fullPath, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time)[0].name;

    return NextResponse.json({ file: latestFile });
  } catch (error) {
    console.error('Error getting latest file:', error);
    return NextResponse.json({ error: 'Failed to get latest file' }, { status: 500 });
  }
} 