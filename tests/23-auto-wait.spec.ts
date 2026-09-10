import { test, expect } from '@playwright/test';
import { AutoWaitPage } from '../pages/AutoWaitPage';

test.describe('Auto Wait', () => {
  let page: AutoWaitPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new AutoWaitPage(pwPage);
    await page.goto();
  });

  test('target button eventually becomes visible', async () => {
    await expect(page.targetButton).toBeVisible({ timeout: 15_000 });
  });

  test('target button eventually becomes enabled', async () => {
    await expect(page.targetButton).toBeEnabled({ timeout: 15_000 });
  });

  test('clicking the target waits for actionability', async () => {
    await page.clickTarget();
    await expect(page.targetButton).toBeVisible();
  });
});