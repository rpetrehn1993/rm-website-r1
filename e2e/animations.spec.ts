import { test, expect } from '@playwright/test';

test.describe('Animation Tests', () => {
  test('hero section animations', async ({ page }) => {
    await page.goto('/');
    
    // Wait for initial animations
    await page.waitForTimeout(1000);
    
    // Test hero text fade in
    const heroText = page.getByRole('heading', { name: /Reagan Petrehn/i });
    await expect(heroText).toHaveCSS('opacity', '1');
    await expect(heroText).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    
    // Test hero image fade in
    const heroImage = page.getByRole('img', { name: /hero/i });
    await expect(heroImage).toHaveCSS('opacity', '1');
  });

  test('project card hover animations', async ({ page }) => {
    await page.goto('/work');
    
    const projectCard = page.getByRole('article').first();
    
    // Test hover state
    await projectCard.hover();
    await expect(projectCard).toHaveCSS('transform', expect.stringContaining('scale'));
    await expect(projectCard).toHaveCSS('box-shadow', expect.stringContaining('rgba'));
  });

  test('navigation menu animations', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile menu
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = page.getByRole('button', { name: /menu/i });
    
    // Open menu
    await menuButton.click();
    const menu = page.getByRole('navigation');
    await expect(menu).toHaveCSS('transform', expect.stringContaining('translateX(0)'));
    
    // Close menu
    await menuButton.click();
    await expect(menu).toHaveCSS('transform', expect.stringContaining('translateX(-100%)'));
  });

  test('page transition animations', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to about page
    await page.getByRole('link', { name: /about/i }).click();
    
    // Test page transition
    const mainContent = page.getByRole('main');
    await expect(mainContent).toHaveCSS('opacity', '1');
    await expect(mainContent).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
  });

  test('scroll animations', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to projects section
    await page.evaluate(() => window.scrollTo(0, 1000));
    
    // Test scroll-triggered animations
    const projects = page.getByRole('article');
    for (const project of await projects.all()) {
      await expect(project).toHaveCSS('opacity', '1');
      await expect(project).toHaveCSS('transform', expect.stringContaining('translateY(0)'));
    }
  });
}); 