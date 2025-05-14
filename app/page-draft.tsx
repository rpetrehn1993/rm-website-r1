'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroGrid from './components/HeroGrid'
import Navigation from './components/Navigation'
import LandingPage from './components/LandingPage'

// SVG Configuration - Using custom SVGs
const rotatingSVGs = [
  {
    path: '/svg/carousel/B01.svg',
    width: 200,
    height: 50,
    alt: 'Dreamer'
  },
  {
    path: '/svg/carousel/B02.svg',
    width: 200,
    height: 50,
    alt: 'Photographer'
  },
  {
    path: '/svg/carousel/B03.svg',
    width: 200,
    height: 50,
    alt: 'Filmmaker'
  },
  {
    path: '/svg/carousel/B04.svg',
    width: 200,
    height: 50,
    alt: 'Storyteller'
  },
  {
    path: '/svg/carousel/B05.svg',
    width: 200,
    height: 50,
    alt: 'Artist'
  },
  {
    path: '/svg/carousel/B06.svg',
    width: 200,
    height: 50,
    alt: 'Creator'
  },
  {
    path: '/svg/carousel/B07.svg',
    width: 200,
    height: 50,
    alt: 'Designer'
  },
  {
    path: '/svg/carousel/B08.svg',
    width: 200,
    height: 50,
    alt: 'Visionary'
  }
];

