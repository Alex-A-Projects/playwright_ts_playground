import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Progress Bar — start the bar, wait until it reaches the target percentage,
 * then stop it. We poll the bar's `aria-valuenow` attribute for stability.
 *
 * NOTE: in this playground the bar starts at 25% and increments roughly
 * every ~150ms. Reaching 75% therefore takes ~7-12 seconds depending on
 * browser load. We give the wait a generous 30s timeout.
 */
export class ProgressBarPage extends BasePage {
  readonly startButton: Locator;
  readonly stopButton: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    super(page);
    this.startButton = page.locator('#startButton');
    this.stopButton = page.locator('#stopButton');
    this.progressBar = page.locator('#progressBar');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.progressBar);
  }

  async start(): Promise<void> {
    await expect(this.startButton).toBeVisible();
    await this.startButton.click();
  }

  async stop(): Promise<void> {
    await expect(this.stopButton).toBeVisible();
    await this.stopButton.click();
  }

  /**
   * Read the current value (0-100) from the progress bar.
   * Falls back to scraping the text on the bar itself if aria is missing.
   */
  async getCurrentValue(): Promise<number> {
    const ariaValue = await this.progressBar.getAttribute('aria-valuenow');
    if (ariaValue !== null) {
      return Number(ariaValue);
    }
    const style = await this.progressBar.getAttribute('style');
    const match = style?.match(/width:\s*(\d+(?:\.\d+)?)%/);
    return match ? Number(match[1]) : 0;
  }

  /**
   * Start the bar, wait until it reaches `target%`, then stop it.
   * Returns the value observed at the moment of stopping.
   */
  async runUntilReached(target: number, timeoutMs: number = 180_000): Promise<number> {
    await this.start();
    try {
      await expect.poll(async () => this.getCurrentValue(), {
        timeout: timeoutMs,
        intervals: [100, 200, 500, 1000, 2000],
        message: `progress bar did not reach ${target}%`,
      }).toBeGreaterThanOrEqual(target);
    } finally {
      await this.stop();
    }
    return this.getCurrentValue();
  }
}