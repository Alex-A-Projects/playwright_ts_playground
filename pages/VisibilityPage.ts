import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Visibility — eight buttons, each hidden by a different CSS technique:
 *   1. removedButton     — removed from the DOM after Hide is clicked
 *   2. zeroWidthButton   — width: 0
 *   3. overlappedButton  — covered by another element
 *   4. transparentButton — opacity: 0
 *   5. invisibleButton   — visibility: hidden
 *   6. notdisplayedButton — display: none
 *   7. offscreenButton   — position: absolute far off-screen
 */
export class VisibilityPage extends BasePage {
  readonly hideButton: Locator;
  readonly removedButton: Locator;
  readonly zeroWidthButton: Locator;
  readonly overlappedButton: Locator;
  readonly transparentButton: Locator;
  readonly invisibleButton: Locator;
  readonly displayNoneButton: Locator;
  readonly offscreenButton: Locator;

  constructor(page: Page) {
    super(page);
    this.hideButton = page.locator('#hideButton');
    this.removedButton = page.locator('#removedButton');
    this.zeroWidthButton = page.locator('#zeroWidthButton');
    this.overlappedButton = page.locator('#overlappedButton');
    this.transparentButton = page.locator('#transparentButton');
    this.invisibleButton = page.locator('#invisibleButton');
    this.displayNoneButton = page.locator('#notdisplayedButton');
    this.offscreenButton = page.locator('#offscreenButton');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.visibility);
  }

  async clickHide(): Promise<void> {
    await expect(this.hideButton).toBeVisible();
    await this.hideButton.click();
  }

  async isRemoved(): Promise<boolean> {
    return (await this.removedButton.count()) > 0;
  }

  async isZeroWidth(): Promise<boolean> {
    if ((await this.zeroWidthButton.count()) === 0) return false;
    const box = await this.zeroWidthButton.boundingBox();
    return !!box && box.width > 0;
  }

  async isDisplayNone(): Promise<boolean> {
    if ((await this.displayNoneButton.count()) === 0) return false;
    return await this.displayNoneButton.isVisible();
  }

  async isInvisible(): Promise<boolean> {
    if ((await this.invisibleButton.count()) === 0) return false;
    return await this.invisibleButton.isVisible();
  }

  async isTransparent(): Promise<boolean> {
    if ((await this.transparentButton.count()) === 0) return false;
    return await this.transparentButton.isVisible();
  }

  async isOverlapped(): Promise<boolean> {
    if ((await this.overlappedButton.count()) === 0) return false;
    return await this.overlappedButton.isVisible();
  }

  async isOffscreen(): Promise<boolean> {
    if ((await this.offscreenButton.count()) === 0) return false;
    return await this.offscreenButton.isVisible();
  }
}