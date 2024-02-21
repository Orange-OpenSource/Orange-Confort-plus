import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('Home initialization : ', () => {
	test('should create components ', async ({ page }) => {
		expect(page.getByTestId('mode-name'));
		expect(page.getByTestId('settings-btn'));
		expect(page.locator('app-mode'));
		expect(page.getByTestId('change-mode-btn'));
	});
});
