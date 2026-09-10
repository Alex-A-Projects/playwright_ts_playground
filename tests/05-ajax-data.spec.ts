import { test, expect } from '@playwright/test';
import { AjaxDataPage } from '../pages/AjaxDataPage';

test.describe('AJAX Data', () => {
  let page: AjaxDataPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new AjaxDataPage(pwPage);
    await page.goto();
  });

  test('trigger button and content container render', async () => {
    await expect(page.ajaxButton).toBeVisible();
    await expect(page.content).toHaveCount(1);
  });

  test('clicking the button shows the loading spinner', async () => {
    expect(await page.spinnerIsVisible()).toBe(false);
    await page.triggerAjaxRequest();
    expect(await page.spinnerIsVisible()).toBe(true);
  });

  test('clicking the button fires an /ajaxdata request', async () => {
    const fired = await page.clickAndVerifyAjaxDataRequest();
    expect(fired).toBe(true);
  });
});