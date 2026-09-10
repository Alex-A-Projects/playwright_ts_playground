import { test, expect } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';

test.describe('Frames', () => {
  let page: FramesPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new FramesPage(pwPage);
    await page.goto();
  });

  test('clicking a button in the outer frame updates its result', async () => {
    await page.clickOuterButton('Submit');
    const result = await page.getOuterResult();
    expect(result).toContain('Submit');
  });

  test('clicking a button in the nested inner frame updates its result', async () => {
    await page.clickInnerButton('Edit');
    const result = await page.getInnerResult();
    expect(result).toContain('Edit');
  });

  test('outer and inner frames have independent state', async () => {
    await page.clickOuterButton('Click me');
    await page.clickInnerButton('Primary');

    const outer = await page.getOuterResult();
    const inner = await page.getInnerResult();
    expect(outer).toContain('Click me');
    expect(inner).toContain('Primary');
  });
});