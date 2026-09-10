import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES, GEOLOCATION } from '../utils/testData';

/**
 * Geo Location — clicking `#requestLocation` invokes the Geolocation API.
 * The result is rendered in `<span id="location">` as either "Lat: …, Long: …"
 * or "unavailable". We mock the API via context permissions + coordinates
 * so the response is deterministic.
 */
export class GeoLocationPage extends BasePage {
  readonly locateButton: Locator;
  readonly locationLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.locateButton = page.locator('#requestLocation');
    this.locationLabel = page.locator('#location');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.geoLocation);
  }

  /**
   * Grant geolocation permissions and set the mocked coordinates on the
   * context before navigating to the page.
   */
  static async grantPermissions(context: import('@playwright/test').BrowserContext): Promise<void> {
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({
      latitude: GEOLOCATION.latitude,
      longitude: GEOLOCATION.longitude,
    });
  }

  async clickLocate(): Promise<void> {
    await expect(this.locateButton).toBeVisible();
    await this.locateButton.click();
  }

  async getLocationText(): Promise<string> {
    return ((await this.locationLabel.textContent()) ?? '').trim();
  }
}