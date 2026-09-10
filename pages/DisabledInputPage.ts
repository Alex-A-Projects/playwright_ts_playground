import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Disabled Input — `#inputField` starts enabled (it's a normal text field).
 * Clicking `#enableButton` toggles between enabled/disabled with a delay.
 *
 * Note: this playground's scenario is "wait for the field to become
 * enabled" — Playwright's auto-waiting `expect(input).toBeEnabled()`
 * handles that without explicit timeouts.
 */
export class DisabledInputPage extends BasePage {
  readonly input: Locator;
  readonly enableButton: Locator;

  constructor(page: Page) {
    super(page);
    this.input = page.locator('#inputField');
    this.enableButton = page.locator('#enableButton');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.disabledInput);
  }

  async isInputDisabled(): Promise<boolean> {
    return await this.input.isDisabled();
  }

  async clickEnableButton(): Promise<void> {
    await expect(this.enableButton).toBeVisible();
    await this.enableButton.click();
  }

  async typeIntoInput(text: string): Promise<void> {
    await this.input.fill(text);
  }

  async getInputValue(): Promise<string> {
    return await this.input.inputValue();
  }
}