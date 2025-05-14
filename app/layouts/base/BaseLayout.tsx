import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      <main className="mx-auto max-w-[1440px] px-4">
        {children}
      </main>
    </div>
  );
} 