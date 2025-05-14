'use client';

import Navigation from '../../components/Navigation';

export default function ArtCollection() {
  return (
    <main className="min-h-screen bg-[#A09583]">
      <Navigation />
      
      {/* Main Content */}
      <div className="relative pt-[150px] z-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h1 className="text-white font-degular font-light">
            Art Collection
          </h1>
          <div className="mt-8 text-center">
            <p className="font-degular font-semibold italic text-[#FA3820] text-lg">
              Coming Soon
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 