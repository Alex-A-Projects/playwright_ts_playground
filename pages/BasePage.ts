import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — common functionality shared by every page object in this suite.
 * All section-specific page objects extend this class so they get the same
 * navigation helpers and assertion shortcuts for free.
 */
export class BasePage {
  readonly page: Page;
  readonly baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'http://uitestingplayground.com';
  }

  /**
   * Navigate to a relative path under the playground root.
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(`${this.baseURL}${path}`, {
      waitUntil: 'domcontentloaded',
    });
  }

  /**
   * Get the page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for a locator to be visible.
   */
  async waitForVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Get text content of a locator.
   */
  async getText(locator: Locator): Promise<string> {
    await expect(locator).toBeVisible();
    return (await locator.textContent()) ?? '';
  }

  /**
   * Click an element with retry safety.
   */
  async click(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  /**
   * Take a screenshot, naming it after the current spec.
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Convenience wrapper around Playwright's waitForTimeout — exposed here
   * so page-object callers don't need to drill through to the underlying
   * Playwright Page instance.
   */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}