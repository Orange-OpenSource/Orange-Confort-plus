document.addEventListener('DOMContentLoaded', () => {
	let browser, target;
	if (navigator?.userAgentData) {
		switch (navigator.userAgentData.brands.brand) {
			// @note Future-proofing
			case 'Firefox':
				browser = 'firefox';
				break;
			case 'Chromium':
			case 'Chrome':
				browser = 'chrome'
				break;
			case 'Edge':
			default:
				browser = 'edge';
		}
	} else if (navigator.userAgent.includes('Gecko/')) {
		browser = 'firefox';
	}
	document.documentElement.classList.add(`is-${browser}`);
	const link = document.querySelector(`a[href*="${browser}"]`)
	link?.classList.replace('text-muted', 'text-primary');
	link?.classList.replace('text-decoration-none', 'fw-bold');
});

