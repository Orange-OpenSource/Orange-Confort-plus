const script = document.createElement('script');
script.type = 'module';
script.id = 'orange-confort-plus-toolbar';
script.src = chrome.runtime.getURL('js/toolbar.js');
document.body.appendChild(script);

"EOF"
