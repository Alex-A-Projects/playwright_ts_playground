import { test, expect } from '@playwright/test';
import { HiddenLayersPage } from '../pages/HiddenLayersPage';

test.describe('Hidden Layers', () => {
  let page: HiddenLayersPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new HiddenLayersPage(pwPage);
    await page.goto();
  });

  test('green button renders and is visible', async () => {
    await expect(page.greenButton).toBeVisible();
  });

  test('clicking the green button succeeds without error', async () => {
    await page.clickGreenButton();
    await expect(page.greenButton).toBeVisible();
  });
});