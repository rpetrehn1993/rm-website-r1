'use client';

import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // Initialize analytics here
    const trackPageView = () => {
      // Add your analytics tracking code here
      console.log('Page view tracked');
    };

    trackPageView();
  }, []);

  return null;
} 