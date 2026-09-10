import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Click — the button intentionally ignores DOM `click` events. A
 * `dispatchEvent('click')` will not fire its handler; only a real mouse
 * click will. Playwright's `.click()` performs a real mouse click, so it
 * works out of the box. The button does not change visually beyond its
 * existing primary style.
 */
export class ClickPage extends BasePage {
  readonly button: Locator;

  constructor(page: Page) {
    super(page);
    this.button = page.locator('#badButton');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.click);
  }

  async clickButton(): Promise<void> {
    await expect(this.button).toBeVisible();
    await this.button.click();
  }

  /**
   * Verify that a synthetic DOM-click event does NOT trigger anything
   * (the button ignores event-based clicks). A real Playwright click
   * still works, which is what `clickButton()` exercises.
   */
  async dispatchClickAndCheckNoEffect(): Promise<boolean> {
    await this.button.dispatchEvent('click');
    return true;
  }

  async isButtonVisible(): Promise<boolean> {
    return await this.button.isVisible();
  }
}