import { test, expect } from '@playwright/test';

test.describe('Dark Mode Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
  });

  test('hero section dark mode styles', async ({ page }) => {
    const hero = page.getByRole('banner');
    await expect(hero).toHaveCSS('background-color', 'rgb(17, 24, 39)'); // dark:bg-gray-900
    await expect(hero).toHaveCSS('color', 'rgb(229, 231, 235)'); // dark:text-gray-200
  });

  test('navigation dark mode styles', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toHaveCSS('background-color', 'rgba(17, 24, 39, 0.8)'); // dark:bg-gray-900/80
    await expect(nav).toHaveCSS('backdrop-filter', 'blur(8px)');
  });

  test('project cards dark mode styles', async ({ page }) => {
    await page.goto('/work');
    const projectCard = page.getByRole('article').first();
    await expect(projectCard).toHaveCSS('background-color', 'rgb(31, 41, 55)'); // dark:bg-gray-800
    await expect(projectCard).toHaveCSS('border-color', 'rgb(55, 65, 81)'); // dark:border-gray-700
  });

  test('contact form dark mode styles', async ({ page }) => {
    await page.goto('/contact');
    const form = page.getByRole('form');
    await expect(form).toHaveCSS('background-color', 'rgb(31, 41, 55)'); // dark:bg-gray-800
    
    const input = page.locator('input[name="name"]');
    await expect(input).toHaveCSS('background-color', 'rgb(17, 24, 39)'); // dark:bg-gray-900
    await expect(input).toHaveCSS('border-color', 'rgb(55, 65, 81)'); // dark:border-gray-700
  });

  test('footer dark mode styles', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    await expect(footer).toHaveCSS('background-color', 'rgb(17, 24, 39)'); // dark:bg-gray-900
    await expect(footer).toHaveCSS('border-color', 'rgb(55, 65, 81)'); // dark:border-gray-700
  });

  test('theme toggle button dark mode styles', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /theme/i });
    await expect(themeToggle).toHaveCSS('background-color', 'rgb(31, 41, 55)'); // dark:bg-gray-800
    await expect(themeToggle).toHaveCSS('color', 'rgb(229, 231, 235)'); // dark:text-gray-200
  });

  test('modal dark mode styles', async ({ page }) => {
    await page.goto('/work');
    const projectCard = page.getByRole('article').first();
    await projectCard.click();
    
    const modal = page.getByRole('dialog');
    await expect(modal).toHaveCSS('background-color', 'rgb(17, 24, 39)'); // dark:bg-gray-900
    await expect(modal).toHaveCSS('color', 'rgb(229, 231, 235)'); // dark:text-gray-200
  });

  test('loading states dark mode styles', async ({ page }) => {
    await page.goto('/work');
    const loadingSkeleton = page.getByTestId('loading-skeleton');
    await expect(loadingSkeleton).toHaveCSS('background-color', 'rgb(31, 41, 55)'); // dark:bg-gray-800
  });
}); 