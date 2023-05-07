import { test, expect } from '@playwright/test';

test('first landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();
});
test('first landing page with limit width', async ({ page }) => {
  await page.setViewportSize({ width: 1023, height: 1000 });
  await page.goto('/');

  await expect(page).toHaveScreenshot();
});
