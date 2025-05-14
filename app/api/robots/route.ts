import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
`.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 