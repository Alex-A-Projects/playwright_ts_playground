import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Scroll to Click — four buttons require different scrolling strategies:
 *   1. #scrollTarget1 — page scroll
 *   2. #scrollTarget2 — container scroll inside #scrollContainer2
 *   3. #scrollTarget3 — nested scroll inside #outerScroll3 > #innerScroll3
 *   4. #scrollTarget4 — hidden until hover on its parent row
 *
 * Each button turns green and reads "Clicked!" once clicked, and the
 * progress label (`#progressText`) advances toward "4 / 4".
 */
export class ScrollToClickPage extends BasePage {
  readonly target1: Locator;
  readonly target2: Locator;
  readonly target3: Locator;
  readonly target4: Locator;
  readonly targetRow4: Locator;
  readonly progressText: Locator;
  readonly container2: Locator;
  readonly outerScroll3: Locator;
  readonly innerScroll3: Locator;

  constructor(page: Page) {
    super(page);
    this.target1 = page.locator('#scrollTarget1');
    this.target2 = page.locator('#scrollTarget2');
    this.target3 = page.locator('#scrollTarget3');
    this.target4 = page.locator('#scrollTarget4');
    this.targetRow4 = page.locator('#targetRow4');
    this.progressText = page.locator('#progressText');
    this.container2 = page.locator('#scrollContainer2');
    this.outerScroll3 = page.locator('#outerScroll3');
    this.innerScroll3 = page.locator('#innerScroll3');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.scrollToClick);
  }

  async clickTarget1(): Promise<void> {
    await this.target1.scrollIntoViewIfNeeded();
    await this.target1.click();
  }

  async clickTarget2(): Promise<void> {
    await expect(this.target2).toBeAttached();
    await this.target2.scrollIntoViewIfNeeded();
    await this.target2.click();
  }

  async clickTarget3(): Promise<void> {
    // Scroll the outer container to reveal the inner one.
    await this.outerScroll3.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    await this.target3.scrollIntoViewIfNeeded();
    await this.target3.click();
  }

  async clickTarget4(): Promise<void> {
    await this.targetRow4.hover();
    await expect(this.target4).toBeVisible();
    await this.target4.click();
  }

  /**
   * Click all four buttons in sequence.
   */
  async clickAllTargets(): Promise<void> {
    await this.clickTarget1();
    await this.clickTarget2();
    await this.clickTarget3();
    await this.clickTarget4();
  }

  async getProgressText(): Promise<string> {
    return ((await this.progressText.textContent()) ?? '').trim();
  }

  async getClickedCount(): Promise<number> {
    const text = await this.getProgressText();
    // Two valid formats:
    //   "Buttons clicked: 1 / 4"   (during the challenge)
    //   "All buttons clicked!"      (final state)
    const m = text.match(/(\d+)\s*\/\s*\d+/);
    if (m) return Number(m[1]);
    if (/all\s+buttons\s+clicked/i.test(text)) {
      // The denominator isn't in this text; we know the total is 4.
      const totalMatch = text.match(/\/\s*(\d+)/);
      return totalMatch ? Number(totalMatch[1]) : 4;
    }
    return 0;
  }
}