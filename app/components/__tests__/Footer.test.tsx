import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';
import { testAccessibility } from '@/app/test-utils';

describe('Footer', () => {
  it('should have no accessibility violations', async () => {
    await testAccessibility(<Footer />);
  });

  it('renders social media links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /vimeo/i })).toBeInTheDocument();
  });

  it('has proper ARIA labels for social links', () => {
    render(<Footer />);
    
    const socialLinks = screen.getAllByRole('link');
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('aria-label');
    });
  });

  it('has proper copyright information', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
}); 