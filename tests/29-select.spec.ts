import { test, expect } from '@playwright/test';
import { SelectPage } from '../pages/SelectPage';

test.describe('Select', () => {
  let page: SelectPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new SelectPage(pwPage);
    await page.goto();
  });

  test('all five selects render', async () => {
    await expect(page.languageSelect).toBeVisible();
    await expect(page.citySelect).toBeVisible();
    await expect(page.productSelect).toBeVisible();
    await expect(page.colorsSelect).toBeVisible();
    await expect(page.fruitsSelect).toBeVisible();
  });

  test('selecting a language option updates its value', async () => {
    const values = await page.getAvailableValues(page.languageSelect);
    const target = values[0]; // first non-empty value (skip "Please select")
    await page.selectByValue(page.languageSelect, target);
    expect(await page.getSelectedValue(page.languageSelect)).toBe(target);
  });

  test('selecting by label works for the product select', async () => {
    await page.selectByLabel(page.productSelect, 'Release 1.0');
    expect(await page.getSelectedValue(page.productSelect)).toBe('v1.0');
  });

  test('multi-select fruits has pre-selected options', async () => {
    const selectedTexts = await page.fruitsSelect
      .locator('option:checked')
      .allTextContents();
    expect(selectedTexts.length).toBeGreaterThan(0);
  });

  test('overall status reflects selected fruits by default', async () => {
    const status = await page.getOpStatus();
    expect(status.length).toBeGreaterThan(0);
  });
});