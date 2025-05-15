'use client';

import { useState, useRef, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  onError?: () => void;
}

export function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  onError,
}: OptimizedVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  const handleError = () => {
    setHasError(true);
    onError?.();
    analytics.trackEvent({
      name: 'error',
      properties: {
        type: 'video_load',
        src,
      },
    });
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
        handleError();
      });
    }
  };

  if (hasError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">Video not available</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        onError={handleError}
        onLoadedData={handleLoadedData}
        playsInline
        preload="auto"
      />
    </div>
  );
} 