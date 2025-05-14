import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '@/app/components/ContactForm';
import { testAccessibility } from '@/app/test-utils';

describe('ContactForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should have no accessibility violations', async () => {
    await testAccessibility(<ContactForm onSubmit={mockOnSubmit} />);
  });

  it('renders form fields correctly', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.'
    };
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: formData.name }
    });
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: formData.email }
    });
    
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: formData.message }
    });
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(formData);
    });
  });

  it('shows loading state during submission', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.'
    };
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: formData.name }
    });
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: formData.email }
    });
    
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: formData.message }
    });
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/sending/i);
  });

  it('handles submission error', async () => {
    const mockError = new Error('Failed to send message');
    mockOnSubmit.mockRejectedValueOnce(mockError);
    
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.'
    };
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: formData.name }
    });
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: formData.email }
    });
    
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: formData.message }
    });
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
    
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent(/send/i);
  });

  it('applies dark mode styles', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const form = screen.getByRole('form');
    expect(form).toHaveClass('dark:bg-gray-800');
    
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toHaveClass('dark:bg-gray-700');
      expect(input).toHaveClass('dark:text-gray-100');
    });
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    expect(submitButton).toHaveClass('dark:bg-primary');
  });
}); 