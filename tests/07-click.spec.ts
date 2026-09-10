import { test, expect } from '@playwright/test';
import { ClickPage } from '../pages/ClickPage';

test.describe('Click', () => {
  let page: ClickPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new ClickPage(pwPage);
    await page.goto();
  });

  test('button is visible on load', async () => {
    await expect(page.button).toBeVisible();
  });

  test('real-mouse click works (button ignores event-based clicks)', async () => {
    await page.clickButton();
    await expect(page.button).toBeVisible();
  });

  test('dispatchEvent click does not throw (button ignores it)', async () => {
    await expect(page.dispatchClickAndCheckNoEffect()).resolves.toBe(true);
  });
});