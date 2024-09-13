// @ts-ignore
(() => {
	// @ts-ignore
	const appRootElt = document.createElement(APP_NAME);
	// @ts-ignore
	localStorageServiceInstance.setItem('is-paused', false);
	appRootElt.setAttribute('data-state', 'restored');
	document.body.prepend(appRootElt);
})();

"EOF"
