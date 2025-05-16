export interface HeroGridProject {
  id: string;          // matches the folder name in public/projects/
  title: string;       // display title (can be different from folder name)
  order: number;       // position in the grid
  isActive: boolean;   // whether to show in the grid
}

export const heroGridProjects: HeroGridProject[] = [
  {
    id: 'art-collection',
    title: 'Art Collection',
    order: 1,
    isActive: true
  },
  {
    id: 'design-evolution',
    title: 'Design Evolution',
    order: 2,
    isActive: true
  },
  {
    id: 'film-series',
    title: 'Film Series',
    order: 3,
    isActive: true
  },
  {
    id: 'creative-process',
    title: 'Creative Process',
    order: 4,
    isActive: true
  },
  {
    id: 'food-culture',
    title: 'Food Culture',
    order: 5,
    isActive: true
  },
  {
    id: 'documentary',
    title: 'Documentary',
    order: 6,
    isActive: true
  }
];

// Helper function to get projects in the correct order
export const getOrderedProjects = () => {
  return [...heroGridProjects]
    .filter(project => project.isActive)
    .sort((a, b) => a.order - b.order);
};

// Helper function to update project order
export const updateProjectOrder = (projectId: string, newOrder: number) => {
  const project = heroGridProjects.find(p => p.id === projectId);
  if (project) {
    project.order = newOrder;
  }
};

// Helper function to toggle project visibility
export const toggleProjectVisibility = (projectId: string) => {
  const project = heroGridProjects.find(p => p.id === projectId);
  if (project) {
    project.isActive = !project.isActive;
  }
}; 