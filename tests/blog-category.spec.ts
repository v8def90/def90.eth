import { test, expect } from '@playwright/test';

test.describe('カテゴリー別一覧ページ', () => {
  test.describe('AI カテゴリー (記事あり)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/category/ai');
    });

    test('ページが正常に表示される', async ({ page }) => {
      await expect(page).toHaveTitle(/AI/);
    });

    test('h1 にカテゴリー名が表示される', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('AI');
    });

    test('AI カテゴリーの記事が1件表示される', async ({ page }) => {
      const cards = page.locator('a[href^="/blog/"]').filter({ has: page.locator('h2') });
      await expect(cards).toHaveCount(1);
    });

    test('AI カテゴリーの記事タイトルが表示される', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'AIとのペアプログラミングについて', level: 2 })
      ).toBeVisible();
    });

    test('カードをクリックすると記事詳細に遷移する', async ({ page }) => {
      await page.getByRole('heading', { name: 'AIとのペアプログラミングについて', level: 2 }).click();
      await expect(page).toHaveURL(/\/blog\/ChatGPT4/);
    });
  });

  test.describe('Astro カテゴリー (記事あり)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/category/astro');
    });

    test('h1 にカテゴリー名が表示される', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Astro');
    });

    test('Astro カテゴリーの記事が1件表示される', async ({ page }) => {
      const cards = page.locator('a[href^="/blog/"]').filter({ has: page.locator('h2') });
      await expect(cards).toHaveCount(1);
    });

    test('複数カテゴリーを持つ記事が正しく表示される', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'このサイトについて', level: 2 })).toBeVisible();
    });
  });

  test.describe('Poem カテゴリー (記事あり)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/category/poem');
    });

    test('h1 にカテゴリー名が表示される', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Poem');
    });

    test('Poem カテゴリーの記事が表示される', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'HumanKind / Rutger Bregman', level: 2 })).toBeVisible();
    });
  });

  test.describe('Python カテゴリー (記事なし)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/category/python');
    });

    test('h1 にカテゴリー名が表示される', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Python');
    });

    test('記事が0件の場合カードが表示されない', async ({ page }) => {
      const cards = page.locator('a[href^="/blog/"]').filter({ has: page.locator('h2') });
      await expect(cards).toHaveCount(0);
    });
  });

  test.describe('TypeScript カテゴリー (記事あり)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/category/typescript');
    });

    test('TypeScript カテゴリーの記事が表示される', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'このサイトについて', level: 2 })).toBeVisible();
    });

    test('他カテゴリーの記事は表示されない', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'AIとのペアプログラミングについて', level: 2 })
      ).not.toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'HumanKind / Rutger Bregman', level: 2 })
      ).not.toBeVisible();
    });
  });
});
