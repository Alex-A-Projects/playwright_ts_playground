import { test, expect } from '@playwright/test';
import { GeoLocationPage } from '../pages/GeoLocationPage';
import { GEOLOCATION } from '../utils/testData';

test.describe('Geo Location', () => {
  test.beforeEach(async ({ context }) => {
    await GeoLocationPage.grantPermissions(context);
  });

  test('clicking the button updates the location label', async ({ page: pwPage }) => {
    const page = new GeoLocationPage(pwPage);
    await page.goto();
    await expect(page.locateButton).toBeVisible();

    const initial = await page.getLocationText();
    expect(initial).toBe('Not requested');

    await page.clickLocate();
    // Either the API returned coords or the page fell back to "unavailable"
    // (geolocation requires HTTPS — the playground is HTTP-only, so on
    // most browser configurations the fallback fires).
    await expect.poll(async () => page.getLocationText(), {
      timeout: 5_000,
      message: 'location label did not change',
    }).not.toBe('Not requested');
  });

  test('lat/long constants are in a sensible range', () => {
    expect(GEOLOCATION.latitude).toBeGreaterThan(-90);
    expect(GEOLOCATION.latitude).toBeLessThan(90);
    expect(GEOLOCATION.longitude).toBeGreaterThan(-180);
    expect(GEOLOCATION.longitude).toBeLessThan(180);
  });
});