import { test, expect } from '@playwright/test';
import { OverlappedElementPage } from '../pages/OverlappedElementPage';

test.describe('Overlapped Element', () => {
  let page: OverlappedElementPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new OverlappedElementPage(pwPage);
    await page.goto();
  });

  test('input is present in the DOM', async () => {
    await expect(page.nameInput).toBeAttached();
  });

  test('typing into the input after scrolling works', async () => {
    const value = 'Alex';
    await page.typeName(value);
    expect(await page.getNameValue()).toBe(value);
  });
});