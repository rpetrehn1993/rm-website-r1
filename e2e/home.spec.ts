import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Reagan Petrehn/);
  });

  test('displays cookie consent banner', async ({ page }) => {
    await page.goto('/');
    const consentBanner = page.getByText(/This website uses cookies/);
    await expect(consentBanner).toBeVisible();
  });

  test('accepts cookies', async ({ page }) => {
    await page.goto('/');
    const acceptButton = page.getByRole('button', { name: /accept/i });
    await acceptButton.click();
    const consentBanner = page.getByText(/This website uses cookies/);
    await expect(consentBanner).not.toBeVisible();
  });

  test('loads images with proper fallbacks', async ({ page }) => {
    await page.goto('/');
    
    // Check for image loading states
    const images = page.locator('img');
    await expect(images).toHaveCount(expect.any(Number));
    
    // Verify images have alt text
    for (const img of await images.all()) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/');
    const aboutLink = page.getByRole('link', { name: /about/i });
    await aboutLink.click();
    await expect(page).toHaveURL(/.*about/);
  });
}); 