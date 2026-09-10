import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Auto Wait — verifies that Playwright's auto-waiting actionability checks
 * wait for the target element to be visible, stable, and clickable before
 * the click is dispatched. The page contains a button covered by a loader
 * that disappears after 2 seconds.
 */
export class AutoWaitPage extends BasePage {
  readonly targetButton: Locator;
  readonly statusLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.targetButton = page.locator('#target');
    this.statusLabel = page.locator('#spinner');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.autoWait);
  }

  /**
   * Click the target button — Playwright auto-waits for the spinner to go
   * away before clicking.
   */
  async clickTarget(): Promise<void> {
    await this.targetButton.click({ timeout: 15_000 });
  }

  async isTargetVisible(): Promise<boolean> {
    return await this.targetButton.isVisible();
  }

  async isTargetEnabled(): Promise<boolean> {
    return await this.targetButton.isEnabled();
  }

  async getStatusLabelText(): Promise<string> {
    return (await this.statusLabel.textContent()) ?? '';
  }
}