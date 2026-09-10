import { test, expect } from '@playwright/test';
import { CssSelectorsPage } from '../pages/CssSelectorsPage';

test.describe('CSS Selectors', () => {
  let page: CssSelectorsPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new CssSelectorsPage(pwPage);
    await page.goto();
  });

  test('id selector finds the primary button', async () => {
    await expect(page.primaryBtn).toBeVisible();
    const text = await page.getPrimaryBtnText();
    expect(text).toContain('Primary');
  });

  test('class selector finds multiple buttons with the css-btn class', async () => {
    const count = await page.getClassBtnCount();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('attribute selector (data-id) finds the primary button', async () => {
    await expect(page.dataIdBtn).toBeVisible();
    const text = (await page.dataIdBtn.textContent()) ?? '';
    expect(text).toContain('Primary');
  });

  test('clicking the primary button is possible', async () => {
    await page.clickPrimaryBtn();
    await expect(page.primaryBtn).toBeVisible();
  });
});