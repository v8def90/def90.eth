import { test, expect } from '@playwright/test';

test.describe('ダークモード', () => {
  test('トグルボタンが表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button')).toBeVisible();
  });

  test('初期状態でライトモードのアイコンが表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button')).toContainText('☾');
  });

  test('クリックでダークモードに切り替わる', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('ダークモード切り替え後に localStorage へ保存される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').click();
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });

  test('ダークモード時にアイコンが切り替わる', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').click();
    await expect(page.getByRole('button')).toContainText('☼');
  });

  test('再クリックでライトモードに戻る', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').click();
    await page.getByRole('button').click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('ライトモード復帰後に localStorage へ保存される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').click();
    await page.getByRole('button').click();
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');
  });

  test('ページ再読み込み後もダークモードが維持される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('ページ再読み込み後もライトモードが維持される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').click();
    await page.getByRole('button').click();
    await page.reload();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
