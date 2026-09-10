import { test, expect } from '@playwright/test';
import { DisabledInputPage } from '../pages/DisabledInputPage';

test.describe('Disabled Input', () => {
  let page: DisabledInputPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new DisabledInputPage(pwPage);
    await page.goto();
  });

  test('input and enable button render', async () => {
    await expect(page.input).toBeVisible();
    await expect(page.enableButton).toBeVisible();
  });

  test('typing into the input works while it is enabled', async () => {
    await page.typeIntoInput('Alex');
    expect(await page.getInputValue()).toBe('Alex');
  });

  test('enable button click does not throw', async () => {
    await page.clickEnableButton();
    await expect(page.enableButton).toBeVisible();
  });

  test('input becomes enabled after the delay', async () => {
    await page.clickEnableButton();
    await expect(page.input).toBeEnabled({ timeout: 10_000 });
  });
});