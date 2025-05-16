'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getOrderedProjects, HeroGridProject } from '@/app/config/heroGrid';
import { getProjectMetadata } from '@/app/utils/projectAssets';
import { OptimizedVideo } from '../OptimizedVideo';

interface HeroGridItemProps {
  project: HeroGridProject;
}

const HeroGridItem = ({ project }: HeroGridItemProps) => {
  const [hoverVideo, setHoverVideo] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Load project metadata to get hover video path
    const loadProjectData = async () => {
      try {
        const metadata = await getProjectMetadata(project.id);
        if (metadata.assets.hero.hover?.assets[0]) {
          setHoverVideo(metadata.assets.hero.hover.assets[0].path);
        }
      } catch (error) {
        console.error(`Error loading project data for ${project.id}:`, error);
      }
    };

    loadProjectData();
  }, [project.id]);

  const handleVideoError = () => {
    console.error(`Error loading video for ${project.id}`);
    setVideoError(true);
  };

  return (
    <Link 
      href={`/projects/${project.id}`}
      className="relative block w-full h-full overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Image */}
      <Image
        src={`/projects/${project.id}/hero/main/main.jpg`}
        alt={project.title}
        fill
        className="object-cover transition-opacity duration-300"
        style={{ opacity: isHovering && !videoError ? 0 : 1 }}
      />

      {/* Hover Video */}
      {hoverVideo && isHovering && !videoError && (
        <OptimizedVideo
          src={`/projects/${project.id}/${hoverVideo}`}
          autoPlay
          loop
          muted
          controls={false}
          className="absolute inset-0 w-full h-full object-cover"
          onError={handleVideoError}
        />
      )}

      {/* Project Title */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
        <h2 className="text-white text-2xl font-medium">{project.title}</h2>
      </div>
    </Link>
  );
};

export const HeroGrid = () => {
  const [projects, setProjects] = useState<HeroGridProject[]>([]);

  useEffect(() => {
    setProjects(getOrderedProjects());
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <HeroGridItem key={project.id} project={project} />
      ))}
    </div>
  );
}; 