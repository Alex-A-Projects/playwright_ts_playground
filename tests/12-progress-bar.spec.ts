import { test, expect } from '@playwright/test';
import { ProgressBarPage } from '../pages/ProgressBarPage';

test.describe('Progress Bar', () => {
  let page: ProgressBarPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new ProgressBarPage(pwPage);
    await page.goto();
  });

  test('start and stop buttons render', async () => {
    await expect(page.startButton).toBeVisible();
    await expect(page.stopButton).toBeVisible();
  });

  test('progress bar advances after Start, then stops on Stop', async () => {
    // The bar starts at 25%. After clicking Start, the value should
    // increase over time. We don't pin to an exact value because the
    // page uses a random setTimeout delay (0-500ms) and headless tabs
    // can be throttled.
    const initial = await page.getCurrentValue();
    expect(initial).toBeGreaterThan(0);

    await page.start();

    // Verify the bar is animating — within 10s the value must have
    // strictly increased at least once.
    await expect
      .poll(async () => page.getCurrentValue(), {
        timeout: 10_000,
        intervals: [200, 500, 1000],
        message: 'progress bar did not start advancing',
      })
      .toBeGreaterThan(initial);

    const peakValue = await page.getCurrentValue();
    await page.stop();

    // After stopping, the value should not jump further (within a small
    // window to allow the last setTimeout to fire).
    await page.wait(200);
    const stoppedValue = await page.getCurrentValue();
    // Stopped value is at least the peak — it might be one tick higher.
    expect(stoppedValue).toBeGreaterThanOrEqual(peakValue);
    expect(stoppedValue).toBeLessThan(100);
  });
});