import { test, expect } from '@playwright/test';
import { DynamicIdPage } from '../pages/DynamicIdPage';

test.describe('Dynamic ID', () => {
  let page: DynamicIdPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new DynamicIdPage(pwPage);
    await page.goto();
  });

  test('button is rendered and visible', async () => {
    await expect(page.dynamicButton).toBeVisible();
  });

  test('button has a non-empty id attribute', async () => {
    const id = await page.getButtonId();
    expect(id.length).toBeGreaterThan(0);
  });

  test('button id changes on subsequent page loads', async ({ page: pwPage }) => {
    const firstId = await page.getButtonId();
    await pwPage.reload();
    const secondId = await page.getButtonId();
    expect(secondId).not.toBe(firstId);
  });

  test('clicking the dynamic button does not throw', async () => {
    await page.clickDynamicButton();
    await expect(page.dynamicButton).toBeVisible();
  });
});