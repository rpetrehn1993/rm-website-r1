'use client';

import { useEffect, useState } from 'react';

export default function ScrollContainer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen">
      <div className="fixed inset-0 h-screen">
        {/* Reel Section */}
        <div 
          className={`h-full transition-transform duration-700 ease-in-out transform ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 py-12">
            <h1 className="text-white font-degular text-4xl mb-8">Explore Reel</h1>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mb-2">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
              </div>
              <span className="text-white text-sm font-['Times_New_Roman'] italic">coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 