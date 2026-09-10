import { test, expect } from '@playwright/test';
import { NonBreakingSpacePage } from '../pages/NonBreakingSpacePage';

test.describe('Non-Breaking Space', () => {
  let page: NonBreakingSpacePage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new NonBreakingSpacePage(pwPage);
    await page.goto();
  });

  test('button is visible', async () => {
    await expect(page.button).toBeVisible();
  });

  test('innerText preserves the nbsp character (U+00A0)', async () => {
    const text = await page.getButtonText();
    expect(text).toBe('My Button');
  });

  test('button text contains a non-breaking space character', async () => {
    expect(await page.buttonTextContainsNbsp()).toBe(true);
  });

  test('source HTML contains the &nbsp; entity', async () => {
    expect(await page.htmlContainsNbspEntity()).toBe(true);
  });

  test('clicking the button does not throw', async () => {
    await page.clickButton();
  });
});