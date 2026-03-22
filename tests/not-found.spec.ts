import { test, expect } from '@playwright/test';

test.describe('404 ページ', () => {
  test('存在しない URL にアクセスすると 404 コンテンツが表示される', async ({ page }) => {
    await page.goto('/blog/this-page-does-not-exist');
    await expect(page.locator('h1')).toContainText('404');
  });

  test('"ページが見つかりません" のメッセージが表示される', async ({ page }) => {
    await page.goto('/blog/this-page-does-not-exist');
    await expect(page.getByText('ページが見つかりません')).toBeVisible();
  });

  test('ヘッダーが表示される', async ({ page }) => {
    await page.goto('/blog/this-page-does-not-exist');
    await expect(page.locator('header')).toBeVisible();
  });

  test('フッターが表示される', async ({ page }) => {
    await page.goto('/blog/this-page-does-not-exist');
    await expect(page.locator('footer')).toBeVisible();
  });

  test('ホームへ戻れる', async ({ page }) => {
    await page.goto('/blog/this-page-does-not-exist');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('http://localhost:4321/');
  });
});
