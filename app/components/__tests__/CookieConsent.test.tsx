import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CookieConsent from '../CookieConsent';
import { testAccessibility } from '@/app/test-utils';

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have no accessibility violations', async () => {
    await testAccessibility(<CookieConsent />);
  });

  it('shows consent banner when no consent is given', () => {
    render(<CookieConsent />);
    expect(screen.getByText(/This website uses cookies/)).toBeInTheDocument();
  });

  it('hides consent banner when consent is given', () => {
    render(<CookieConsent />);
    const acceptButton = screen.getByRole('button', { name: /accept/i });
    fireEvent.click(acceptButton);
    expect(screen.queryByText(/This website uses cookies/)).not.toBeInTheDocument();
  });

  it('persists consent in localStorage', () => {
    render(<CookieConsent />);
    const acceptButton = screen.getByRole('button', { name: /accept/i });
    fireEvent.click(acceptButton);
    expect(localStorage.getItem('cookieConsent')).toBe('true');
  });

  it('has proper ARIA attributes', () => {
    render(<CookieConsent />);
    const banner = screen.getByRole('alert');
    expect(banner).toHaveAttribute('aria-live', 'polite');
  });

  it('tracks consent in analytics', () => {
    const mockTrackEvent = jest.fn();
    jest.spyOn(require('@/lib/analytics'), 'analytics').mockImplementation({
      trackEvent: mockTrackEvent,
    });

    render(<CookieConsent />);
    const acceptButton = screen.getByRole('button', { name: /accept/i });
    fireEvent.click(acceptButton);

    expect(mockTrackEvent).toHaveBeenCalledWith({
      name: 'cookie_consent',
      properties: {
        action: 'accept',
      },
    });
  });
}); 