import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Dynamic Table — the page uses ARIA-based divs rather than a <table>
 * element. Rows are `<div role="row">`, columns are `<span role="cell">`,
 * and column order is randomized per reload.
 *
 * Scenario: for the "Chrome" process, return its CPU load and compare with
 * the yellow label that reads "Chrome CPU: <value>".
 */
export class DynamicTablePage extends BasePage {
  readonly table: Locator;
  readonly rows: Locator;
  readonly warning: Locator;

  constructor(page: Page) {
    super(page);
    this.table = page.locator('[role="table"]');
    this.rows = page.locator('[role="table"] [role="row"]');
    this.warning = page.locator('p.bg-warning');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.dynamicTable);
  }

  /**
   * Return all header texts in order, so the test can pick the
   * "CPU" column index dynamically.
   */
  async getColumnHeaders(): Promise<string[]> {
    await expect(this.table).toBeVisible();
    const headerRow = this.rows.first();
    const headers = await headerRow.locator('[role="columnheader"]').allTextContents();
    return headers.map((h) => h.trim());
  }

  /**
   * Return all row data as [[col1, col2, ...], ...]. First row is skipped
   * because it contains headers.
   */
  async getRows(): Promise<string[][]> {
    await expect(this.table).toBeVisible();
    const allRows = await this.rows.count();
    const data: string[][] = [];
    for (let i = 1; i < allRows; i++) {
      const cells = await this.rows.nth(i).locator('[role="cell"]').allTextContents();
      data.push(cells.map((c) => c.trim()));
    }
    return data;
  }

  /**
   * Get the CPU value for a given process name (e.g. "Chrome").
   */
  async getCpuValueFor(name: string): Promise<string> {
    const headers = await this.getColumnHeaders();
    const rows = await this.getRows();
    const cpuIdx = headers.findIndex((h) => h.toLowerCase() === 'cpu');
    if (cpuIdx < 0) {
      throw new Error('No CPU column found');
    }
    for (const row of rows) {
      if (row[0] === name) {
        return row[cpuIdx];
      }
    }
    throw new Error(`No row found for "${name}"`);
  }

  /**
   * Read the yellow warning label text (e.g. "Chrome CPU: 7.2%").
   */
  async getWarningText(): Promise<string> {
    await expect(this.warning).toBeVisible();
    return ((await this.warning.textContent()) ?? '').trim();
  }
}