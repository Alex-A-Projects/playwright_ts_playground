import { test, expect } from '@playwright/test';
import { LoadDelayPage } from '../pages/LoadDelayPage';

test.describe('Load Delay', () => {
  let page: LoadDelayPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new LoadDelayPage(pwPage);
    await page.goto();
  });

  test('button appears after the delayed load', async () => {
    await expect(page.button).toBeVisible({ timeout: 15_000 });
  });

  test('clicking the button does not throw', async () => {
    await page.clickButton();
    await expect(page.button).toBeVisible();
  });
});