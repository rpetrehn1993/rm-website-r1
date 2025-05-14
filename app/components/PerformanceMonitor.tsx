'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Track page load performance
      const reportWebVitals = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        analytics.trackEvent({
          name: 'page_view',
          properties: {
            loadTime: navigation.loadEventEnd - navigation.startTime,
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
            domInteractive: navigation.domInteractive - navigation.startTime,
            domComplete: navigation.domComplete - navigation.startTime,
          },
        });
      };

      // Report after page load
      if (document.readyState === 'complete') {
        reportWebVitals();
      } else {
        window.addEventListener('load', reportWebVitals);
        return () => window.removeEventListener('load', reportWebVitals);
      }
    }
  }, []);

  return null;
} 