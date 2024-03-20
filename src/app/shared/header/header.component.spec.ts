import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('Header display : ', () => {
	test('should header elements are initializing', async ({ page }) => {
		expect(page.getByTestId('prev-toolbar'));
		expect(page.getByTestId('title-app'));
		expect(page.getByTestId('close-toolbar'));
	});

	const btnPrevClass = 'btn btn-icon btn-inverse btn-secondary';
	const titlePageBlockClass = 'd-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2';
	const titleAppClass = 'd-flex gap-1 align-items-center fs-3 fw-bold text-white';

	test('PAGE_HOME - should header mode is PRIMARY', async ({ page }) => {
		await page.locator('#confort').click();

		await expect(page.locator('#prev-toolbar')).toHaveClass(`${btnPrevClass} d-none`);
		await expect(page.locator('#page-block-title')).toHaveClass(`${titlePageBlockClass} d-none`);
		await expect(page.locator('#app-title')).toHaveClass(titleAppClass);
	});

	test('PAGE_MODES - should header mode is SECONDARY', async ({ page }) => {
		await page.locator('#confort').click();
		await page.locator('#change-mode-btn').click();

		await expect(page.locator('#prev-toolbar')).toHaveClass(btnPrevClass);
		await expect(page.locator('#page-block-title')).toHaveClass(titlePageBlockClass);
		await expect(page.locator('#app-title')).toHaveClass(`${titleAppClass} d-none`);
	});

	test('PAGE_SETTINGS - should header mode is SECONDARY', async ({ page }) => {
		await page.locator('#confort').click();
		await page.locator('#settings-btn').click();

		await expect(page.locator('#prev-toolbar')).toHaveClass(btnPrevClass);
		await expect(page.locator('#page-block-title')).toHaveClass(titlePageBlockClass);
		await expect(page.locator('#app-title')).toHaveClass(`${titleAppClass} d-none`);
	});
});
