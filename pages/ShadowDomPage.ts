import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Shadow DOM — the page contains a `<guid-generator>` web component
 * whose internals are hidden inside a shadow root. Playwright pierces
 * open shadow roots automatically, so chained locators just work.
 *
 * Layout inside the shadow root:
 *   <input id="editField">     ← editable text field (a GUID)
 *   <button id="buttonGenerate"><i class="fa fa-cog"></i></button>
 *   <button id="buttonCopy"><i class="fa fa-clone"></i></button>
 */
export class ShadowDomPage extends BasePage {
  readonly shadowHost: Locator;
  readonly inputInShadow: Locator;
  readonly generateButton: Locator;
  readonly copyButton: Locator;

  constructor(page: Page) {
    super(page);
    this.shadowHost = page.locator('guid-generator');
    this.inputInShadow = page.locator('guid-generator #editField');
    this.generateButton = page.locator('guid-generator #buttonGenerate');
    this.copyButton = page.locator('guid-generator #buttonCopy');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.shadowDom);
  }

  async getInputValue(): Promise<string> {
    await expect(this.inputInShadow).toBeAttached();
    return await this.inputInShadow.inputValue();
  }

  async setInputValue(value: string): Promise<void> {
    await this.inputInShadow.fill(value);
  }

  async clickGenerate(): Promise<void> {
    await expect(this.generateButton).toBeVisible();
    await this.generateButton.click();
  }

  async clickCopy(): Promise<void> {
    await expect(this.copyButton).toBeVisible();
    await this.copyButton.click();
  }
}