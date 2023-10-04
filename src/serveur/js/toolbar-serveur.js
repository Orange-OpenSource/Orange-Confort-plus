const appRootElt = document.createElement('app-root');
// @todo Allow path to be configured
appRootElt.dataset.path = window.location.origin + '/';
document.body.prepend(appRootElt);
