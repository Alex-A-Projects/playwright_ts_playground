import { test, expect } from '@playwright/test';
import { VerifyTextPage } from '../pages/VerifyTextPage';

test.describe('Verify Text', () => {
  let page: VerifyTextPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new VerifyTextPage(pwPage);
    await page.goto();
  });

  test('welcome text is visible', async () => {
    await expect(page.welcomeText).toBeVisible();
  });

  test('welcome text innerText is exactly "Welcome UserName!"', async () => {
    const text = await page.getWelcomeText();
    expect(text).toBe('Welcome UserName!');
  });

  test('a warning example element contains nbsp in its markup', async () => {
    const hasNbsp = await page.warningExampleHasNbsp();
    expect(hasNbsp).toBe(true);
  });
});