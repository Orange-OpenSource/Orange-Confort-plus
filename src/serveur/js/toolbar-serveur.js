const appRootElt = document.createElement('app-root');
appRootElt.dataset.path = window.location.origin + '/';
document.body.prepend(appRootElt);
