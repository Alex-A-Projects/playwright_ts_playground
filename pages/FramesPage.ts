import { FrameLocator, Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Frames — the page has an outer iframe (#frame-outer) which itself
 * contains an inner iframe (#frame-inner). Both iframes contain the same
 * four buttons (Edit, Submit, Click me, Primary) and a #result div that
 * updates with the clicked button's text.
 */
export class FramesPage extends BasePage {
  readonly outerFrame: FrameLocator;
  readonly innerFrame: FrameLocator;
  readonly outerResult: Locator;
  readonly innerResult: Locator;

  constructor(page: Page) {
    super(page);
    this.outerFrame = page.frameLocator('#frame-outer');
    this.innerFrame = this.outerFrame.frameLocator('#frame-inner');
    this.outerResult = this.outerFrame.locator('#result');
    this.innerResult = this.innerFrame.locator('#result');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.frames);
    // Give the iframes a moment to load their srcdoc content.
    await this.page.waitForTimeout(500);
  }

  /**
   * Click a button inside the outer frame, identified by its visible text.
   */
  async clickOuterButton(buttonText: string): Promise<void> {
    const btn = this.outerFrame.locator('button', { hasText: buttonText }).first();
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Click a button inside the inner frame (the nested iframe).
   */
  async clickInnerButton(buttonText: string): Promise<void> {
    const btn = this.innerFrame.locator('button', { hasText: buttonText }).first();
    await expect(btn).toBeVisible();
    await btn.click();
  }

  async getOuterResult(): Promise<string> {
    await expect(this.outerResult).toBeVisible();
    return ((await this.outerResult.textContent()) ?? '').trim();
  }

  async getInnerResult(): Promise<string> {
    await expect(this.innerResult).toBeVisible();
    return ((await this.innerResult.textContent()) ?? '').trim();
  }
}