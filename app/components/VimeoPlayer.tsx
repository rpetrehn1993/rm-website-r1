'use client';

import { useEffect, useRef, useState } from 'react';

interface VimeoPlayerProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export default function VimeoPlayer({
  videoId,
  className = '',
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
}: VimeoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className={`relative w-full aspect-video ${className}`}>
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-red-500">Error loading video: {error}</p>
        </div>
      ) : (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?h=123456789&autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&background=0&quality=1080p&dnt=1&transparent=0&title=1&byline=0&portrait=0`}
          className="absolute top-0 left-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => setError('Failed to load video')}
        />
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
} 