import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Client Side Delay — after clicking the button, JS runs on the client and
 * the `#content` div gets populated after a delay (up to 15s).
 */
export class ClientSideDelayPage extends BasePage {
  readonly triggerButton: Locator;
  readonly content: Locator;
  readonly spinner: Locator;

  constructor(page: Page) {
    super(page);
    this.triggerButton = page.locator('#ajaxButton');
    this.content = page.locator('#content');
    this.spinner = page.locator('#spinner');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.clientSideDelay);
  }

  async clickTrigger(): Promise<void> {
    await expect(this.triggerButton).toBeVisible();
    await this.triggerButton.click();
  }

  async waitForContent(): Promise<void> {
    // Allow up to 20 seconds for the label to appear.
    await expect(this.content).not.toBeEmpty({ timeout: 20_000 });
  }

  async getContentText(): Promise<string> {
    await this.waitForContent();
    return ((await this.content.textContent()) ?? '').trim();
  }
}