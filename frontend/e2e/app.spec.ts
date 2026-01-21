import { test, expect } from '@playwright/test';

test.describe('Technical Test App E2E', () => {
  test('should display the app, type into textbox and show response', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Technical Test App' })).toBeVisible();

    const textbox = page.getByPlaceholder('Type something...');
    await expect(textbox).toBeVisible();

    await textbox.fill('Hello E2E Test');

    await expect(page.getByText('Response: OK')).toBeVisible({ timeout: 5000 });

    const response = page.getByText('Response: OK');
    await expect(response).toContainText('OK');
  });

  test('should not display response when input is empty', async ({ page }) => {
    await page.goto('/');

    const textbox = page.getByPlaceholder('Type something...');
    await textbox.clear();

    await expect(page.getByText('Response:')).not.toBeVisible();
  });
});
