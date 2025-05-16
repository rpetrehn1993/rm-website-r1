import ProjectGrid from '@/app/components/ProjectGrid';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

// Project configuration
const projects = {
  'food-culture': {
    title: 'Food & Culture'
  },
  'documentary': {
    title: 'Documentary'
  },
  'art-collection': {
    title: 'Art Collection'
  },
  'design-evolution': {
    title: 'Design Evolution'
  },
  'film-series': {
    title: 'Film Series'
  },
  'creative-process': {
    title: 'Creative Process'
  }
};

export async function generateStaticParams() {
  return Object.keys(projects).map((projectId) => ({
    projectId,
  }));
}

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const project = projects[params.projectId as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-[1440px] mx-auto px-4 py-12">
          <h1 className="text-4xl font-degular font-light mb-8">Project not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <ProjectGrid projectId={params.projectId} title={project.title} />
      <Footer />
    </div>
  );
} 