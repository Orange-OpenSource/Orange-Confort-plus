import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('Modes initialization : ', () => {
	test('should create components ', async ({ page }) => {
		expect(page.getByTestId('select-mode-btn'));
		expect(page.getByTestId('select-mode-zone'));
	});

	test('count number of modes should be 9', async ({ page }) => {
		await page.locator('#confort').click();
		await page.locator('#change-mode-btn').click();
		expect(await page.locator('.sc-select-mode__input').count()).toEqual(9);
	});
});
