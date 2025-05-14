import { test, expect } from '@playwright/test';

test.describe('Archive Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/archive');
  });

  test('archive page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Archive/);
    await expect(page.getByRole('heading', { name: /Archive/i })).toBeVisible();
  });

  test('archive items are displayed in grid', async ({ page }) => {
    const grid = page.getByRole('grid');
    await expect(grid).toBeVisible();
    
    const items = page.getByRole('article');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('archive items have correct metadata', async ({ page }) => {
    const firstItem = page.getByRole('article').first();
    
    await expect(firstItem.getByRole('heading')).toBeVisible();
    await expect(firstItem.getByText(/Date:/i)).toBeVisible();
    await expect(firstItem.getByText(/Category:/i)).toBeVisible();
  });

  test('archive filtering works', async ({ page }) => {
    // Test category filter
    const categoryFilter = page.getByRole('combobox', { name: /category/i });
    await categoryFilter.selectOption('Documentary');
    
    const items = page.getByRole('article');
    for (const item of await items.all()) {
      await expect(item.getByText(/Category: Documentary/i)).toBeVisible();
    }

    // Test date filter
    const dateFilter = page.getByRole('combobox', { name: /year/i });
    await dateFilter.selectOption('2024');
    
    for (const item of await items.all()) {
      await expect(item.getByText(/2024/i)).toBeVisible();
    }
  });

  test('archive search functionality', async ({ page }) => {
    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('test');
    await searchInput.press('Enter');
    
    const items = page.getByRole('article');
    for (const item of await items.all()) {
      const text = await item.textContent();
      expect(text?.toLowerCase()).toContain('test');
    }
  });

  test('archive item click opens detail view', async ({ page }) => {
    const firstItem = page.getByRole('article').first();
    const itemTitle = await firstItem.getByRole('heading').textContent();
    
    await firstItem.click();
    
    const detailView = page.getByRole('dialog');
    await expect(detailView).toBeVisible();
    await expect(detailView.getByRole('heading')).toHaveText(itemTitle!);
  });

  test('archive pagination works', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: /next/i });
    const prevButton = page.getByRole('button', { name: /previous/i });
    
    // Get first page items
    const firstPageItems = await page.getByRole('article').all();
    const firstPageTitles = await Promise.all(
      firstPageItems.map(item => item.getByRole('heading').textContent())
    );
    
    // Go to next page
    await nextButton.click();
    
    // Get second page items
    const secondPageItems = await page.getByRole('article').all();
    const secondPageTitles = await Promise.all(
      secondPageItems.map(item => item.getByRole('heading').textContent())
    );
    
    // Verify different content
    expect(firstPageTitles).not.toEqual(secondPageTitles);
    
    // Go back to first page
    await prevButton.click();
    
    // Verify original content
    const currentPageItems = await page.getByRole('article').all();
    const currentPageTitles = await Promise.all(
      currentPageItems.map(item => item.getByRole('heading').textContent())
    );
    
    expect(currentPageTitles).toEqual(firstPageTitles);
  });

  test('archive responsive layout', async ({ page }) => {
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileGrid = page.getByRole('grid');
    await expect(mobileGrid).toHaveCSS('grid-template-columns', '1fr');
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    const tabletGrid = page.getByRole('grid');
    const tabletColumns = await tabletGrid.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    expect(tabletColumns).toMatch(/repeat\(2/);
    
    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 800 });
    const desktopGrid = page.getByRole('grid');
    const desktopColumns = await desktopGrid.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    expect(desktopColumns).toMatch(/repeat\(3/);
  });
}); 