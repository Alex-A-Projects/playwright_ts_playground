import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Overlapped Element — the input is partially hidden under the page header.
 * Scrolling the input into view alone doesn't help; we have to scroll its
 * container (the page) so the input is fully visible.
 */
export class OverlappedElementPage extends BasePage {
  readonly nameInput: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('#name');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.overlappedElement);
  }

  /**
   * Type into the input after scrolling its container so the element is
   * fully visible above the sticky header.
   */
  async typeName(text: string): Promise<void> {
    await expect(this.nameInput).toBeAttached();
    await this.nameInput.scrollIntoViewIfNeeded();
    // Force the input into the top of the viewport to escape the header overlay.
    await this.nameInput.evaluate((el) => {
      el.scrollIntoView({ block: 'center' });
    });
    await this.nameInput.fill(text);
  }

  async getNameValue(): Promise<string> {
    return await this.nameInput.inputValue();
  }
}