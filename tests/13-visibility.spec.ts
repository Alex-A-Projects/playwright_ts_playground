import { test, expect } from '@playwright/test';
import { VisibilityPage } from '../pages/VisibilityPage';

test.describe('Visibility', () => {
  let page: VisibilityPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new VisibilityPage(pwPage);
    await page.goto();
  });

  test('hide button is visible on load', async () => {
    await expect(page.hideButton).toBeVisible();
  });

  test('clicking hide removes the "removed" button from the DOM', async () => {
    await page.clickHide();
    await page.wait(200);
    expect(await page.isRemoved()).toBe(false);
  });

  test('visibility:hidden and display:none buttons are not visible to Playwright', async () => {
    await page.clickHide();
    await page.wait(200);

    // display:none → not in the layout at all
    expect(await page.isDisplayNone()).toBe(false);

    // visibility:hidden → occupies space but Playwright treats as not visible
    expect(await page.isInvisible()).toBe(false);
  });

  test('zero-width button has zero pixel width', async () => {
    await page.clickHide();
    await page.wait(200);
    expect(await page.isZeroWidth()).toBe(false);
  });
});