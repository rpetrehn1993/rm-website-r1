'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPageProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export default function LandingPage({ onVisibilityChange }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isGifLoaded, setIsGifLoaded] = useState(false);
  const [gifKey, setGifKey] = useState(0); // Add a key to force GIF reload

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    if (onVisibilityChange) {
      onVisibilityChange(false);
    }
  }, [onVisibilityChange]);

  useEffect(() => {
    // Set a timeout to match the gif duration
    const timer = setTimeout(handleDismiss, 4000);

    // Add scroll handler to dismiss on scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        handleDismiss();
      }
    };

    // Add both scroll and wheel events to ensure we catch all scroll interactions
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        handleDismiss();
      }
    });

    // Add a fallback timer in case the GIF fails to load
    const fallbackTimer = setTimeout(() => {
      if (!isGifLoaded) {
        handleDismiss();
      }
    }, 5000);

    // Force reload the GIF if it gets stuck
    const gifReloadTimer = setTimeout(() => {
      setGifKey(prev => prev + 1);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      clearTimeout(gifReloadTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [handleDismiss, isGifLoaded]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          onClick={handleDismiss}
        >
          <div 
            key={gifKey}
            className="relative w-[319px] h-[257px]"
            style={{
              backgroundImage: 'url(/images/loading.gif)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            }}
            onLoad={() => setIsGifLoaded(true)}
            onError={() => {
              console.error('Failed to load loading.gif');
              handleDismiss();
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 