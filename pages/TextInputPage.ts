import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Text Input — the button label is updated to match whatever the user types.
 */
export class TextInputPage extends BasePage {
  readonly input: Locator;
  readonly button: Locator;

  constructor(page: Page) {
    super(page);
    this.input = page.locator('#newButtonName');
    this.button = page.locator('#updatingButton');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.textInput);
  }

  async setInputValue(text: string): Promise<void> {
    await expect(this.input).toBeVisible();
    await this.input.fill(text);
  }

  async clickButton(): Promise<void> {
    await expect(this.button).toBeVisible();
    await this.button.click();
  }

  async getButtonText(): Promise<string> {
    await expect(this.button).toBeVisible();
    return (await this.button.textContent()) ?? '';
  }

  /**
   * Convenience helper — fill input then click the button.
   */
  async setNameAndClick(name: string): Promise<string> {
    await this.setInputValue(name);
    await this.clickButton();
    return this.getButtonText();
  }
}