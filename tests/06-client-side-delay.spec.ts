import { test, expect } from '@playwright/test';
import { ClientSideDelayPage } from '../pages/ClientSideDelayPage';

test.describe('Client Side Delay', () => {
  let page: ClientSideDelayPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new ClientSideDelayPage(pwPage);
    await page.goto();
  });

  test('trigger button is visible on load', async () => {
    await expect(page.triggerButton).toBeVisible();
  });

  test('content appears after the client-side delay', async () => {
    await page.clickTrigger();
    await page.waitForContent();
    const text = await page.getContentText();
    expect(text.trim().length).toBeGreaterThan(0);
  });
});