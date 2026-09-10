import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES, SAMPLE_APP } from '../utils/testData';

/**
 * Sample App — a mini login form. Per the playground, valid credentials
 * are any non-empty username plus the password "pwd". Inputs are selected
 * by their `name` attribute because the `id` is randomized.
 */
export class SampleAppPage extends BasePage {
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly statusLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator('input[name="UserName"]');
    this.passwordInput = page.locator('input[name="Password"]');
    this.loginButton = page.locator('#login');
    this.statusLabel = page.locator('#loginstatus');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.sampleApp);
  }

  async login(userName: string, password: string): Promise<void> {
    await expect(this.userNameInput).toBeVisible();
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithValidCredentials(): Promise<string> {
    await this.login(SAMPLE_APP.validUser, SAMPLE_APP.validPassword);
    return this.getStatusText();
  }

  async loginWithInvalidCredentials(): Promise<string> {
    await this.login(SAMPLE_APP.invalidUser, SAMPLE_APP.invalidPassword);
    return this.getStatusText();
  }

  async getStatusText(): Promise<string> {
    await expect(this.statusLabel).toBeVisible();
    return ((await this.statusLabel.textContent()) ?? '').trim();
  }
}