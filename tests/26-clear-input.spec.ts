import { test, expect } from '@playwright/test';
import { ClearInputPage } from '../pages/ClearInputPage';

test.describe('Clear Input', () => {
  let page: ClearInputPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new ClearInputPage(pwPage);
    await page.goto();
  });

  test('page renders with all target fields pre-filled', async () => {
    const count = await page.getTargetCount();
    expect(count).toBeGreaterThan(0);
    const remaining = await page.getRemainingCount();
    expect(remaining).toBe(count);
  });

  test('clearing a single input removes its text', async () => {
    const count = await page.getTargetCount();
    await page.clearAt(0);
    await page.wait(100);
    const remaining = await page.getRemainingCount();
    expect(remaining).toBe(count - 1);
  });

  test('clearing every input leaves zero non-empty fields', async () => {
    await page.clearAll();
    await page.wait(200);
    expect(await page.getRemainingCount()).toBe(0);
  });
});