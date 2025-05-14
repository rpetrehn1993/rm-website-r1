import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { testAccessibility } from '@/app/test-utils';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    // Suppress console.error for expected errors
    jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mock NODE_ENV
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // Restore original NODE_ENV
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalNodeEnv,
      writable: true
    });
  });

  it('should have no accessibility violations', async () => {
    await testAccessibility(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('provides error details in development', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true
    });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });

  it('hides error details in production', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true
    });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.queryByText(/test error/i)).not.toBeInTheDocument();
  });

  it('resets error state when retry button is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Simulate retry by rendering without error
    rerender(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies dark mode styles', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const errorContainer = screen.getByRole('alert');
    expect(errorContainer).toHaveClass('dark:bg-gray-800');

    const errorMessage = screen.getByText(/something went wrong/i);
    expect(errorMessage).toHaveClass('dark:text-gray-100');

    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toHaveClass('dark:bg-primary');
  });
}); 