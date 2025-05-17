'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import * as Sentry from '@sentry/nextjs';
import VimeoPlayer from './VimeoPlayer';
import { motion, AnimatePresence } from 'framer-motion';

// Connect and About panels with animation
const ConnectPanel = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: 'linear' }}
    className="fixed inset-0 flex flex-col items-center justify-center px-4 bg-[#A09583] z-[100]"
  >
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
      className="absolute top-[91px] right-[19px] z-[100] text-white font-['Times_New_Roman'] italic text-[0.64rem] underline hover:opacity-80 transition-all duration-300"
      onClick={onClose}
    >
      BACK →
    </motion.button>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.56, delay: 0.25, ease: 'easeInOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.36, delay: 0.1, ease: 'easeInOut' } }}
    >
      <div className="w-full max-w-xl flex flex-col items-center">
        <h2 className="text-white font-degular text-3xl mb-6 text-center">Connect</h2>
        <div className="text-white font-['Times_New_Roman'] italic text-lg text-center space-y-4">
          <div>
            <span className="block text-[#AAAAAA] text-sm">Email</span>
            <a href="mailto:hello@reaganmatthew.com" className="underline">hello@reaganmatthew.com</a>
          </div>
          <div>
            <span className="block text-[#AAAAAA] text-sm">Location</span>
            <span>New York City</span>
          </div>
          <div>
            <span className="block text-[#AAAAAA] text-sm">Instagram</span>
            <a href="https://instagram.com/reaganmatthew" target="_blank" rel="noopener noreferrer" className="underline">@reaganmatthew</a>
          </div>
          <div>
            <span className="block text-[#AAAAAA] text-sm">LinkedIn</span>
            <a href="https://linkedin.com/in/reaganmatthew" target="_blank" rel="noopener noreferrer" className="underline">reaganmatthew</a>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const AboutPanel = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: 'linear' }}
    className="fixed inset-0 flex flex-col items-center justify-center px-4 bg-[#A09583] z-[100]"
  >
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
      className="absolute top-[91px] right-[19px] z-[100] text-white font-['Times_New_Roman'] italic text-[0.64rem] underline hover:opacity-80 transition-all duration-300"
      onClick={onClose}
    >
      BACK →
    </motion.button>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.56, delay: 0.25, ease: 'easeInOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.36, delay: 0.1, ease: 'easeInOut' } }}
    >
      <div className="w-full max-w-xl flex flex-col items-center">
        <h2 className="text-white font-degular text-3xl mb-6 text-center">About</h2>
        <div className="text-white font-['Times_New_Roman'] italic text-lg text-center space-y-4">
          <div>
            <span className="block text-[#AAAAAA] text-sm">About</span>
            <span>This is placeholder about information. Replace with your own about details as needed.</span>
          </div>
          <div>
            <span className="block text-[#AAAAAA] text-sm">Location</span>
            <span>New York City</span>
          </div>
          <div>
            <span className="block text-[#AAAAAA] text-sm">Instagram</span>
            <a href="https://instagram.com/reaganmatthew" target="_blank" rel="noopener noreferrer" className="underline">@reaganmatthew</a>
          </div>
          <div>
            <span className="block text-[#AAAAAA] text-sm">LinkedIn</span>
            <a href="https://linkedin.com/in/reaganmatthew" target="_blank" rel="noopener noreferrer" className="underline">reaganmatthew</a>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const DirectorsReelPanel = ({ onClose }: { onClose: () => void }) => (
  <>
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
      className="absolute top-[91px] right-[19px] z-[100] text-white font-['Times_New_Roman'] italic text-[0.64rem] underline hover:opacity-80 transition-all duration-300"
      onClick={onClose}
    >
      BACK →
    </motion.button>
    {/* Frame with exact 15px margins and stronger blur */}
    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
      <div 
        className="w-[calc(100vw-30px)] h-[calc(100vh-30px)] m-[15px] overflow-hidden border border-white/30" 
        style={{
          filter: 'blur(30px)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}
      ></div>
    </div>
    {/* Video container with exact 15px margins */}
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <video
        src="/videos/fallback-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-[calc(100vw-30px)] h-[calc(100vh-30px)] object-cover m-[15px] bg-black"
        style={{borderRadius: 0, transform: 'scale(1.01)'}}
      />
    </div>
  </>
);

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectPage, setIsConnectPage] = useState(false);
  const [isReelPage, setIsReelPage] = useState(false);
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [logoScale, setLogoScale] = useState(3.125);
  const [wordmarkY, setWordmarkY] = useState(50);
  const menuRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 0);
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const heroImageThreshold = 400 / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Scale from 3.125 to 1 based on scroll progress
        const scale = Math.max(1, 3.125 - (scrollPercentage / (heroImageThreshold * 0.6)) * 2.125);
        setLogoScale(scale);

        // Get the hero grid content
        const heroGrid = document.querySelector('.grid');
        if (!heroGrid || !wordmarkRef.current) {
          Sentry.captureMessage('Missing navigation elements', {
            level: 'warning',
            extra: {
              hasHeroGrid: !!heroGrid,
              hasWordmark: !!wordmarkRef.current
            }
          });
          return;
        }

        // Get the positions
        const gridRect = heroGrid.getBoundingClientRect();
        const wordmarkRect = wordmarkRef.current.getBoundingClientRect();
        
        // Calculate the distance from the top of the viewport to the wordmark
        const wordmarkTop = wordmarkRect.top;
        
        // Calculate how far the grid has moved past the wordmark
        const gridProgress = Math.max(0, wordmarkTop - gridRect.top);
        
        // Map the progress to the wordmark movement range (0 to 50px)
        // and slow it down to 75% of the grid's speed
        const maxDistance = 50;
        const rawOffset = Math.min(gridProgress * 0.75, maxDistance);
        
        // Apply easing function for smoother movement
        const easeOutExpo = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        const progress = rawOffset / maxDistance;
        const easedProgress = easeOutExpo(progress);
        const yOffset = easedProgress * maxDistance;
        
        // Apply the movement
        setWordmarkY(50 - yOffset);
      } catch (error) {
        Sentry.captureException(error, {
          tags: {
            component: 'Navigation',
            action: 'handleScroll'
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add keyboard event listener for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsExpanded(false);
        window.dispatchEvent(new CustomEvent('menuStateChange', { 
          detail: { 
            isMenuOpen: false,
            isExpanded: false
          }
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Update menu state based on current path
    // Dispatch menu state change event
    const event = new CustomEvent('menuStateChange', {
      detail: {
        isMenuOpen,
        isExpanded,
      }
    });
    window.dispatchEvent(event);
  }, [isMenuOpen, isExpanded, pathname]);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isReelPage) {
      setIsReelPage(false);
      setIsMenuOpen(true);
      setIsExpanded(false);
      window.dispatchEvent(new CustomEvent('menuStateChange', { 
        detail: { 
          isMenuOpen: true,
          isExpanded: false
        }
      }));
    } else {
      const newMenuState = !isMenuOpen;
      setIsMenuOpen(newMenuState);
      setIsConnectPage(false);
      setIsReelPage(false);
      setIsAboutPage(false);
      setIsExpanded(false);
      window.dispatchEvent(new CustomEvent('menuStateChange', { 
        detail: { 
          isMenuOpen: newMenuState,
          isExpanded: false
        }
      }));
    }
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (path === '/reel') {
      setIsReelPage(true);
      setIsMenuOpen(true);
      setIsExpanded(true);
      window.dispatchEvent(new CustomEvent('menuStateChange', { 
        detail: { 
          isMenuOpen: true,
          isExpanded: true
        }
      }));
    } else {
      setIsConnectPage(false);
      setIsReelPage(false);
      setIsAboutPage(false);
      setIsMenuOpen(false);
      setIsExpanded(false);
      window.location.href = path;
    }
  };

  const handleExit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConnectPage(false);
    setIsReelPage(false);
    setIsAboutPage(false);
    setIsMenuOpen(true);
    setIsExpanded(false);
    window.dispatchEvent(new CustomEvent('menuStateChange', { 
      detail: { 
        isMenuOpen: true,
        isExpanded: false
      }
    }));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsConnectPage(false);
        setIsReelPage(false);
        setIsAboutPage(false);
        setIsExpanded(false);
        window.dispatchEvent(new CustomEvent('menuStateChange', { 
          detail: { 
            isMenuOpen: false,
            isExpanded: false
          }
        }));
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsExpanded(!isExpanded);
  };

  const handleReelPanelClose = () => handleExit({ preventDefault: () => {} } as React.MouseEvent);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${isHomePage ? 'bg-[#F0F0EE]' : 'bg-white'}`}>
      <div className="max-w-[1440px] mx-auto px-4 py-2">
        <div className="w-full flex items-end justify-between relative">
          {/* Logo */}
          <Link href="/" className="relative">
            {/* Original logo */}
            <div className={`w-[117px] h-[95px] p-4 -m-4 transition-colors duration-200 ${!isHomePage ? 'hover:opacity-80' : 'opacity-0'}`}>
              <Image
                src="/images/logo.svg"
                alt="RM Logo"
                width={117}
                height={95}
                priority
                className={`transition-all duration-200 ${!isHomePage ? 'hover:opacity-80' : ''}`}
              />
            </div>
            {/* Animated logo container */}
            <div 
              className={`absolute top-0 left-0 ${isHomePage ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: `scale(${logoScale})`,
                transformOrigin: '0 0',
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div className="w-[117px] h-[95px] p-4 -m-4">
                <Image
                  src="/images/logo.svg"
                  alt="RM Logo"
                  width={117}
                  height={95}
                  priority
                  className="transition-all duration-200"
                />
              </div>
            </div>
          </Link>

          {/* Wordmark - Desktop */}
          <div 
            ref={wordmarkRef}
            className={`absolute left-[98px] bottom-[2px] hidden md:block`}
            style={{ 
              transform: `translateY(${wordmarkY}px)`,
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              clipPath: wordmarkY > 0 ? `inset(0 0 ${wordmarkY}px 0)` : 'none'
            }}
          >
            <Image
              src="/images/wordmark-horizontal.svg"
              alt="Reagan Matthew"
              width={140}
              height={14}
              priority
            />
          </div>

          {/* Wordmark - Mobile */}
          <div 
            className={`absolute left-[76px] bottom-[5px] md:hidden`}
            style={{ 
              transform: `translateY(${wordmarkY}px)`,
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              clipPath: wordmarkY > 0 ? `inset(0 0 ${wordmarkY}px 0)` : 'none'
            }}
          >
            <Image
              src="/images/tiny-wordmark.svg"
              alt="Reagan Matthew"
              width={77}
              height={15}
              priority
              className="w-[77px] h-[15px]"
            />
          </div>

          {/* Menu Button */}
          <button 
            type="button"
            className="p-4 relative z-[1000] cursor-pointer flex items-center justify-center"
            aria-label="Toggle menu"
            onMouseDown={handleMenuClick}
            style={{ 
              transform: 'translateX(16px)',
              transition: 'none',
              minWidth: '32px',
              minHeight: '32px',
              position: 'relative',
              top: 0,
              right: 0
            }}
          >
            <Image
              src="/images/flower-small.svg"
              alt="Menu"
              width={32}
              height={32}
              className={`transition-all duration-500 ${isMenuOpen ? 'brightness-0 invert' : ''}`}
              style={{ 
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `rotate(${isMenuOpen ? '90deg' : '0deg'})`,
                width: '32px',
                height: '32px'
              }}
            />
          </button>
        </div>
      </div>

      {/* Sliding Menu - Now used for both mobile and desktop */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-full transform transition-all duration-500 ease-linear z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isConnectPage || isReelPage || isAboutPage ? 'w-full' : 'w-[121.5px]'} ${
          isReelPage || isAboutPage ? 'bg-[#1A1A1A]' : isConnectPage ? 'bg-[#A09583]' : 'bg-[#FA3820]'
        }`}
      >
        {/* Fixed elements that don't move */}
        <div className="absolute top-[79px] right-[14px] z-50">
        </div>
        <div className="absolute bottom-5 right-4 z-50">
          <div className="-mr-[10px]">
            <Image
              src="/images/tiny-lockup.svg"
              alt="RM Lockup"
              width={92}
              height={23}
              className="w-[92px] h-[23px]"
              priority
            />
          </div>
        </div>

        {/* Slide-out panels for Connect and About */}
        <AnimatePresence>
          {isConnectPage && <ConnectPanel onClose={() => { setIsConnectPage(false); setIsExpanded(false); }} />}
          {isAboutPage && <AboutPanel onClose={() => { setIsAboutPage(false); setIsExpanded(false); }} />}
          {isReelPage && <DirectorsReelPanel onClose={() => { setIsReelPage(false); setIsExpanded(false); }} />}
        </AnimatePresence>

        {/* Sliding content */}
        <div className={`flex flex-col justify-between h-full pr-4 transition-transform duration-500 ease-linear
          ${isConnectPage || isReelPage || isAboutPage ? '-translate-x-[486px]' : 'translate-x-0'}
        `}>
          {/* Navigation Links */}
          <div className={`flex flex-col space-y-8 pt-[90px] ${isConnectPage || isReelPage || isAboutPage ? 'items-end md:pr-4' : 'items-end'}`}>
            <div className={`flex flex-col space-y-8 transition-all duration-500 ${isConnectPage || isReelPage || isAboutPage ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
              >
                <Link
                  href="#"
                  className="text-white font-degular font-medium text-[9.5px] tracking-widest hover:opacity-80 transition-all duration-500 ease-in-out text-right"
                  onClick={e => {
                    e.preventDefault();
                    setIsAboutPage(true);
                    setIsConnectPage(false);
                    setIsReelPage(false);
                    setIsMenuOpen(true);
                    setIsExpanded(true);
                  }}
                >
                  ABOUT
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
              >
                <Link 
                  href="#" 
                  className="text-white font-degular font-medium text-[9.5px] tracking-widest hover:opacity-80 transition-all duration-500 ease-in-out text-right"
                  onClick={(e) => { e.preventDefault(); setIsConnectPage(true); setIsMenuOpen(true); setIsExpanded(true); }}
                >
                  CONNECT
                </Link>
              </motion.div>
              {!isConnectPage && !isAboutPage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
                >
                  <Link 
                    href="/reel" 
                    className={`font-degular font-medium text-[9.5px] tracking-widest transition-all duration-500 text-right min-w-[60px] ${
                      isReelPage ? 'text-[#AAAAAA] font-["Times_New_Roman"] italic font-bold absolute top-[33px] right-[14px]' : 'text-white hover:opacity-80'
                    }`}
                    onClick={(e) => isReelPage ? handleExit(e) : handleLinkClick(e, '/reel')}
                  >
                    <span className="block leading-[1.05]">DIRECTOR'S</span>
                    <span className="block leading-[1.05]">REEL</span>
                  </Link>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
              >
                <Link 
                  href="/archive" 
                  className="text-white font-degular font-medium text-[9.5px] tracking-widest hover:opacity-80 transition-all duration-500 ease-in-out text-right"
                  onClick={(e) => handleLinkClick(e, '/archive')}
                >
                  ARCHIVE
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 
