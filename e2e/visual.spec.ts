import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('home page matches snapshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('home.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('about page matches snapshot', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveScreenshot('about.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('work page matches snapshot', async ({ page }) => {
    await page.goto('/work');
    await expect(page).toHaveScreenshot('work.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('contact page matches snapshot', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveScreenshot('contact.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('navigation menu matches snapshot', async ({ page }) => {
    await page.goto('/');
    const menu = page.getByRole('navigation');
    await expect(menu).toHaveScreenshot('navigation.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('footer matches snapshot', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixelRatio: 0.1,
    });
  });
}); 