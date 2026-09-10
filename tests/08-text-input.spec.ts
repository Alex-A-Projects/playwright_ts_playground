import { test, expect } from '@playwright/test';
import { TextInputPage } from '../pages/TextInputPage';

test.describe('Text Input', () => {
  let page: TextInputPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new TextInputPage(pwPage);
    await page.goto();
  });

  test('button label changes to the typed value', async () => {
    const newLabel = 'Playwright is Awesome';
    const result = await page.setNameAndClick(newLabel);
    expect(result.trim()).toBe(newLabel);
  });

  test('different inputs produce different labels', async () => {
    const first = await page.setNameAndClick('First');
    expect(first.trim()).toBe('First');
    await page.setInputValue('Second');
    await page.clickButton();
    const second = await page.getButtonText();
    expect(second.trim()).toBe('Second');
  });
});