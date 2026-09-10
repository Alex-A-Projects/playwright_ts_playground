import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Class Attribute — the page renders three buttons whose class attribute
 * contains spaces and other complications for CSS class selectors. The
 * `btn-primary` button (the third in DOM order) is the one that should be
 * clicked per the playground scenario.
 */
export class ClassAttributePage extends BasePage {
  readonly primaryButton: Locator;
  readonly successButton: Locator;
  readonly warningButton: Locator;

  constructor(page: Page) {
    super(page);
    // Each button has the same visible text "Button"; we have to scope by class.
    this.primaryButton = page.locator('button.btn-primary');
    this.successButton = page.locator('button.btn-success');
    this.warningButton = page.locator('button.btn-warning');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.classAttribute);
  }

  /**
   * Click the btn-primary button and return the alert dialog text.
   */
  async clickPrimaryAndGetAlertText(): Promise<string> {
    let alertText = '';
    this.page.once('dialog', async (dialog) => {
      alertText = dialog.message();
      await dialog.dismiss();
    });
    await expect(this.primaryButton).toBeVisible();
    await this.primaryButton.click();
    await this.page.waitForTimeout(200);
    return alertText;
  }

  async getButtonClasses(button: Locator): Promise<string[]> {
    await expect(button).toBeVisible();
    const classAttr = await button.getAttribute('class');
    return (classAttr ?? '').split(/\s+/).filter(Boolean);
  }
}