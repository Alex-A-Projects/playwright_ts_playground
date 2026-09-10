import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Alerts — three buttons each open a different native dialog:
 *   - Alert   → alert()
 *   - Confirm → confirm() (returns true/false)
 *   - Prompt  → prompt()  (returns the typed text)
 */
export class AlertsPage extends BasePage {
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;

  constructor(page: Page) {
    super(page);
    this.alertButton = page.locator('#alertButton');
    this.confirmButton = page.locator('#confirmButton');
    this.promptButton = page.locator('#promptButton');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.alerts);
  }

  async triggerAlert(): Promise<string> {
    let text = '';
    this.page.once('dialog', async (dialog) => {
      text = dialog.message();
      await dialog.accept();
    });
    await expect(this.alertButton).toBeVisible();
    await this.alertButton.click();
    await this.page.waitForTimeout(200);
    return text;
  }

  async triggerConfirm(accept: boolean): Promise<string> {
    let text = '';
    this.page.once('dialog', async (dialog) => {
      text = dialog.message();
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    await expect(this.confirmButton).toBeVisible();
    await this.confirmButton.click();
    await this.page.waitForTimeout(200);
    return text;
  }

  async triggerPrompt(input: string): Promise<string> {
    let text = '';
    this.page.once('dialog', async (dialog) => {
      text = dialog.message();
      if (dialog.type() === 'prompt') {
        await dialog.accept(input);
      } else {
        await dialog.accept();
      }
    });
    await expect(this.promptButton).toBeVisible();
    await this.promptButton.click();
    await this.page.waitForTimeout(200);
    return text;
  }
}