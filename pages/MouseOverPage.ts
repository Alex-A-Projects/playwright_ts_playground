import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/testData';

/**
 * Mouse Over — `linkActive(this)` fires on `mouseenter` and replaces the
 * original `<a title="Click me">` with `<a title="Active Link">` whose
 * `onclick` calls `linkClicked(this)` and increments `#clickCount`.
 *
 * `linkInactive(this)` fires on `mouseleave` and puts the link back to
 * its original "Click me" state.
 *
 * Approach:
 *   - Activate by calling `linkActive` directly via `page.evaluate`
 *     (synthetic `dispatchEvent('mouseenter')` doesn't reliably fire
 *     inline `onmouseenter` handlers).
 *   - Click the Active Link with a real mouse click.
 *   - Reset by moving the mouse cursor far away — this fires a real
 *     `mouseleave` on the Active Link and triggers `linkInactive`,
 *     which swaps the link back to `<a title="Click me">`.
 */
declare global {
  interface Window {
    linkActive?: (el: HTMLElement) => void;
    linkInactive?: (el: HTMLElement) => void;
    linkClicked?: (el: HTMLElement) => void;
  }
}

export class MouseOverPage extends BasePage {
  readonly counter: Locator;

  constructor(page: Page) {
    super(page);
    this.counter = page.locator('#clickCount');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.mouseOver);
  }

  /**
   * Click the "Click me" link `count` times.
   */
  async clickOriginalLink(pwPage: Page, count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      // 1) Activate: linkActive replaces the link with the Active Link.
      await pwPage.evaluate(() => {
        const el = document.querySelector('a[title="Click me"]') as HTMLElement | null;
        if (el && typeof window.linkActive === 'function') {
          window.linkActive(el);
        }
      });

      const active = pwPage.locator('a[title="Active Link"]');
      await expect(active).toHaveCount(1);

      // 2) Click the Active Link — increments the counter.
      await active.click();

      // 3) Reset for the next iteration: move the mouse far away so a
      //    real `mouseleave` fires on the link, invoking `linkInactive`
      //    and swapping back to `<a title="Click me">`.
      if (i < count - 1) {
        await pwPage.mouse.move(0, 0);
        await expect(pwPage.locator('a[title="Click me"]')).toHaveCount(1);
      }
    }
  }

  async getClickCount(): Promise<number> {
    await expect(this.counter).toBeVisible();
    const text = (await this.counter.textContent()) ?? '0';
    return Number(text.replace(/[^0-9]/g, '') || '0');
  }
}