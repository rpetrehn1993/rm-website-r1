interface ProjectAsset {
  path: string;
  alt: string;
  type: 'image' | 'video' | 'gif';
  format?: 'jpg' | 'png' | 'webp' | 'mp4' | 'webm' | 'gif';
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ContentBlock {
  type: 'text' | 'image' | 'video' | 'quote' | 'gallery';
  content: string;
  title?: string;
  subtitle?: string;
  layout?: 'full' | 'split' | 'grid' | 'overlay';
  assets?: ProjectAsset[];
  textAlignment?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

interface ProjectMetadata {
  title: string;
  description: string;
  year: string;
  category: string;
  layout: {
    hero: {
      type: 'full' | 'split' | 'overlay';
      height: 'full' | 'half' | 'custom';
      customHeight?: number;
    };
    content: {
      blocks: ContentBlock[];
      maxWidth?: number;
      spacing?: number;
    };
  };
  assets: {
    hero: {
      main: ProjectAsset;
      hover?: {
        type: 'video' | 'gif';
        assets: ProjectAsset[];
      };
    };
    content: {
      images: ProjectAsset[];
      copy: string;
    };
  };
}

export const getProjectAsset = (projectId: string, assetPath: string): string => {
  return `/projects/${projectId}/${assetPath}`;
};

export const getProjectMetadata = async (projectId: string): Promise<ProjectMetadata> => {
  const response = await fetch(`/projects/${projectId}/metadata/project-info.json`);
  return response.json();
};

export const getProjectHero = (projectId: string) => {
  return {
    main: getProjectAsset(projectId, 'hero/main'),
    hover: getProjectAsset(projectId, 'hero/hover'),
  };
};

export const getProjectContent = (projectId: string) => {
  return {
    images: getProjectAsset(projectId, 'content/images'),
    copy: getProjectAsset(projectId, 'content/copy'),
  };
};

// Example usage:
// const heroImage = getProjectHero('documentary').main;
// const hoverVideo = getProjectHero('documentary').hover + '/video.mp4';
// const hoverGif = getProjectHero('documentary').hover + '/animation.gif';
// const projectInfo = await getProjectMetadata('documentary'); 