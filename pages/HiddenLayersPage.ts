import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Hidden Layers — the green button can be clicked multiple times. Per the
 * playground scenario, the green button is supposed to NOT be clickable a
 * second time (a z-index overlay blocks it). The state we exercise here
 * is that a single click works, and that an actionability check would
 * reject a second click on the same locator after the DOM is changed.
 */
export class HiddenLayersPage extends BasePage {
  readonly greenButton: Locator;

  constructor(page: Page) {
    super(page);
    this.greenButton = page.locator('#greenButton');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.hiddenLayers);
  }

  async clickGreenButton(): Promise<void> {
    await expect(this.greenButton).toBeVisible();
    await this.greenButton.click();
  }

  async isGreenButtonVisible(): Promise<boolean> {
    return await this.greenButton.isVisible();
  }
}