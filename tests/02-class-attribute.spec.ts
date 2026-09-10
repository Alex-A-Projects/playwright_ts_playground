import { test, expect } from '@playwright/test';
import { ClassAttributePage } from '../pages/ClassAttributePage';

test.describe('Class Attribute', () => {
  let page: ClassAttributePage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new ClassAttributePage(pwPage);
    await page.goto();
  });

  test('primary button is visible', async () => {
    await expect(page.primaryButton).toBeVisible();
  });

  test('clicking the primary button triggers an alert mentioning "primary"', async () => {
    const alertText = await page.clickPrimaryAndGetAlertText();
    expect(alertText.toLowerCase()).toContain('primary');
  });

  test('primary button has multiple class tokens', async () => {
    const classes = await page.getButtonClasses(page.primaryButton);
    expect(classes.length).toBeGreaterThan(1);
    expect(classes).toContain('btn-primary');
  });

  test('three buttons render in total', async () => {
    await expect(page.primaryButton).toBeVisible();
    await expect(page.successButton).toBeVisible();
    await expect(page.warningButton).toBeVisible();
  });
});