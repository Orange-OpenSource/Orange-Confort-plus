const script = document.createElement('script');
script.type = 'module';
script.id = 'orange-confort-plus-toolbar';
script.src = chrome.runtime.getURL('js/toolbar.js');
document.body.appendChild(script);

const appRootElt = document.createElement('app-root');
appRootElt.dataset.path = chrome.runtime.getURL('/');
document.body.prepend(appRootElt);

"EOF"
