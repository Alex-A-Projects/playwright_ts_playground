import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Scrollbars — the target button sits inside a horizontally- and
 * vertically-scrollable container. We must scroll the container until the
 * button is visible, then click it.
 */
export class ScrollbarsPage extends BasePage {
  readonly scrollableContainer: Locator;
  readonly hiddenButton: Locator;

  constructor(page: Page) {
    super(page);
    this.scrollableContainer = page.locator('.container > div[style*="overflow"]');
    this.hiddenButton = page.locator('#hidingButton');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.scrollbars);
  }

  /**
   * Scroll the button into view inside the scrollable container.
   */
  async scrollButtonIntoView(): Promise<void> {
    await expect(this.hiddenButton).toBeAttached();
    await this.hiddenButton.scrollIntoViewIfNeeded();
  }

  async clickButton(): Promise<void> {
    await this.scrollButtonIntoView();
    await expect(this.hiddenButton).toBeVisible();
    await this.hiddenButton.click();
  }

  async isButtonVisible(): Promise<boolean> {
    return await this.hiddenButton.isVisible();
  }
}