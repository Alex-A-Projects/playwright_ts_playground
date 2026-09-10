import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Clear Input — the page contains eight pre-filled inputs and one
 * contenteditable div, all sharing the `.clear-target` class. The
 * `#opstatus` label counts how many fields still have text.
 */
export class ClearInputPage extends BasePage {
  readonly targets: Locator;
  readonly statusLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.targets = page.locator('.clear-target');
    this.statusLabel = page.locator('#opstatus');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.clearInput);
  }

  /**
   * Clear a single target field by index.
   * For contenteditable divs we use the keyboard (Ctrl/Cmd+A, Delete)
   * so the page's `oninput` handler fires and the status counter updates.
   */
  async clearAt(index: number): Promise<void> {
    const target = this.targets.nth(index);
    await expect(target).toBeVisible();
    await target.click();
    const isMac = process.platform === 'darwin';
    await this.page.keyboard.press(isMac ? 'Meta+A' : 'Control+A');
    await this.page.keyboard.press('Delete');
  }

  /**
   * Clear every `.clear-target` field on the page.
   */
  async clearAll(): Promise<void> {
    const count = await this.targets.count();
    for (let i = 0; i < count; i++) {
      await this.clearAt(i);
    }
  }

  async getStatusText(): Promise<string> {
    await expect(this.statusLabel).toBeVisible();
    return ((await this.statusLabel.textContent()) ?? '').trim();
  }

  /**
   * Parse the "Non-empty fields remaining: N" status into a number.
   */
  async getRemainingCount(): Promise<number> {
    const text = await this.getStatusText();
    const m = text.match(/(\d+)/);
    return m ? Number(m[1]) : 0;
  }

  async getTargetCount(): Promise<number> {
    return await this.targets.count();
  }
}