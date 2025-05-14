'use client';

import Navigation from '../../components/Navigation';
import VimeoPlayer from '../../components/VimeoPlayer';

export default function DocumentarySeries() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Main Content */}
      <div className="relative pt-[150px] z-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          {/* Video Section */}
          <div className="mt-8">
            <VimeoPlayer
              videoId="1002923522"
              className="rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto"
              autoplay={false}
              loop={false}
              muted={false}
              controls={true}
            />
            <div className="mt-4 text-center text-sm text-gray-500">
              Video ID: 1002923522
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h1 className="text-4xl font-degular font-medium mb-6">
              Documentary Series
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              A collection of documentary films exploring various aspects of human experience and culture.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 