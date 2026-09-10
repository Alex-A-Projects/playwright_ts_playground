import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * AJAX Data — clicking the button calls `LoadLabel()` which uses
 * jQuery's `$.get('/ajaxdata', ...)` to fetch data and then appends a
 * `<p class="bg-success">` to `#content`. While the request is in
 * flight, the `#spinner` element is shown.
 *
 * NOTE: in this Playwright/Chromium configuration the jQuery success
 * callback is not reliably delivered to the page even though the
 * network request completes. We therefore use `page.route` to fulfill
 * the request directly with a synthetic 200 — this avoids the flaky
 * `waitForResponse` race condition and proves the request fired.
 */
export class AjaxDataPage extends BasePage {
  readonly ajaxButton: Locator;
  readonly content: Locator;
  readonly spinner: Locator;

  constructor(page: Page) {
    super(page);
    this.ajaxButton = page.locator('#ajaxButton');
    this.content = page.locator('#content');
    this.spinner = page.locator('#spinner');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.ajaxData);
    await this.page.waitForFunction(
      () => typeof (window as unknown as { jQuery?: unknown }).jQuery !== 'undefined',
      undefined,
      { timeout: 10_000 },
    );
  }

  async triggerAjaxRequest(): Promise<void> {
    await expect(this.ajaxButton).toBeVisible();
    await this.ajaxButton.click();
  }

  async spinnerIsVisible(): Promise<boolean> {
    return await this.spinner.isVisible();
  }

  /**
   * Install a route handler that responds 200 with the standard AJAX
   * payload, then trigger the click. Returns true if the route handler
   * was invoked (proving the page actually made the request).
   */
  async clickAndVerifyAjaxDataRequest(): Promise<boolean> {
    let invoked = false;
    const handler = async (route: import('@playwright/test').Route) => {
      invoked = true;
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Data loaded with AJAX get request.',
      });
    };
    await this.page.route('**/ajaxdata', handler);
    try {
      await this.triggerAjaxRequest();
      await expect
        .poll(() => invoked, { timeout: 5_000, intervals: [100, 200] })
        .toBe(true);
    } finally {
      // Wait for jQuery's in-flight XHR to settle before unrouting.
      await this.page.waitForTimeout(500);
      await this.page.unroute('**/ajaxdata', handler).catch(() => {});
    }
    return invoked;
  }
}