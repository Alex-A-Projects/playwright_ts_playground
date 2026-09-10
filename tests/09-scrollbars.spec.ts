import { test, expect } from '@playwright/test';
import { ScrollbarsPage } from '../pages/ScrollbarsPage';

test.describe('Scrollbars', () => {
  let page: ScrollbarsPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new ScrollbarsPage(pwPage);
    await page.goto();
  });

  test('the button is present in the DOM', async () => {
    await expect(page.hiddenButton).toBeAttached();
  });

  test('scrolling brings the button into view and clicking succeeds', async () => {
    await page.scrollButtonIntoView();
    await expect(page.hiddenButton).toBeVisible();
    await page.clickButton();
    await expect(page.hiddenButton).toBeVisible();
  });
});