import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

test.describe('Alerts', () => {
  let page: AlertsPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new AlertsPage(pwPage);
    await page.goto();
  });

  test('alert button shows an alert dialog', async () => {
    const text = await page.triggerAlert();
    expect(text.length).toBeGreaterThan(0);
  });

  test('confirm button shows a confirm dialog', async () => {
    const text = await page.triggerConfirm(true);
    expect(text.length).toBeGreaterThan(0);
  });

  test('prompt button accepts user input', async () => {
    const text = await page.triggerPrompt('Playwright');
    expect(text.length).toBeGreaterThan(0);
  });

  test('all three buttons render', async () => {
    await expect(page.alertButton).toBeVisible();
    await expect(page.confirmButton).toBeVisible();
    await expect(page.promptButton).toBeVisible();
  });
});