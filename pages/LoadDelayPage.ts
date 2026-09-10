import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Load Delay — the button is injected into the DOM after a delay.
 * Playwright's auto-waiting actionability checks handle this without
 * any explicit waits in the test.
 */
export class LoadDelayPage extends BasePage {
  readonly button: Locator;

  constructor(page: Page) {
    super(page);
    this.button = page.locator('.btn-primary');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.loadDelay);
  }

  async clickButton(): Promise<void> {
    await expect(this.button).toBeVisible({ timeout: 15_000 });
    await this.button.click();
  }

  async isButtonPresent(): Promise<boolean> {
    return (await this.button.count()) > 0;
  }
}