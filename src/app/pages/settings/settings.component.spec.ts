import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('Settings initialization : ', () => {
	test('should have 4 categories ', async ({ page }) => {
		await page.locator('#confort').click();
		await page.locator('#settings-btn').click();
		expect(await page.locator('.c-settings__category').count()).toEqual(4);
	});
});
