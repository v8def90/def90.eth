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
    await expect(page.url()).toBe('http://localhost:4321/');
  });

  test('Home link', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.url()).toBe('http://localhost:4321/');
  });

  test('Blog link', async ({ page }) => {
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/.*blog/);
  });

  test('twitter', async ({ page }) => {
    await page.getByRole('link').nth(3).click();
    // await expect.soft(page.url()).toBe('https://twitter.com/def90eth');
    await expect(page).toHaveURL(/x/);
    await expect(page).toHaveURL(/def90eth/);
  });

  test('github link points to correct URL', async ({ page }) => {
    // リンクの存在とhref属性のみを確認
    const githubLink = page.locator('footer a[href*="github"]');
    await expect(githubLink).toBeVisible();
    const href = await githubLink.getAttribute('href');
    expect(href).toBe('https://github.com/v8def90');

    // クリックはスキップ
  });

  test('top text', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('def90.eth');
  });
});