export default function Home() {
  const [isLandingVisible, setIsLandingVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollPosition, setMaxScrollPosition] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [introOpacity, setIntroOpacity] = useState(1);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [logoScale, setLogoScale] = useState(3.125);
  const [introY, setIntroY] = useState(190);

  const calculateOpacity = useCallback((position: number, maxPosition: number, isDown: boolean) => {
    const fadeStart = 0.8;
    const fadeEnd = 0.95;
    
    const relevantPercentage = isDown 
      ? maxPosition / (document.documentElement.scrollHeight - window.innerHeight)
      : position / (document.documentElement.scrollHeight - window.innerHeight);
    
    if (relevantPercentage < fadeStart) return 1;
    if (relevantPercentage > fadeEnd) return 0;
    
    return 1 - ((relevantPercentage - fadeStart) / (fadeEnd - fadeStart));
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const position = window.scrollY;
      const now = Date.now();
      
      // Debounce scroll events
      if (now - lastScrollTime < 16) { // ~60fps
        return;
      }
      setLastScrollTime(now);
      
      setScrollPosition(position);
      
      // Determine scroll direction with threshold to prevent jitter
      const scrollDelta = position - lastScrollY;
      if (Math.abs(scrollDelta) > 5) { // Only change direction if moved more than 5px
        setIsScrollingDown(scrollDelta > 0);
      }
      lastScrollY = position;
      
      // Update max scroll position only when scrolling down
      if (position > maxScrollPosition) {
        setMaxScrollPosition(position);
      }
      
      // Calculate word rotation based on scroll position
      const scrollPercentage = position / (document.documentElement.scrollHeight - window.innerHeight);
      const introThreshold = 400 / (document.documentElement.scrollHeight - window.innerHeight);
      
      // Scale the scroll percentage to complete rotation 20% higher up and slow down by 20%
      // Additional 10% slowdown and first tile hold, plus 20% slower carousel
      const scaledPercentage = Math.min(scrollPercentage / (introThreshold * 0.6 * 1.2 * 1.1 * 1.2), 1);
      
      // Calculate new index with first tile hold and slower middle tiles
      let newIndex;
      if (scaledPercentage < 0.35) { // Keep first tile hold at 35%
        newIndex = 0;
      } else {
        // Adjust the remaining percentage to account for the hold
        const adjustedPercentage = (scaledPercentage - 0.35) / 0.65; // Normalize remaining 65%
        
        // Apply even timing for all other tiles
        newIndex = Math.floor(adjustedPercentage * (rotatingSVGs.length - 1));
        // Ensure we don't exceed the last index
        newIndex = Math.min(newIndex, rotatingSVGs.length - 1);
      }
      
      // Calculate logo scale
      const scale = Math.max(1, 3.125 - (scrollPercentage / (introThreshold * 0.6)) * 2.125);
      setLogoScale(scale);

      // Calculate intro section Y position
      const startY = 195;
      const endY = 67;
      // Blend between scroll-based and scale-based movement
      const scaleProgress = (3.125 - scale) / 2.125; // Convert scale to 0-1 range
      const scrollProgress = scaledPercentage / 1.2; // Original scroll-based progress
      const blendedProgress = (scaleProgress + scrollProgress) / 2; // Average of both approaches
      const yPosition = startY - (blendedProgress * (startY - endY));
      setIntroY(yPosition);

      // Calculate fade out opacity based on scroll position
      const fadeStart = introThreshold * 0.98; // Delayed fade start (was 0.95)
      const fadeEnd = introThreshold * 1.1; // Keep same end point
      const fadeProgress = Math.max(0, Math.min(1, (scrollPercentage - fadeStart) / (fadeEnd - fadeStart)));
      const newTextOpacity = 1 - fadeProgress;
      
      setTextOpacity(newTextOpacity);
      
      // If we're past the intro threshold, force it to the last SVG
      if (scrollPercentage > introThreshold * 0.98) { // Increased from 0.95 to allow more movement
        setCurrentWordIndex(rotatingSVGs.length - 1);
      } else if (newIndex !== currentWordIndex) {
        setCurrentWordIndex(newIndex);
      }

      // Calculate opacity with debouncing
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const newOpacity = calculateOpacity(position, maxScrollPosition, isScrollingDown);
        setIntroOpacity(newOpacity);
      }, 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentWordIndex, maxScrollPosition, isScrollingDown, calculateOpacity, lastScrollTime]);

  // Get current SVG data safely
  const currentSVG = rotatingSVGs[currentWordIndex] || rotatingSVGs[0];

  return (
    <main className="min-h-screen bg-white">
      <LandingPage onVisibilityChange={setIsLandingVisible} />
      
      {!isLandingVisible && (
        <>
          <Navigation />

          {/* Intro Section */}
          <section 
            className="fixed top-0 left-0 w-full z-20 transition-all duration-300 ease-out"
            style={{ 
              opacity: introOpacity,
              transform: `translateY(${introY}px)`
            }}
          >
            <div className="max-w-[1440px] mx-auto px-4 md:px-4">
              <div className="max-w-[800px]">
                <h1 className="text-xl md:text-2xl font-degular font-light whitespace-nowrap flex items-center">
                  <span 
                    className="leading-none transition-opacity duration-300 ease-out"
                    style={{ 
                      opacity: textOpacity,
                      transform: `translateY(5px)`
                    }}
                  >
                    Reagan Matthew is a
                  </span>
                  <span 
                    className="font-degular font-medium text-[#1E1E1E] inline-block ml-2 transition-opacity duration-300 ease-out"
                    style={{ 
                      opacity: textOpacity,
                      transform: currentWordIndex === 0 ? 'none' : 'translateY(5px)'
                    }}
                  >
                    <Image
                      src={currentSVG.path}
                      alt={currentSVG.alt}
                      width={currentSVG.width}
                      height={currentSVG.height}
                      className="inline-block h-[1.25em] w-auto"
                      priority
                    />
                  </span>
                </h1>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="relative pt-[450px] z-10">
            {/* Hero Grid */}
            <div className="mt-16">
              <HeroGrid />
            </div>
          </div>

          {/* Footer */}
          <footer className="relative w-full px-4 py-8 z-20 bg-white">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center justify-between">
                <Link href="/" className="transition-colors duration-200 hover:opacity-80">
                  <Image
                    src="/images/lockup-mini.svg"
                    alt="RM Lockup"
                    width={40}
                    height={13}
                    className="opacity-90 hover:brightness-0 hover:saturate-100 hover:[filter:brightness(0)_saturate(100%)_invert(19%)_sepia(98%)_saturate(1864%)_hue-rotate(353deg)_brightness(98%)_contrast(98%)] transition-all duration-200"
                  />
                </Link>
                
                <div className="flex items-center space-x-8">
                  <div className="text-center absolute left-1/2 transform -translate-x-1/2 w-[300px]">
                    <a href="mailto:hello@reaganmatthew.com" className="text-xs text-gray-600 font-degular hover:text-[#FA3820] transition-colors duration-200 block leading-none">hello@reaganmatthew.com</a>
                    <p className="text-[10px] text-gray-500 font-degular leading-none mt-0.5">© 2024 Reagan Matthew. All rights reserved.</p>
                    <p className="text-[7px] text-gray-500 font-degular mt-1 whitespace-nowrap">All content and materials on this website are protected by copyright and other intellectual property rights.</p>
                  </div>
                  <p className="text-xs text-gray-600 font-degular">BASED IN NYC</p>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  );
} 