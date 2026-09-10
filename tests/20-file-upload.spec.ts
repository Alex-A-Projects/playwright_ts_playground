import { test, expect } from '@playwright/test';
import { FileUploadPage } from '../pages/FileUploadPage';
import { FILE_UPLOAD } from '../utils/testData';

test.describe('File Upload', () => {
  let page: FileUploadPage;

  test.beforeEach(async ({ page: pwPage }) => {
    page = new FileUploadPage(pwPage);
    await page.goto();
  });

  test('hidden file input is present inside the iframe', async () => {
    await expect(page.fileInput).toBeAttached({ timeout: 10_000 });
  });

  test('uploading a file shows the filename on the page', async () => {
    const name = await page.uploadSampleFile();
    expect(name).toBe(FILE_UPLOAD.fileName);
  });
});