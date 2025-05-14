import { useEffect, useState } from 'react';

interface AssetError {
  src: string;
  type: 'image' | 'video' | 'gif';
  timestamp: number;
}

const assetErrors: AssetError[] = [];

export function useAssetError(src: string, type: 'image' | 'video' | 'gif') {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
      assetErrors.push({
        src,
        type,
        timestamp: Date.now(),
      });
      console.error(`Failed to load ${type}: ${src}`);
    };

    return () => {
      setHasError(false);
    };
  }, [src, type]);

  return hasError;
}

export function getFallbackAsset(type: 'image' | 'video' | 'gif'): string {
  switch (type) {
    case 'image':
      return '/images/shared/fallback-image.jpg';
    case 'video':
      return '/videos/fallback-video.mp4';
    case 'gif':
      return '/gifs/fallback.gif';
    default:
      return '/images/shared/fallback-image.jpg';
  }
}

export function logAssetErrors() {
  if (assetErrors.length > 0) {
    console.group('Asset Loading Errors');
    assetErrors.forEach((error) => {
      console.error(`${error.type.toUpperCase()} Error: ${error.src}`);
    });
    console.groupEnd();
  }
}

// Asset verification function
export async function verifyAsset(src: string): Promise<boolean> {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Failed to verify asset: ${src}`, error);
    return false;
  }
} 