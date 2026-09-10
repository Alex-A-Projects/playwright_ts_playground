import { test, expect } from '@playwright/test';
import { ShadowDomPage } from '../pages/ShadowDomPage';

test.describe('Shadow DOM', () => {
  let page: ShadowDomPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new ShadowDomPage(pwPage);
    await page.goto();
  });

  test('input inside the shadow root is reachable', async () => {
    await expect(page.inputInShadow).toBeAttached();
  });

  test('editing the input updates its value', async () => {
    const newValue = '5b1f2c3d-1234-5678-9abc-def012345678';
    await page.setInputValue(newValue);
    expect(await page.getInputValue()).toBe(newValue);
  });

  test('generate button inside the shadow root is clickable', async () => {
    await expect(page.generateButton).toBeVisible();
    await page.clickGenerate();
  });

  test('copy button inside the shadow root is clickable', async () => {
    await expect(page.copyButton).toBeVisible();
    await page.clickCopy();
  });
});