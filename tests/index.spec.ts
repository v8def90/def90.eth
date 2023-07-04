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
    await page.getByRole('link', { name: 'Calm/LightYears' }).click();
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
    // await expect.soft(page.url()).toBe('https://twitter.com/def90eth');
    await expect(page).toHaveURL(/twitter/);
    await expect(page).toHaveURL(/def90eth/);
  });

  test('github', async ({ page }) => {
    await page.getByRole('link').nth(4).click();
    await expect(page.url()).toBe('https://github.com/v8def90');
  });

  test('top text', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('def90.eth');
  });
});
