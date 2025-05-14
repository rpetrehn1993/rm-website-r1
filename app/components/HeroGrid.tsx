'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Helper function to extract custom name and project type from filename
const extractProjectInfo = (filename: string) => {
  // Extract everything after the last hyphen and before .svg
  const match = filename.match(/hero-\d+-(.+?)-(.+?)-(\d{4})\.svg$/);
  if (match && match[1] && match[2] && match[3]) {
    // Convert to title case and replace hyphens with spaces
    const customName = match[1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const projectType = match[2]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const year = match[3];
    
    return {
      customName,
      projectType,
      year
    };
  }
  // Fallback to the original name if no match found
  return {
    customName: filename.replace('.svg', ''),
    projectType: '',
    year: ''
  };
};

// Base configuration for hero images
const heroImages = [
  {
    name: 'hero-1-food-culture-branded-content-2024',
    title: 'Food & Culture',
    path: '/projects/food-culture',
    projectId: 'food-culture',
    secondaryMedia: {
      type: 'video',
      src: '/videos/food-culture-preview.mp4'
    }
  },
  {
    name: 'hero-2-documentary-series-film-2023',
    title: 'Documentary Series',
    path: '/projects/documentary-series',
    projectId: 'documentary-series',
    secondaryMedia: {
      type: 'gif',
      src: '/gifs/documentary-preview.gif'
    }
  },
  {
    name: 'hero-3-art-collection-exhibition-2024',
    title: 'Art Collection',
    path: '/projects/art-collection',
    projectId: 'art-collection',
    secondaryMedia: {
      type: 'image',
      src: '/images/home/art-collection-alt.jpg'
    }
  },
  {
    name: 'hero-4-hospitality-design-architecture-2024',
    title: 'Hospitality Design',
    path: '/projects/hospitality-design',
    projectId: 'hospitality-design'
  },
  {
    name: 'hero-5-design-journey-branding-2023',
    title: 'Design Journey',
    path: '/projects/design-journey',
    projectId: 'design-journey'
  },
  {
    name: 'hero-6-creative-vision-direction-2024',
    title: 'Creative Vision',
    path: '/projects/creative-vision',
    projectId: 'creative-vision'
  },
  {
    name: 'hero-7-film-series-production-2023',
    title: 'Film Series',
    path: '/projects/film-series',
    projectId: 'film-series'
  },
  {
    name: 'hero-8-artistic-process-exhibition-2024',
    title: 'Artistic Process',
    path: '/projects/artistic-process',
    projectId: 'artistic-process'
  },
  {
    name: 'hero-9-visual-narrative-storytelling-2024',
    title: 'Visual Narrative',
    path: '/projects/visual-narrative',
    projectId: 'visual-narrative'
  },
  {
    name: 'hero-10-creative-process-direction-2023',
    title: 'Creative Process',
    path: '/projects/creative-process',
    projectId: 'creative-process'
  },
  {
    name: 'hero-11-design-evolution-branding-2024',
    title: 'Design Evolution',
    path: '/projects/design-evolution',
    projectId: 'design-evolution'
  },
  {
    name: 'hero-12-art-exploration-exhibition-2023',
    title: 'Art Exploration',
    path: '/projects/art-exploration',
    projectId: 'art-exploration'
  }
];

export default function HeroGrid() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAboutPage, setIsAboutPage] = useState(false);

  useEffect(() => {
    const handleMenuState = (event: CustomEvent) => {
      setIsMenuOpen(event.detail.isMenuOpen);
      setIsExpanded(event.detail.isExpanded);
      setIsAboutPage(event.detail.isAboutPage);
    };

    window.addEventListener('menuStateChange', handleMenuState as EventListener);
    return () => {
      window.removeEventListener('menuStateChange', handleMenuState as EventListener);
    };
  }, []);

  return (
    <div className={`max-w-[1440px] mx-auto px-4 py-12 transition-transform duration-500 ease-in-out ${
      isMenuOpen ? (isAboutPage ? '-translate-x-[729px]' : '-translate-x-[121.5px]') : 'translate-x-0'
    }`}>
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {heroImages.map((hero) => (
          <Link 
            href={hero.path} 
            key={hero.name}
            className="group block"
          >
            <div className="relative overflow-hidden">
              {/* Primary Image */}
              <Image
                src={`/images/home/${hero.name}.svg`}
                alt={hero.title}
                width={2000}
                height={1500}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Secondary Media (appears on hover) */}
              {hero.secondaryMedia && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {hero.secondaryMedia.type === 'video' && (
                    <video
                      src={hero.secondaryMedia.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                  {hero.secondaryMedia.type === 'gif' && (
                    <Image
                      src={hero.secondaryMedia.src}
                      alt={`${hero.title} preview`}
                      width={2000}
                      height={1500}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {hero.secondaryMedia.type === 'image' && (
                    <Image
                      src={hero.secondaryMedia.src}
                      alt={`${hero.title} preview`}
                      width={2000}
                      height={1500}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="mt-1">
              <h3 className="text-base font-degular font-light leading-none">{extractProjectInfo(`${hero.name}.svg`).customName}</h3>
              <p className="text-xs text-gray-600 mt-0 font-['Times_New_Roman'] italic leading-none">
                {extractProjectInfo(`${hero.name}.svg`).projectType}, {extractProjectInfo(`${hero.name}.svg`).year}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}