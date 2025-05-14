import { test, expect } from '@playwright/test';

const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  large: { width: 1920, height: 1080 },
};

test.describe('Responsive Design Tests', () => {
  for (const [device, viewport] of Object.entries(viewports)) {
    test.describe(`${device} viewport`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize(viewport);
      });

      test('navigation is responsive', async ({ page }) => {
        await page.goto('/');
        const nav = page.getByRole('navigation');
        
        if (device === 'mobile') {
          // Check for mobile menu button
          const menuButton = page.getByRole('button', { name: /menu/i });
          await expect(menuButton).toBeVisible();
          
          // Check menu opens
          await menuButton.click();
          await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
        } else {
          // Check for horizontal navigation
          await expect(nav).toHaveClass(/flex/);
          await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
        }
      });

      test('project grid is responsive', async ({ page }) => {
        await page.goto('/work');
        const grid = page.getByRole('main').getByRole('list');
        
        if (device === 'mobile') {
          await expect(grid).toHaveClass(/grid-cols-1/);
        } else if (device === 'tablet') {
          await expect(grid).toHaveClass(/grid-cols-2/);
        } else {
          await expect(grid).toHaveClass(/grid-cols-3/);
        }
      });

      test('images are responsive', async ({ page }) => {
        await page.goto('/');
        const images = page.locator('img');
        
        for (const img of await images.all()) {
          const src = await img.getAttribute('src');
          if (device === 'mobile') {
            expect(src).toContain('w=375');
          } else if (device === 'tablet') {
            expect(src).toContain('w=768');
          } else {
            expect(src).toContain('w=1280');
          }
        }
      });

      test('typography scales appropriately', async ({ page }) => {
        await page.goto('/');
        const headings = page.locator('h1, h2, h3');
        
        for (const heading of await headings.all()) {
          const fontSize = await heading.evaluate(el => 
            window.getComputedStyle(el).fontSize
          );
          
          if (device === 'mobile') {
            expect(parseFloat(fontSize)).toBeLessThanOrEqual(24);
          } else {
            expect(parseFloat(fontSize)).toBeGreaterThan(24);
          }
        }
      });
    });
  }
}); 