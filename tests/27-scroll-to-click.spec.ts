import { test, expect } from '@playwright/test';
import { ScrollToClickPage } from '../pages/ScrollToClickPage';

test.describe('Scroll to Click', () => {
  let page: ScrollToClickPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new ScrollToClickPage(pwPage);
    await page.goto();
  });

  test('progress starts at 0 / 4', async () => {
    expect(await page.getClickedCount()).toBe(0);
  });

  test('clicking button 1 increments the progress counter', async () => {
    await page.clickTarget1();
    expect(await page.getClickedCount()).toBe(1);
  });

  test('clicking button 2 (in a scrollable container) works', async () => {
    await page.clickTarget2();
    expect(await page.getClickedCount()).toBeGreaterThanOrEqual(1);
  });

  test('clicking all four buttons completes the challenge', async () => {
    await page.clickAllTargets();
    expect(await page.getClickedCount()).toBe(4);
  });
});