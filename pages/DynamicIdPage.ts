import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Dynamic ID — the button's `id` attribute is generated server-side on each
 * load. The challenge: select it without using a brittle CSS selector.
 */
export class DynamicIdPage extends BasePage {
  readonly dynamicButton: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.dynamicButton = page.locator('button.btn-primary');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.dynamicId);
  }

  /**
   * Read the current button id attribute.
   */
  async getButtonId(): Promise<string> {
    await expect(this.dynamicButton).toBeVisible();
    const id = await this.dynamicButton.getAttribute('id');
    if (id === null) {
      throw new Error('Dynamic button has no id attribute');
    }
    return id;
  }

  /**
   * Click the dynamic button — Playwright auto-waits so the underlying
   * id can change between page loads without breaking the test.
   */
  async clickDynamicButton(): Promise<void> {
    await expect(this.dynamicButton).toBeVisible();
    await this.dynamicButton.click();
  }
}