import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from '@/app/components/ProjectCard';
import { testAccessibility } from '@/app/test-utils';

const mockProject = {
  title: 'Test Project',
  description: 'This is a test project description',
  imageUrl: '/images/test-project.jpg',
  slug: 'test-project',
  category: 'Photography'
};

describe('ProjectCard', () => {
  it('should have no accessibility violations', async () => {
    await testAccessibility(<ProjectCard {...mockProject} />);
  });

  it('renders project information correctly', () => {
    render(<ProjectCard {...mockProject} />);
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByText(mockProject.category)).toBeInTheDocument();
  });

  it('renders image with correct attributes', () => {
    render(<ProjectCard {...mockProject} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('alt', mockProject.title);
  });

  it('links to the correct project page', () => {
    render(<ProjectCard {...mockProject} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/work/${mockProject.slug}`);
  });

  it('applies hover styles', () => {
    render(<ProjectCard {...mockProject} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('group');
    expect(article).toHaveClass('hover:shadow-xl');
  });

  it('applies dark mode styles', () => {
    render(<ProjectCard {...mockProject} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('dark:bg-gray-800');
    
    const title = screen.getByText(mockProject.title);
    expect(title).toHaveClass('dark:text-gray-100');
    
    const description = screen.getByText(mockProject.description);
    expect(description).toHaveClass('dark:text-gray-300');
  });

  it('applies motion animation props', () => {
    render(<ProjectCard {...mockProject} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('data-motion');
  });
}); 