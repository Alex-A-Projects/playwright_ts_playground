import { test, expect } from '@playwright/test';
import { SampleAppPage } from '../pages/SampleAppPage';
import { SAMPLE_APP } from '../utils/testData';

test.describe('Sample App', () => {
  let page: SampleAppPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new SampleAppPage(pwPage);
    await page.goto();
  });

  test('login form is rendered with all three inputs', async () => {
    await expect(page.userNameInput).toBeVisible();
    await expect(page.passwordInput).toBeVisible();
    await expect(page.loginButton).toBeVisible();
  });

  test('valid credentials produce a welcome message', async () => {
    const status = await page.loginWithValidCredentials();
    expect(status).toMatch(/Welcome/i);
    expect(status).toContain(SAMPLE_APP.validUser);
  });

  test('invalid credentials produce an error message', async () => {
    const status = await page.loginWithInvalidCredentials();
    expect(status.toLowerCase()).toMatch(/invalid/);
  });
});