import { test, expect } from '@playwright/test';

test.describe('Technical Test App E2E', () => {
  test('should display the app, type into textbox and show response', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Verify the app title is visible
    await expect(page.getByRole('heading', { name: 'Technical Test App' })).toBeVisible();

    // Verify the textbox is visible
    const textbox = page.getByPlaceholder('Type something...');
    await expect(textbox).toBeVisible();

    // Type into the textbox
    await textbox.fill('Hello E2E Test');

    // Wait for the response to appear
    await expect(page.getByText('Response: OK')).toBeVisible({ timeout: 5000 });

    // Verify the response contains "OK"
    const response = page.getByText('Response: OK');
    await expect(response).toContainText('OK');
  });

  test('should not display response when input is empty', async ({ page }) => {
    await page.goto('/');

    // Clear any existing text
    const textbox = page.getByPlaceholder('Type something...');
    await textbox.clear();

    // Verify no response is displayed
    await expect(page.getByText('Response:')).not.toBeVisible();
  });
});
