import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('Mode initialization : ', () => {
	test('should have 22 settings ', async ({ page }) => {
		expect(page.getByTestId('mode-content'));
		expect(await page.locator('.sc-mode__setting').count()).toEqual(22);
	});
});
