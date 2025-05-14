'use client';

import { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export function LegalCompliance() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowConsent(false);
    analytics.trackEvent({
      name: 'button_click',
      properties: {
        button: 'accept-cookies',
      },
    });
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          This website uses cookies to enhance your experience. By continuing to use this site, you agree to our{' '}
          <a href="/privacy-policy" className="underline hover:text-gray-300">
            Privacy Policy
          </a>
          .
        </p>
        <button
          onClick={acceptCookies}
          className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
} 