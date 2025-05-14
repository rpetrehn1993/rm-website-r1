import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '@/app/components/Navigation';
import { testAccessibility } from '@/app/test-utils';

describe('Navigation', () => {
  const mockOnThemeToggle = jest.fn();

  beforeEach(() => {
    mockOnThemeToggle.mockClear();
  });

  it('should have no accessibility violations', async () => {
    await testAccessibility(<Navigation onThemeToggle={mockOnThemeToggle} />);
  });

  it('renders navigation links correctly', () => {
    render(<Navigation onThemeToggle={mockOnThemeToggle} />);
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /work/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<Navigation onThemeToggle={mockOnThemeToggle} />);
    
    const themeToggle = screen.getByRole('button', { name: /theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('calls onThemeToggle when theme button is clicked', () => {
    render(<Navigation onThemeToggle={mockOnThemeToggle} />);
    
    const themeToggle = screen.getByRole('button', { name: /theme/i });
    fireEvent.click(themeToggle);
    
    expect(mockOnThemeToggle).toHaveBeenCalled();
  });

  it('shows mobile menu on small screens', async () => {
    render(<Navigation onThemeToggle={mockOnThemeToggle} />);
    
    // Set viewport to mobile size
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeVisible();
    
    // Open menu
    fireEvent.click(menuButton);
    
    const mobileMenu = screen.getByRole('navigation');
    expect(mobileMenu).toHaveClass('translate-x-0');
    
    // Close menu
    fireEvent.click(menuButton);
    expect(mobileMenu).toHaveClass('-translate-x-full');
  });

  it('handles active link state', () => {
    render(<Navigation onThemeToggle={mockOnThemeToggle} />);
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    
    expect(homeLink).toHaveClass('text-primary');
  });

  it('applies backdrop blur on scroll', () => {
    render(<Navigation onThemeToggle={mockOnThemeToggle} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).not.toHaveClass('backdrop-blur-md');
    
    // Simulate scroll
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));
    
    expect(nav).toHaveClass('backdrop-blur-md');
  });

  it('handles keyboard navigation', () => {
    render(<Navigation onThemeToggle={mockOnThemeToggle} />);
    
    const themeToggle = screen.getByRole('button', { name: /theme/i });
    themeToggle.focus();
    
    fireEvent.keyDown(themeToggle, { key: 'Enter' });
    expect(mockOnThemeToggle).toHaveBeenCalled();
    
    fireEvent.keyDown(themeToggle, { key: ' ' });
    expect(mockOnThemeToggle).toHaveBeenCalledTimes(2);
  });

  it('applies dark mode styles', () => {
    render(<Navigation onThemeToggle={mockOnThemeToggle} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('dark:bg-gray-900/80');
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('dark:text-gray-200');
    });
  });
}); 