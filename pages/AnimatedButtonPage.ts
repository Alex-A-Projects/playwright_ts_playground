import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Animated Button — the page has two buttons:
 *   - Start Animation (#animationButton) — kicks off a CSS animation
 *   - Moving Target   (#movingTarget)   — is animated for 3 seconds
 *
 * Scenario: click Start, wait for the animation to end, then click the
 * Moving Target. The status label prints whether the target's class
 * contains 'spin' at the time it was clicked (it shouldn't, after the
 * animation ends).
 */
export class AnimatedButtonPage extends BasePage {
  readonly startButton: Locator;
  readonly movingTarget: Locator;
  readonly statusLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.startButton = page.locator('#animationButton');
    this.movingTarget = page.locator('#movingTarget');
    this.statusLabel = page.locator('#opstatus');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.animatedButton);
  }

  async clickStart(): Promise<void> {
    await expect(this.startButton).toBeVisible();
    await this.startButton.click();
  }

  /**
   * Wait until the Moving Target button no longer carries the 'spin'
   * class — i.e. the animation has ended.
   */
  async waitForAnimationToEnd(): Promise<void> {
    await expect(async () => {
      const cls = (await this.movingTarget.getAttribute('class')) ?? '';
      expect(cls).not.toContain('spin');
    }).toPass({ timeout: 10_000, intervals: [200, 500] });
  }

  async clickMovingTarget(): Promise<void> {
    await this.waitForAnimationToEnd();
    await expect(this.movingTarget).toBeVisible();
    await this.movingTarget.click();
  }

  async getStatusLabelText(): Promise<string> {
    return ((await this.statusLabel.textContent()) ?? '').trim();
  }

  async getMovingTargetClass(): Promise<string> {
    return (await this.movingTarget.getAttribute('class')) ?? '';
  }
}