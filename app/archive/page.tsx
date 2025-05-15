'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import LogoLayer from '../components/LogoLayer';

// Utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Possible col-span and margin-top values
const colSpanOptions = [
  'col-span-1',
  'col-span-2',
  'md:col-span-1',
  'md:col-span-2',
  'lg:col-span-1',
  'lg:col-span-2',
  'lg:col-span-3'
];
const mtOptions = ['mt-0', 'mt-8', 'mt-16', 'mt-24', 'mt-32', 'mt-40', 'mt-48', 'mt-64'];

// Editorial text blocks with random grid positions and spacing
const textBlocks = [
  {
    title: "The Creative Process",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    title: "Design Evolution",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Artistic Vision",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  }
];

// Editorial assets with random col-span and margin-top
const placeholderAssets = [
  { src: "/images/placeholder assets/images/DSC00566.jpg", title: "Urban Exploration", description: "Capturing the essence of city life through architectural photography", type: "image" },
  { src: "/images/placeholder assets/gifs/giphy.gif", title: "Dynamic Moments", description: "Exploring movement and motion in visual storytelling", type: "gif" },
  { src: "/images/placeholder assets/videos/220312_Florence 16mm_01.mov", title: "Florence Memories", description: "A cinematic journey through historic streets", type: "video" },
  { src: "/images/placeholder assets/images/Amex Lisbon-03.jpg", title: "Lisbon Architecture", description: "Modern design meets historic charm", type: "image" },
  { src: "/images/placeholder assets/gifs/giphy-2.gif", title: "Creative Process", description: "Behind the scenes of artistic creation", type: "gif" },
  { src: "/images/placeholder assets/images/DSC00258.jpg", title: "Natural Landscapes", description: "Exploring the beauty of untouched wilderness", type: "image" },
  { src: "/images/placeholder assets/videos/220312_Florence 16mm_02.mov", title: "Cultural Heritage", description: "Preserving moments of cultural significance", type: "video" },
  { src: "/images/placeholder assets/gifs/giphy-3.gif", title: "Visual Experiments", description: "Pushing the boundaries of digital art", type: "gif" },
  { src: "/images/placeholder assets/images/Casa Almargens-4.jpg", title: "Architectural Details", description: "Celebrating the intricacies of design", type: "image" },
  { src: "/images/placeholder assets/gifs/giphy-4.gif", title: "Motion Studies", description: "Exploring the relationship between time and space", type: "gif" }
];

// MediaElement component
const MediaElement = ({ src, alt, className, type, onLoad, onError }: { src: string; alt: string; className?: string; type: string; onLoad?: () => void; onError?: () => void; }) => {
  if (type === 'video') {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        onLoadedData={onLoad}
        onError={onError}
      />
    );
  }
  if (type === 'gif') {
    return (
      <Image
        src={src}
        alt={alt}
        fill={false}
        width={0}
        height={0}
        sizes="100vw"
        className={className + ' w-full h-auto object-contain'}
        unoptimized
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={false}
      width={0}
      height={0}
      sizes="100vw"
      className={className + ' w-full h-auto object-contain'}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default function ArchivePage() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [gridItems, setGridItems] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
    // Interleave and shuffle assets and text blocks
    let items: any[] = [];
    let assetIdx = 0, textIdx = 0;
    while (assetIdx < placeholderAssets.length || textIdx < textBlocks.length) {
      if (assetIdx < placeholderAssets.length) {
        items.push({ ...placeholderAssets[assetIdx], isText: false, key: `asset-${assetIdx}` });
        assetIdx++;
      }
      if (textIdx < textBlocks.length) {
        items.push({ ...textBlocks[textIdx], isText: true, key: `text-${textIdx}` });
        textIdx++;
      }
    }
    // Shuffle for randomness
    items = shuffleArray(items);
    // Assign random col-span and mt
    items = items.map(item => ({
      ...item,
      colSpan: colSpanOptions[Math.floor(Math.random() * colSpanOptions.length)],
      mt: mtOptions[Math.floor(Math.random() * mtOptions.length)]
    }));
    setGridItems(items);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <LogoLayer />
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className={`transition-all duration-[735ms] ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Page Title */}
          <div className="mb-16 mt-12">
            <h1 className="text-4xl font-degular font-light">Archive</h1>
            <p className="font-['Times_New_Roman'] italic text-lg mt-2">Information 2024</p>
          </div>
          {/* Editorial Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-24">
            {gridItems.map((item, idx) =>
              item.isText ? (
                <div
                  key={item.key}
                  className={`${item.colSpan} ${item.mt} bg-gray-50 p-6 flex flex-col justify-center max-w-[340px] w-full mx-auto`}
                >
                  <h2 className="text-lg font-degular font-light mb-4">{item.title}</h2>
                  <p className="text-gray-600 font-['Times_New_Roman'] italic text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ) : (
                <motion.div
                  key={item.key}
                  className={`${item.colSpan} ${item.mt} flex flex-col items-center max-w-[320px] w-full mx-auto`}
                  whileHover={{ scale: 1.04, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative w-full mb-4 overflow-hidden">
                    <MediaElement
                      src={item.src}
                      alt={item.title}
                      type={item.type}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <h2 className="text-base font-degular font-light mb-2 text-center">{item.title}</h2>
                  <p className="text-gray-600 font-['Times_New_Roman'] italic text-xs text-center">
                    {item.description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 