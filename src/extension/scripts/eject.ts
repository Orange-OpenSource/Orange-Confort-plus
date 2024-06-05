// @ts-ignore
let eject = () => {
	const appRootElt = document.querySelector('app-root');
	if (appRootElt) {
		// Pause settings if they're active
		const pauseBtn = appRootElt?.shadowRoot?.getElementById('pause-btn');
		if (pauseBtn) {
			const isActive = pauseBtn.querySelector('[data-name="Pause"]') !== null;
			// @todo Store if it wasn't paused?
			if (isActive) pauseBtn.click();
		}
		// Remove toolbar
		appRootElt.remove();
	}
}

eject();


"EOF"
