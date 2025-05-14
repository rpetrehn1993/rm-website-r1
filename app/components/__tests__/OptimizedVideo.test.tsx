import { render, screen, fireEvent } from '@testing-library/react';
import { OptimizedVideo } from '../OptimizedVideo';
import { analytics } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  analytics: {
    trackEvent: jest.fn(),
  },
}));

describe('OptimizedVideo', () => {
  const defaultProps = {
    src: '/test-video.mp4',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with loading state initially', () => {
    render(<OptimizedVideo {...defaultProps} />);
    const video = screen.getByRole('video');
    expect(video).toHaveClass('opacity-0');
  });

  it('shows error state when video fails to load', () => {
    render(<OptimizedVideo {...defaultProps} />);
    const video = screen.getByRole('video');
    fireEvent.error(video);
    
    expect(screen.getByText('Video not available')).toBeInTheDocument();
    expect(analytics.trackEvent).toHaveBeenCalledWith({
      name: 'error',
      properties: {
        type: 'video_load',
        src: '/test-video.mp4',
      },
    });
  });

  it('removes loading state when video loads', () => {
    render(<OptimizedVideo {...defaultProps} />);
    const video = screen.getByRole('video');
    fireEvent.loadedData(video);
    
    expect(video).toHaveClass('opacity-100');
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    render(<OptimizedVideo {...defaultProps} className={className} />);
    expect(screen.getByRole('video').parentElement).toHaveClass(className);
  });

  it('sets video attributes correctly', () => {
    render(
      <OptimizedVideo
        {...defaultProps}
        autoPlay
        loop
        muted
        controls={false}
        poster="/poster.jpg"
      />
    );
    const video = screen.getByRole('video');
    
    expect(video).toHaveAttribute('autoPlay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('muted');
    expect(video).not.toHaveAttribute('controls');
    expect(video).toHaveAttribute('poster', '/poster.jpg');
  });
}); 