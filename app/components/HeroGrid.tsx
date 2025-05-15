'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// Base configuration for projects
const projects = [
  {
    title: 'Food & Culture',
    path: '/projects/food-culture',
    projectId: 'food-culture'
  },
  {
    title: 'Documentary',
    path: '/projects/documentary',
    projectId: 'documentary'
  },
  {
    title: 'Art Collection',
    path: '/projects/art-collection',
    projectId: 'art-collection'
  },
  {
    title: 'Design Evolution',
    path: '/projects/design-evolution',
    projectId: 'design-evolution'
  },
  {
    title: 'Film Series',
    path: '/projects/film-series',
    projectId: 'film-series'
  },
  {
    title: 'Creative Process',
    path: '/projects/creative-process',
    projectId: 'creative-process'
  }
];

// Helper function to determine media type from file extension
const getMediaType = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (['mp4', 'mov', 'webm'].includes(ext || '')) return 'video';
  if (['gif'].includes(ext || '')) return 'gif';
  if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(ext || '')) return 'image';
  return null;
};

// Component to render the appropriate media type
const MediaElement = ({ 
  src, 
  alt, 
  className,
  onLoad,
  onError
}: { 
  src: string; 
  alt: string; 
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}) => {
  const mediaType = getMediaType(src);

  if (mediaType === 'video') {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        onLoadedData={onLoad}
        onError={onError}
      />
    );
  }

  // Handle both images and SVGs
  if (mediaType === 'image' || mediaType === 'gif') {
    return (
      <Image
        src={src}
        alt={alt}
        width={2000}
        height={1500}
        className={className}
        unoptimized={src.endsWith('.svg')} // Don't optimize SVGs
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  // Default to image
  return (
    <Image
      src={src}
      alt={alt}
      width={2000}
      height={1500}
      className={className}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

// Fallback image component
const FallbackImage = ({ className }: { className?: string }) => (
  <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
    <div className="text-gray-400 text-sm">Image not available</div>
  </div>
);

export default function HeroGrid() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConnectPage, setIsConnectPage] = useState(false);
  const [isReelPage, setIsReelPage] = useState(false);
  const [isContactPage, setIsContactPage] = useState(false);
  const [logoScale, setLogoScale] = useState(3.125);
  const [wordmarkY, setWordmarkY] = useState(50);
  const menuRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [mainFiles, setMainFiles] = useState<Record<string, string>>({});
  const [hoverFiles, setHoverFiles] = useState<Record<string, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, { main: boolean; hover: boolean }>>({});
  const [errorStates, setErrorStates] = useState<Record<string, { main: boolean; hover: boolean }>>({});

  useEffect(() => {
    const handleMenuStateChange = (event: CustomEvent) => {
      setIsMenuOpen(event.detail.isMenuOpen);
      setIsExpanded(event.detail.isExpanded);
      setIsConnectPage(event.detail.isConnectPage);
      setIsReelPage(event.detail.isReelPage);
      setIsContactPage(event.detail.isContactPage);
    };

    window.addEventListener('menuStateChange', handleMenuStateChange as EventListener);
    return () => window.removeEventListener('menuStateChange', handleMenuStateChange as EventListener);
  }, []);

  // Initialize loading states for all projects
  useEffect(() => {
    const initialLoadingStates: Record<string, { main: boolean; hover: boolean }> = {};
    projects.forEach(project => {
      initialLoadingStates[project.projectId] = { main: true, hover: true };
    });
    setLoadingStates(initialLoadingStates);
  }, []);

  // Fetch the most recent file for each project's main and hover directories
  useEffect(() => {
    const fetchLatestFiles = async () => {
      const newMainFiles: Record<string, string> = {};
      const newHoverFiles: Record<string, string> = {};
      
      for (const project of projects) {
        try {
          // Fetch main file
          const mainResponse = await fetch(`/api/get-latest-file?directory=projects/${project.projectId}/hero/main`);
          const mainData = await mainResponse.json();
          if (mainData.file) {
            newMainFiles[project.projectId] = mainData.file;
          }

          // Fetch hover file
          const hoverResponse = await fetch(`/api/get-latest-file?directory=projects/${project.projectId}/hero/hover`);
          const hoverData = await hoverResponse.json();
          if (hoverData.file) {
            newHoverFiles[project.projectId] = hoverData.file;
          }
        } catch (error) {
          console.error(`Error fetching latest files for ${project.projectId}:`, error);
        }
      }
      
      setMainFiles(newMainFiles);
      setHoverFiles(newHoverFiles);
    };

    fetchLatestFiles();
  }, []);

  // Handle media load events
  const handleMainLoad = (projectId: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], main: false }
    }));
  };

  const handleHoverLoad = (projectId: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], hover: false }
    }));
  };

  // Handle media error events
  const handleMainError = (projectId: string) => {
    setErrorStates(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], main: true }
    }));
    setLoadingStates(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], main: false }
    }));
  };

  const handleHoverError = (projectId: string) => {
    setErrorStates(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], hover: true }
    }));
    setLoadingStates(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], hover: false }
    }));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4">
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? (isConnectPage || isReelPage || isContactPage ? '-translate-x-[729px]' : '-translate-x-[121.5px]') : 'translate-x-0'
        }`}
      >
        {projects.map((project) => (
          <Link 
            href={project.path} 
            key={project.projectId}
            className="group block"
          >
            <div className="relative overflow-hidden">
              {/* Loading state */}
              {loadingStates[project.projectId]?.main && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="animate-pulse text-gray-400">Loading...</div>
                </div>
              )}

              {/* Primary Media - dynamically handling any type of media file */}
              {mainFiles[project.projectId] && !errorStates[project.projectId]?.main ? (
                <MediaElement
                  src={`/projects/${project.projectId}/hero/main/${mainFiles[project.projectId]}`}
                  alt={project.title}
                  className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  onLoad={() => handleMainLoad(project.projectId)}
                  onError={() => handleMainError(project.projectId)}
                />
              ) : (
                <FallbackImage className="w-full h-[300px]" />
              )}
              
              {/* Secondary Media - dynamically handling any type of media file */}
              <div className={`absolute inset-0 transition-opacity duration-300 ${
                hoverFiles[project.projectId] && !errorStates[project.projectId]?.hover && !loadingStates[project.projectId]?.hover
                  ? 'opacity-0 group-hover:opacity-100'
                  : 'opacity-0'
              }`}>
                {loadingStates[project.projectId]?.hover && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">Loading...</div>
                  </div>
                )}
                
                {hoverFiles[project.projectId] && !errorStates[project.projectId]?.hover ? (
                  <MediaElement
                    src={`/projects/${project.projectId}/hero/hover/${hoverFiles[project.projectId]}`}
                    alt={`${project.title} hover state`}
                    className="w-full h-full object-cover"
                    onLoad={() => handleHoverLoad(project.projectId)}
                    onError={() => handleHoverError(project.projectId)}
                  />
                ) : null}
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="mt-1">
              <h3 className="text-base font-degular font-light leading-none">{project.title}</h3>
              <p className="text-xs text-gray-600 mt-0 font-['Times_New_Roman'] italic leading-none">
                {project.title}, {new Date().getFullYear()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}