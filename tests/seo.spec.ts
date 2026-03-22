import { test, expect } from '@playwright/test';

test.describe('SEO / メタタグ', () => {
  test.describe('トップページ', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('title が正しい', async ({ page }) => {
      await expect(page).toHaveTitle('Calm/LightYears');
    });

    test('og:title が設定されている', async ({ page }) => {
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', 'Calm/LightYears');
    });

    test('og:description が設定されている', async ({ page }) => {
      const ogDesc = page.locator('meta[property="og:description"]');
      await expect(ogDesc).toHaveAttribute('content', 'calmly for many light years');
    });

    test('twitter:card が設定されている', async ({ page }) => {
      const twitterCard = page.locator('meta[name="twitter:card"]');
      await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    });

    test('canonical URL が設定されている', async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', 'https://def90.net/');
    });

    test('favicon が設定されている', async ({ page }) => {
      const favicon = page.locator('link[rel="icon"]');
      await expect(favicon).toHaveAttribute('href', '/Calm.png');
    });
  });

  test.describe('ブログ一覧ページ', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog');
    });

    test('title にページタイトルとサイト名が含まれる', async ({ page }) => {
      await expect(page).toHaveTitle('Blog Posts | Calm/LightYears');
    });

    test('og:title が正しい', async ({ page }) => {
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', 'Blog Posts | Calm/LightYears');
    });

    test('meta description が設定されている', async ({ page }) => {
      const desc = page.locator('meta[name="description"]');
      await expect(desc).toHaveAttribute('content', 'ブログの記事一覧');
    });

    test('canonical URL が正しい', async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', 'https://def90.net/blog');
    });
  });

  test.describe('記事詳細ページ', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/ChatGPT4');
    });

    test('title に記事タイトルとサイト名が含まれる', async ({ page }) => {
      await expect(page).toHaveTitle('AIとのペアプログラミングについて | Calm/LightYears');
    });

    test('og:title が記事タイトルになっている', async ({ page }) => {
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', 'AIとのペアプログラミングについて | Calm/LightYears');
    });

    test('meta description が記事の description になっている', async ({ page }) => {
      const desc = page.locator('meta[name="description"]');
      await expect(desc).toHaveAttribute('content', 'Blog #2');
    });

    test('og:description が記事の description になっている', async ({ page }) => {
      const ogDesc = page.locator('meta[property="og:description"]');
      await expect(ogDesc).toHaveAttribute('content', 'Blog #2');
    });

    test('og:image が記事のサムネイル画像になっている', async ({ page }) => {
      const ogImage = page.locator('meta[property="og:image"]');
      const content = await ogImage.getAttribute('content');
      expect(content).toContain('/assets/AI.jpg');
    });

    test('canonical URL が正しい', async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', 'https://def90.net/blog/ChatGPT4');
    });
  });
});
