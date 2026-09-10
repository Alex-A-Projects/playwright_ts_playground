import { test, expect } from '@playwright/test';
import { AnimatedButtonPage } from '../pages/AnimatedButtonPage';

test.describe('Animated Button', () => {
  let page: AnimatedButtonPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new AnimatedButtonPage(pwPage);
    await page.goto();
  });

  test('both buttons render on load', async () => {
    await expect(page.startButton).toBeVisible();
    await expect(page.movingTarget).toBeVisible();
  });

  test('clicking start button starts the animation', async () => {
    await page.clickStart();
    // Immediately after clicking, the class should contain 'spin'.
    const cls = await page.getMovingTargetClass();
    expect(cls).toContain('spin');
  });

  test('clicking the moving target after the animation works', async () => {
    await page.clickStart();
    await page.clickMovingTarget();
    await expect(page.movingTarget).toBeVisible();
  });
});