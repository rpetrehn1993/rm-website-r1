import { render, screen, fireEvent } from '@testing-library/react';
import { OptimizedImage } from '../OptimizedImage';
import { analytics } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  analytics: {
    trackEvent: jest.fn(),
  },
}));

describe('OptimizedImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test Image',
    width: 100,
    height: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with loading state initially', () => {
    render(<OptimizedImage {...defaultProps} />);
    expect(screen.getByRole('img')).toHaveClass('opacity-0');
  });

  it('shows error state when image fails to load', () => {
    render(<OptimizedImage {...defaultProps} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    
    expect(screen.getByText('Image not available')).toBeInTheDocument();
    expect(analytics.trackEvent).toHaveBeenCalledWith({
      name: 'error',
      properties: {
        type: 'image_load',
        src: '/test-image.jpg',
      },
    });
  });

  it('removes loading state when image loads', () => {
    render(<OptimizedImage {...defaultProps} />);
    const img = screen.getByRole('img');
    fireEvent.load(img);
    
    expect(img).toHaveClass('opacity-100');
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    render(<OptimizedImage {...defaultProps} className={className} />);
    expect(screen.getByRole('img').parentElement).toHaveClass(className);
  });

  it('sets priority attribute when specified', () => {
    render(<OptimizedImage {...defaultProps} priority />);
    expect(screen.getByRole('img')).toHaveAttribute('priority', '');
  });
}); 