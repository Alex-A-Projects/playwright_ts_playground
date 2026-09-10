import { test, expect } from '@playwright/test';
import { MouseOverPage } from '../pages/MouseOverPage';

test.describe('Mouse Over', () => {
  let page: MouseOverPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new MouseOverPage(pwPage);
    await page.goto();
  });

  test('clicking the link twice increments the click count', async ({ page: pwPage }) => {
    await page.clickOriginalLink(pwPage, 2);
    const count = await page.getClickCount();
    expect(count).toBe(2);
  });

  test('click count starts at zero on a fresh navigation', async () => {
    const count = await page.getClickCount();
    expect(count).toBe(0);
  });

  test('a single click increments the count to 1', async ({ page: pwPage }) => {
    await page.clickOriginalLink(pwPage, 1);
    const count = await page.getClickCount();
    expect(count).toBe(1);
  });
});