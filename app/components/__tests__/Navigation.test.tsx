import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '@/app/components/Navigation';
import { testAccessibility } from '@/app/test-utils';

describe('Navigation', () => {
  it('should have no accessibility violations', async () => {
    await testAccessibility(<Navigation />);
  });

  it('renders navigation links correctly', () => {
    render(<Navigation />);
    
    expect(screen.getByRole('link', { name: /archive/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /connect/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('shows mobile menu on small screens', async () => {
    render(<Navigation />);
    
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
    render(<Navigation />);
    
    const archiveLink = screen.getByRole('link', { name: /archive/i });
    fireEvent.click(archiveLink);
    
    expect(archiveLink).toHaveClass('text-primary');
  });

  it('applies backdrop blur on scroll', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).not.toHaveClass('backdrop-blur-md');
    
    // Simulate scroll
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));
    
    expect(nav).toHaveClass('backdrop-blur-md');
  });

  it('handles keyboard navigation', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    menuButton.focus();
    
    fireEvent.keyDown(menuButton, { key: 'Enter' });
    expect(screen.getByRole('navigation')).toHaveClass('translate-x-0');
    
    fireEvent.keyDown(menuButton, { key: ' ' });
    expect(screen.getByRole('navigation')).toHaveClass('-translate-x-full');
  });

  it('applies dark mode styles', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('dark:bg-gray-900/80');
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('dark:text-gray-200');
    });
  });
}); 