"use strict";
// @ts-ignore
(() => {
    // @ts-ignore
    localStorageServiceInstance.setItem('is-paused', false);
    const appRootElt = document.createElement('app-root');
    appRootElt.setAttribute('data-state', 'restored');
    document.body.prepend(appRootElt);
})();
"EOF";
