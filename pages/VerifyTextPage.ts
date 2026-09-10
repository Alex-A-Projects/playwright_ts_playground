import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Verify Text — find the element that displays "Welcome UserName!" using
 * `innerText` (which the browser has normalized for us). Other elements on
 * the page contain the same visible text but with leading whitespace and
 * nbsp inside HTML; `innerText` collapses both into a regular space.
 */
export class VerifyTextPage extends BasePage {
  readonly welcomeText: Locator;
  readonly warningSpans: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeText = page.locator('.bg-primary span.badge-secondary');
    this.warningSpans = page.locator('.bg-warning span.badge-secondary');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.verifyText);
  }

  async getWelcomeText(): Promise<string> {
    await expect(this.welcomeText).toBeVisible();
    return ((await this.welcomeText.innerText()) ?? '').trim();
  }

  /**
   * Verify that one of the warning example spans contains the literal
   * `&nbsp;` HTML entity — this exercises the normalize-space scenario
   * described on the page.
   */
  async warningExampleHasNbsp(): Promise<boolean> {
    const count = await this.warningSpans.count();
    if (count === 0) return false;
    const html = await this.warningSpans.first().innerHTML();
    return /&nbsp;/.test(html);
  }
}