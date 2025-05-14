'use client';

import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import LogoLayer from '../components/LogoLayer';

export default function Archive() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <LogoLayer />
      
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className={`transition-all duration-[735ms] ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="font-degular text-4xl mb-4">ARCHIVE:</h1>
          <p className="font-['Times_New_Roman'] italic text-lg mb-12">Information 2024</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Column */}
            <div className="space-y-8">
              <div>
                <h2 className="font-degular text-2xl mb-2">Art Collection Exhibition</h2>
                <p className="font-['Times_New_Roman'] italic text-base mb-4">
                  A curated exploration of contemporary art pieces and their cultural significance.
                </p>
                <div className="relative w-[440px] h-[294px]">
                  <Image
                    src="/images/home/hero-3-art-collection-exhibition-2024.svg"
                    alt="Art Collection Exhibition"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="font-degular text-2xl mb-2">Design Evolution</h2>
                <p className="font-['Times_New_Roman'] italic text-base mb-4">
                  The journey of brand transformation and visual identity development.
                </p>
                <div className="relative w-[411px] h-[617px]">
                  <Image
                    src="/images/home/hero-11-design-evolution-branding-2024.svg"
                    alt="Design Evolution"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-8">
              <div>
                <h2 className="font-degular text-2xl mb-2">Film Series Production</h2>
                <p className="font-['Times_New_Roman'] italic text-base mb-4">
                  Behind the scenes of documentary filmmaking and storytelling.
                </p>
                <div className="relative w-[429px] h-[571px]">
                  <Image
                    src="/images/home/hero-7-film-series-production-2023.svg"
                    alt="Film Series Production"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="font-degular text-2xl mb-2">Creative Process</h2>
                <p className="font-['Times_New_Roman'] italic text-base mb-4">
                  Exploring the methodology and inspiration behind creative direction.
                </p>
                <div className="relative w-[387px] h-[515px]">
                  <Image
                    src="/images/home/hero-10-creative-process-direction-2023.svg"
                    alt="Creative Process"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Third Column */}
            <div className="space-y-8">
              <div>
                <h2 className="font-degular text-2xl mb-2">Food Culture</h2>
                <p className="font-['Times_New_Roman'] italic text-base mb-4">
                  A visual journey through culinary traditions and cultural heritage.
                </p>
                <div className="relative w-[387px] h-[515px]">
                  <Image
                    src="/images/home/hero-1-food-culture-branded-content-2024.svg"
                    alt="Food Culture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 