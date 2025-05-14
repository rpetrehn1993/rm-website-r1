'use client';

import Navigation from '../components/Navigation';

export default function Connect() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Main Content */}
      <div className="relative pt-[150px] z-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h1 className="text-xl md:text-2xl font-degular font-light">
            Connect
          </h1>
        </div>
      </div>
    </main>
  );
} 