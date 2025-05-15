'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

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

interface ProjectGridProps {
  projectId: string;
  title: string;
}

// Project descriptions
const projectDescriptions: Record<string, { title: string; description: string }> = {
  'food-culture': {
    title: 'Food & Culture',
    description: 'A visual exploration of how food shapes our cultural identity and brings communities together.'
  },
  'documentary': {
    title: 'Documentary',
    description: 'Capturing authentic stories and moments that reveal the human experience in its rawest form.'
  },
  'art-collection': {
    title: 'Art Collection',
    description: 'A curated selection of contemporary artworks that challenge perceptions and inspire dialogue.'
  },
  'design-evolution': {
    title: 'Design Evolution',
    description: 'Tracing the journey of design through time, exploring how aesthetics and functionality evolve together.'
  },
  'film-series': {
    title: 'Film Series',
    description: 'A cinematic journey through visual storytelling, exploring themes of identity, memory, and human connection.'
  },
  'creative-process': {
    title: 'Creative Process',
    description: 'An intimate look into the creative journey, from initial concept to final execution.'
  }
};

// Text blocks to insert between media
const textBlocks = [
  {
    title: "The Creative Journey",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    title: "Process & Methodology",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  }
];

export default function ProjectGrid({ projectId, title }: ProjectGridProps) {
  const [files, setFiles] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({});
  const projectInfo = projectDescriptions[projectId] || { title, description: '' };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`/api/get-project-files?directory=projects/${projectId}/content`);
        const data = await response.json();
        if (data.files) {
          setFiles(data.files);
          // Initialize loading states
          const initialLoadingStates: Record<string, boolean> = {};
          data.files.forEach((file: string) => {
            initialLoadingStates[file] = true;
          });
          setLoadingStates(initialLoadingStates);
        }
      } catch (error) {
        console.error('Error fetching project files:', error);
      }
    };

    fetchFiles();
  }, [projectId]);

  const handleLoad = (filename: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [filename]: false
    }));
  };

  const handleError = (filename: string) => {
    setErrorStates(prev => ({
      ...prev,
      [filename]: true
    }));
    setLoadingStates(prev => ({
      ...prev,
      [filename]: false
    }));
  };

  // Calculate where to insert text blocks
  const insertTextBlocks = () => {
    const items = [...files];
    const blockSize = Math.ceil(items.length / (textBlocks.length + 1));
    
    textBlocks.forEach((block, index) => {
      const insertIndex = (index + 1) * blockSize;
      items.splice(insertIndex, 0, `text-block-${index}`);
    });
    
    return items;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        {/* Project Title and Description */}
        <div className="mb-12 mt-16">
          <h2 className="text-4xl font-degular font-light mb-4">{projectInfo.title}</h2>
          <p className="text-lg text-gray-600 font-['Times_New_Roman'] italic max-w-2xl">
            {projectInfo.description}
          </p>
        </div>

        {/* Project Grid with Text Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insertTextBlocks().map((item, index) => {
            if (item.startsWith('text-block-')) {
              const blockIndex = parseInt(item.split('-')[2]);
              const block = textBlocks[blockIndex];
              return (
                <div key={item} className="col-span-full max-w-3xl mx-auto my-12">
                  <h2 className="text-2xl font-degular font-light mb-4">{block.title}</h2>
                  <p className="text-gray-600 font-['Times_New_Roman'] italic leading-relaxed">
                    {block.content}
                  </p>
                </div>
              );
            }

            return (
              <div key={item} className="relative">
                {/* Loading state */}
                {loadingStates[item] && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">Loading...</div>
                  </div>
                )}

                {/* Media element */}
                {!errorStates[item] ? (
                  <div className="relative w-full">
                    <MediaElement
                      src={`/projects/${projectId}/content/${item}`}
                      alt={`${title} - ${item}`}
                      className="w-full h-auto object-contain"
                      onLoad={() => handleLoad(item)}
                      onError={() => handleError(item)}
                    />
                  </div>
                ) : (
                  <FallbackImage className="w-full h-auto" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 