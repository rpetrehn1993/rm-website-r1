import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('contact form submission', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('success', true);
  });

  test('contact form validation', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: '',
        email: 'invalid-email',
        message: '',
      },
    });

    expect(response.ok()).toBeFalsy();
    const data = await response.json();
    expect(data).toHaveProperty('errors');
    expect(data.errors).toHaveProperty('name');
    expect(data.errors).toHaveProperty('email');
    expect(data.errors).toHaveProperty('message');
  });

  test('rate limiting', async ({ request }) => {
    const requests = Array(6).fill(null).map(() => 
      request.post('/api/contact', {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message',
        },
      })
    );

    const responses = await Promise.all(requests);
    const lastResponse = responses[responses.length - 1];
    
    expect(lastResponse.ok()).toBeFalsy();
    expect(lastResponse.status()).toBe(429);
  });

  test('CSRF protection', async ({ request }) => {
    const response = await request.post('/api/contact', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(403);
  });
}); 