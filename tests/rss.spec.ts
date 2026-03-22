import { test, expect } from '@playwright/test';

test.describe('RSS フィード', () => {
  test('/rss.xml が 200 を返す', async ({ request }) => {
    const response = await request.get('/rss.xml');
    expect(response.status()).toBe(200);
  });

  test('Content-Type が XML 形式である', async ({ request }) => {
    const response = await request.get('/rss.xml');
    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/xml/);
  });

  test('有効な RSS 構造を持つ', async ({ request }) => {
    const response = await request.get('/rss.xml');
    const body = await response.text();
    expect(body).toContain('<rss');
    expect(body).toContain('<channel>');
    expect(body).toContain('</channel>');
  });

  test('記事が3件含まれる', async ({ request }) => {
    const response = await request.get('/rss.xml');
    const body = await response.text();
    const itemCount = (body.match(/<item>/g) || []).length;
    expect(itemCount).toBe(3);
  });

  test('サイトタイトルが含まれる', async ({ request }) => {
    const response = await request.get('/rss.xml');
    const body = await response.text();
    expect(body).toContain('Calm/LightYears');
  });

  test('各記事のリンクが /blog/ 形式である', async ({ request }) => {
    const response = await request.get('/rss.xml');
    const body = await response.text();
    expect(body).toContain('/blog/ChatGPT4');
    expect(body).toContain('/blog/HP');
    expect(body).toContain('/blog/HumanKind');
  });
});
