import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('Confort+ initialization : ', () => {
	test('should create C+ button and toolbar', async ({ page }) => {
		expect(page.getByTestId('confort'));
		expect(page.getByTestId('toolbar'));
	});
});
