import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Non-Breaking Space — the button's visible text uses a non-breaking
 * space (U+00A0) between "My" and "Button". `innerText` returns the
 * nbsp character verbatim; only when the value is set on a writable
 * element does the browser normalize the whitespace. The page-level
 * Xpath example on the playground uses `My Button` to match.
 */
export class NonBreakingSpacePage extends BasePage {
  readonly button: Locator;

  constructor(page: Page) {
    super(page);
    this.button = page.locator('button.btn-primary');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.nonBreakingSpace);
  }

  async getButtonText(): Promise<string> {
    await expect(this.button).toBeVisible();
    return (await this.button.innerText()) ?? '';
  }

  /**
   * Returns true if the button's text contains a non-breaking space
   * character (U+00A0).
   */
  async buttonTextContainsNbsp(): Promise<boolean> {
    const text = await this.getButtonText();
    return text.includes(' ');
  }

  /**
   * Returns true if the button's source HTML contains the literal
   * `&nbsp;` entity.
   */
  async htmlContainsNbspEntity(): Promise<boolean> {
    const html = await this.button.evaluate((el) => el.innerHTML);
    return /&nbsp;/.test(html);
  }

  async clickButton(): Promise<void> {
    await expect(this.button).toBeVisible();
    await this.button.click();
  }
}