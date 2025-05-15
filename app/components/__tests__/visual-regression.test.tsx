import { test, expect } from '@playwright/test';
import Navigation from '@/app/components/Navigation';
import ProjectCard from '@/app/components/ProjectCard';

test.describe('Visual Regression Tests', () => {
  test('Navigation - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    // Test navigation in light mode
    await expect(page.locator('nav')).toHaveScreenshot('navigation-desktop-light.png');
    
    // Test navigation in dark mode
    await page.click('button[aria-label="Toggle theme"]');
    await expect(page.locator('nav')).toHaveScreenshot('navigation-desktop-dark.png');
  });

  test('Navigation - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Test navigation in light mode
    await expect(page.locator('nav')).toHaveScreenshot('navigation-mobile-light.png');
    
    // Test mobile menu open state
    await page.click('button[aria-label="Toggle menu"]');
    await expect(page.locator('nav')).toHaveScreenshot('navigation-mobile-menu-open.png');
    
    // Test navigation in dark mode
    await page.click('button[aria-label="Toggle theme"]');
    await expect(page.locator('nav')).toHaveScreenshot('navigation-mobile-dark.png');
  });

  test('ProjectCard - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/work');
    
    const projectCard = page.locator('article').first();
    
    // Test project card in light mode
    await expect(projectCard).toHaveScreenshot('project-card-desktop-light.png');
    
    // Test project card hover state
    await projectCard.hover();
    await expect(projectCard).toHaveScreenshot('project-card-desktop-hover.png');
    
    // Test project card in dark mode
    await page.click('button[aria-label="Toggle theme"]');
    await expect(projectCard).toHaveScreenshot('project-card-desktop-dark.png');
  });

  test('ProjectCard - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/work');
    
    const projectCard = page.locator('article').first();
    
    // Test project card in light mode
    await expect(projectCard).toHaveScreenshot('project-card-mobile-light.png');
    
    // Test project card in dark mode
    await page.click('button[aria-label="Toggle theme"]');
    await expect(projectCard).toHaveScreenshot('project-card-mobile-dark.png');
  });

  test('Responsive Layout - Work Page', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/work');
    await expect(page).toHaveScreenshot('work-page-desktop.png');
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('work-page-tablet.png');
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('work-page-mobile.png');
  });

  test('Responsive Layout - Contact Page', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/contact');
    await expect(page).toHaveScreenshot('contact-page-desktop.png');
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('contact-page-tablet.png');
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('contact-page-mobile.png');
  });

  test('Responsive Layout - Home Page', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-page-desktop.png');

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('home-page-tablet.png');

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('home-page-mobile.png');
  });

  test('Responsive Layout - Archive Page', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/archive');
    await expect(page).toHaveScreenshot('archive-page-desktop.png');

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('archive-page-tablet.png');

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('archive-page-mobile.png');
  });

  test('Responsive Layout - Contact Page', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/contact');
    await expect(page).toHaveScreenshot('contact-page-desktop.png');

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('contact-page-tablet.png');

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('contact-page-mobile.png');
  });
}); 