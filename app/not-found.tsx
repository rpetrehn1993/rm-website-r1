'use client';

import Link from 'next/link';
import Navigation from './components/Navigation';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Navigation />
      
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
          <h1 className="font-degular text-4xl mb-4">404</h1>
          <p className="font-['Times_New_Roman'] italic text-lg mb-8">Page not found</p>
          <Link 
            href="/" 
            className="text-white font-degular font-medium text-[10px] tracking-widest hover:opacity-80 transition-opacity duration-200"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </main>
  );
} 