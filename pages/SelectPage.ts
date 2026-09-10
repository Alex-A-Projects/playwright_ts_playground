import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Select — the playground exposes five select controls that exercise
 * different selection strategies:
 *   - #selectLanguage  — single-select
 *   - #selectCity      — options contain non-breaking spaces
 *   - #selectProduct   — select by value
 *   - #selectColors    — multi-select
 *   - #selectFruits    — multi-select with pre-selected options
 *
 * Each has its own `#statusXxx` label, and there's an overall summary in
 * `#opstatus`.
 */
export class SelectPage extends BasePage {
  readonly languageSelect: Locator;
  readonly citySelect: Locator;
  readonly productSelect: Locator;
  readonly colorsSelect: Locator;
  readonly fruitsSelect: Locator;
  readonly opStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.languageSelect = page.locator('#selectLanguage');
    this.citySelect = page.locator('#selectCity');
    this.productSelect = page.locator('#selectProduct');
    this.colorsSelect = page.locator('#selectColors');
    this.fruitsSelect = page.locator('#selectFruits');
    this.opStatus = page.locator('#opstatus');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.select);
  }

  async selectByValue(select: Locator, value: string): Promise<void> {
    await expect(select).toBeVisible();
    await select.selectOption(value);
  }

  async selectByLabel(select: Locator, label: string): Promise<void> {
    await expect(select).toBeVisible();
    await select.selectOption({ label });
  }

  async getSelectedValue(select: Locator): Promise<string> {
    return await select.inputValue();
  }

  /**
   * Get the displayed text of the currently-selected option.
   * For multi-selects the result is the visible label of the last selection.
   */
  async getSelectedText(select: Locator): Promise<string> {
    const value = await this.getSelectedValue(select);
    const optionText = await select.locator(`option[value="${value}"]`).textContent();
    return (optionText ?? '').replace(/ /g, ' ').trim();
  }

  async getAvailableValues(select: Locator): Promise<string[]> {
    return await select.locator('option').evaluateAll((opts) =>
      opts.map((o) => (o as HTMLOptionElement).value).filter(Boolean),
    );
  }

  async getOpStatus(): Promise<string> {
    return ((await this.opStatus.textContent()) ?? '').trim();
  }
}