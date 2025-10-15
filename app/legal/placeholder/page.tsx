'use client';

import Link from 'next/link';
import Navigation from '@/app/components/Navigation';

export default function LegalPlaceholder() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-[1440px] mx-auto px-4 py-24">
        <h1 className="font-degular text-3xl mb-4">Legal</h1>
        <p className="font-['Times_New_Roman'] italic text-lg mb-6">Placeholder legal and copyright information.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>© {new Date().getFullYear()} Reagan Matthew. All rights reserved.</li>
          <li>
            See <Link href="/privacy-policy" className="underline">Privacy Policy</Link> for data handling.
          </li>
        </ul>
      </div>
    </main>
  );
} 

