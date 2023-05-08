import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('first landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot();
  });

  test('Blog Title link', async ({ page }) => {
    await page.getByRole('link', { name: 'Tech Flow.' }).click();
    await expect(page.url()).toBe('http://localhost:3000/');
  });

  test('Home link', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.url()).toBe('http://localhost:3000/');
  });

  test('Blog link', async ({ page }) => {
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/.*blog/);
  });

  test('twitter', async ({ page }) => {
    await page.getByRole('link').nth(3).click();
    await expect(page.url()).toBe('https://twitter.com/');
  });

  test('github', async ({ page }) => {
    await page.getByRole('link').nth(4).click();
    await expect(page.url()).toBe('https://github.com/');
  });

  test('top text', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Astro');
  });
});
