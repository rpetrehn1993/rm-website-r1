'use client';

import Image from 'next/image';
import { useState } from 'react';
import { analytics } from '@/lib/analytics';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    analytics.trackEvent({
      name: 'error',
      properties: {
        type: 'image_load',
        src,
      },
    });
  };

  if (hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
        priority={priority}
      />
    </div>
  );
} 