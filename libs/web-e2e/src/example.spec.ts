import { test, expect } from '@playwright/test';

test('should render button correctly', async ({ page }) => {
  await page.goto('/components/button');
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot('button.png');
});
