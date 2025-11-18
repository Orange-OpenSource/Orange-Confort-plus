"use strict";
// Injector
const appRootElt = document.createElement(APP_NAME);
appRootElt.setAttribute('tabindex', '-1');
appRootElt.setAttribute('style', 'position: absolute; right: 0; top: 0;');
document.body.append(appRootElt);
appRootElt.focus();
