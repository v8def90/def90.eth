import { test, expect } from '@playwright/test';

/**
 * 記事の並び順 (新しい順):
 *   index 0: HumanKind (2023-07-03) - category: poem
 *   index 1: ChatGPT4  (2023-07-02) - category: ai
 *   index 2: HP        (2023-07-01) - category: typescript, astro
 *
 * ナビゲーション方向:
 *   ← prevTitle = 古い記事へ (index+1)
 *   nextTitle → = 新しい記事へ (index-1)
 */

test.describe('記事詳細ページ', () => {
  test.describe('HumanKind (最新記事)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/HumanKind');
    });

    test('ページが正常に表示される', async ({ page }) => {
      await expect(page).toHaveTitle(/HumanKind/);
    });

    test('記事タイトルが表示される', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('HumanKind / Rutger Bregman');
    });

    test('公開日が表示される', async ({ page }) => {
      await expect(page.locator('time')).toBeVisible();
      await expect(page.locator('time')).toHaveText('2023/07/03');
    });

    test('カテゴリーボタンが表示される', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Poem' })).toBeVisible();
    });

    test('カテゴリーボタンのリンク先が正しい', async ({ page }) => {
      const categoryLink = page.getByRole('link', { name: 'Poem' });
      await expect(categoryLink).toHaveAttribute('href', '/blog/category/poem');
    });

    test('本文コンテンツが表示される', async ({ page }) => {
      await expect(page.locator('.znc')).toBeVisible();
    });

    test('前の記事へのリンクが表示される (古い記事へ)', async ({ page }) => {
      await expect(page.getByRole('link', { name: /AIとのペアプログラミングについて/ })).toBeVisible();
    });

    test('次の記事へのリンクは表示されない (最新記事のため)', async ({ page }) => {
      // ページネーション領域 (最後の flex-spacebetween) には prev リンクのみ存在する
      const paginationLinks = page.locator('.flex-spacebetween').last().getByRole('link');
      await expect(paginationLinks).toHaveCount(1);
      await expect(paginationLinks.first()).toContainText('←');
    });
  });

  test.describe('ChatGPT4 (中間記事)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/ChatGPT4');
    });

    test('記事タイトルが表示される', async ({ page }) => {
      await expect(page.locator('article h1')).toHaveText('AIとのペアプログラミングについて');
    });

    test('公開日が表示される', async ({ page }) => {
      await expect(page.locator('time')).toHaveText('2023/07/02');
    });

    test('カテゴリーボタンが表示される', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'AI' })).toBeVisible();
    });

    test('前の記事リンク (古い記事) と次の記事リンク (新しい記事) の両方が表示される', async ({ page }) => {
      await expect(page.getByRole('link', { name: /このサイトについて/ })).toBeVisible();
      await expect(page.getByRole('link', { name: /HumanKind/ })).toBeVisible();
    });

    test('前の記事リンクが正しい URL を指している', async ({ page }) => {
      const prevLink = page.getByRole('link', { name: /このサイトについて/ });
      await expect(prevLink).toHaveAttribute('href', '/blog/HP');
    });

    test('次の記事リンクが正しい URL を指している', async ({ page }) => {
      const nextLink = page.getByRole('link', { name: /HumanKind/ });
      await expect(nextLink).toHaveAttribute('href', '/blog/HumanKind');
    });
  });

  test.describe('HP (最古記事)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog/HP');
    });

    test('記事タイトルが表示される', async ({ page }) => {
      await expect(page.locator('article h1')).toHaveText('このサイトについて');
    });

    test('公開日が表示される', async ({ page }) => {
      await expect(page.locator('time')).toHaveText('2023/07/01');
    });

    test('複数カテゴリーが表示される', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'TypeScript' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Astro' })).toBeVisible();
    });

    test('次の記事リンクが表示される (新しい記事へ)', async ({ page }) => {
      await expect(page.getByRole('link', { name: /AIとのペアプログラミングについて/ })).toBeVisible();
    });

    test('前の記事リンクは表示されない (最古記事のため)', async ({ page }) => {
      // ページネーション領域 (最後の flex-spacebetween) には next リンクのみ存在する
      const paginationLinks = page.locator('.flex-spacebetween').last().getByRole('link');
      await expect(paginationLinks).toHaveCount(1);
      await expect(paginationLinks.first()).toContainText('→');
    });
  });
});
