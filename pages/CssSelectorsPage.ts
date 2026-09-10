import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * CSS Selectors — the page contains elements locatable by id, class,
 * attribute, and combinatory selectors. We exercise three different
 * selector strategies.
 */
export class CssSelectorsPage extends BasePage {
  /** Picked by id: `#primary-btn`. */
  readonly primaryBtn: Locator;
  /** Picked by class: `.css-btn`. */
  readonly classBtn: Locator;
  /** Picked by attribute: `[data-id="primary-btn"]`. */
  readonly dataIdBtn: Locator;
  /** Visible button from the visibility section. */
  readonly visibleBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.primaryBtn = page.locator('#primary-btn');
    this.classBtn = page.locator('button.css-btn');
    this.dataIdBtn = page.locator('[data-id="primary-btn"]');
    this.visibleBtn = page.locator('#visible-btn');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.cssSelectors);
  }

  async getPrimaryBtnText(): Promise<string> {
    await expect(this.primaryBtn).toBeVisible();
    return ((await this.primaryBtn.textContent()) ?? '').trim();
  }

  async getClassBtnCount(): Promise<number> {
    return await this.classBtn.count();
  }

  async clickPrimaryBtn(): Promise<void> {
    await expect(this.primaryBtn).toBeVisible();
    await this.primaryBtn.click();
  }
}