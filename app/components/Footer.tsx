'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 font-['Times_New_Roman'] italic">
              © {new Date().getFullYear()} Reagan Matthew. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <Link 
              href="/archive" 
              className="text-white font-degular font-medium text-[10px] tracking-widest hover:opacity-80 transition-opacity duration-200"
            >
              Archive
            </Link>
            <Link 
              href="#" 
              className="text-white font-degular font-medium text-[10px] tracking-widest hover:opacity-80 transition-opacity duration-200"
            >
              Connect
            </Link>
            <Link 
              href="#" 
              className="text-white font-degular font-medium text-[10px] tracking-widest hover:opacity-80 transition-opacity duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 