import { FrameLocator, Locator, Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { BasePage } from './BasePage';
import { ROUTES, FILE_UPLOAD } from '../utils/testData';

/**
 * File Upload — the playground renders a drag-and-drop uploader inside an
 * `<iframe>` that loads `/static/upload.html`. We use FrameLocator to drive
 * the hidden `<input type="file">` and then read back the displayed file
 * name from the iframe's `.file-info p` element.
 */
export class FileUploadPage extends BasePage {
  readonly iframe: FrameLocator;
  readonly fileInput: Locator;
  readonly fileNameText: Locator;
  readonly successIndicator: Locator;

  constructor(page: Page) {
    super(page);
    this.iframe = page.frameLocator('iframe');
    this.fileInput = this.iframe.locator('input[type="file"]#browse');
    this.fileNameText = this.iframe.locator('.file-info p');
    this.successIndicator = this.iframe.locator('.success-file p');
  }

  async goto(): Promise<void> {
    await super.goto(ROUTES.fileUpload);
    // Wait for the iframe document to be ready.
    await this.page.waitForTimeout(500);
  }

  /**
   * Upload a temporary file via the hidden file input and return the
   * file name displayed inside the uploader.
   */
  async uploadSampleFile(): Promise<string> {
    const tempPath = path.resolve(process.cwd(), FILE_UPLOAD.fileName);
    fs.writeFileSync(tempPath, FILE_UPLOAD.fileContent, 'utf-8');

    await expect(this.fileInput).toBeAttached({ timeout: 10_000 });
    await this.fileInput.setInputFiles(tempPath);

    // Wait for the success indicator that says "1 file(s) selected".
    await expect(this.successIndicator).toHaveText(/file\(s\) selected/i, {
      timeout: 5_000,
    });

    const name = ((await this.fileNameText.first().textContent()) ?? '').trim();

    fs.unlinkSync(tempPath);
    return name;
  }
}