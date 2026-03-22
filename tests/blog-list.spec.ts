import { test, expect } from '@playwright/test';

test.describe('ブログ一覧ページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('ページが正常に表示される', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog Posts/);
  });

  test('h1 に "Blog Posts" が表示される', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Blog Posts');
  });

  test('ヘッダーとフッターが表示される', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('公開記事 (draft: false) が3件表示される', async ({ page }) => {
    const cards = page.locator('a[href^="/blog/"]').filter({ has: page.locator('h2') });
    await expect(cards).toHaveCount(3);
  });

  test('各カードに記事タイトルが表示される', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'HumanKind / Rutger Bregman', level: 2 })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'AIとのペアプログラミングについて', level: 2 })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'このサイトについて', level: 2 })).toBeVisible();
  });

  test('記事カードのリンク先が正しい形式である', async ({ page }) => {
    const firstCard = page
      .locator('a[href^="/blog/"]')
      .filter({ has: page.locator('h2') })
      .first();
    const href = await firstCard.getAttribute('href');
    expect(href).toMatch(/^\/blog\/[^/]+$/);
  });

  test('記事が新しい順に並んでいる', async ({ page }) => {
    const titles = page
      .locator('a[href^="/blog/"]')
      .filter({ has: page.locator('h2') })
      .locator('h2');
    await expect(titles.nth(0)).toHaveText('HumanKind / Rutger Bregman');
    await expect(titles.nth(1)).toHaveText('AIとのペアプログラミングについて');
    await expect(titles.nth(2)).toHaveText('このサイトについて');
  });

  test('3件のためページネーションは表示されない', async ({ page }) => {
    await expect(page.getByRole('link', { name: /← 前へ/ })).not.toBeVisible();
    await expect(page.getByRole('link', { name: /次へ →/ })).not.toBeVisible();
  });

  test('記事カードをクリックすると記事詳細に遷移する', async ({ page }) => {
    await page.getByRole('heading', { name: 'HumanKind / Rutger Bregman', level: 2 }).click();
    await expect(page).toHaveURL(/\/blog\/HumanKind/);
  });
});
