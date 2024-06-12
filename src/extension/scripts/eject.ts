// @ts-ignore
(() => {
	const appRootElt = document.querySelector('app-root');
	if (appRootElt) {
		// Pause settings if they're active
		const pauseBtn = appRootElt?.shadowRoot?.getElementById('pause-btn');
		if (pauseBtn) {
			const isActive = pauseBtn.querySelector('[data-name="Pause"]') !== null;
			// @ts-ignore
			localStorageServiceInstance.setItem('is-paused', !isActive);
			if (isActive) {
				pauseBtn.click();
			}
		}
		// Remove toolbar
		appRootElt.remove();
	}
})();

"EOF"
