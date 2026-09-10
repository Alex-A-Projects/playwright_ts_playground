import { test, expect } from '@playwright/test';
import { DynamicTablePage } from '../pages/DynamicTablePage';

test.describe('Dynamic Table', () => {
  let page: DynamicTablePage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new DynamicTablePage(pwPage);
    await page.goto();
  });

  test('table renders with at least one data row', async () => {
    const rows = await page.getRows();
    expect(rows.length).toBeGreaterThan(0);
  });

  test('column headers are exposed', async () => {
    const headers = await page.getColumnHeaders();
    expect(headers.length).toBeGreaterThan(0);
    expect(headers.map((h) => h.toLowerCase())).toContain('cpu');
  });

  test('warning label text contains the Chrome CPU value', async () => {
    const cpuValue = await page.getCpuValueFor('Chrome');
    const warningText = await page.getWarningText();
    expect(warningText).toContain('Chrome');
    expect(warningText).toContain(cpuValue);
  });
});