chrome.runtime.onInstalled.addListener(() => {
	const tabsList = {};
	// Set CDU disable by default
	if (chrome.storage.local.get('isCduEnabled') === null) {
		chrome.storage.local.set('isCduEnabled', false);
	}
	const value = (chrome.storage.local.get('isCduEnabled') === 'true');
	updateButtonIcon(value);
	// init blacklist websites
	if (chrome.storage.local.get('blacklist') === null) {
		chrome.storage.local.set('blacklist', []);
	}
});

function startCDU(tab) {
	if (localStorage.getItem('isCduEnabled') == "true") {
		chrome.tabs.sendMessage(tab.id, {message: "orangeconfort+doyouexist"}, function (response) {
			if (response) {
				chrome.tabs.sendMessage(tab.id, {message: 'orangeconfort+loadcdu'});
			}
		});
	}
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	switch (request.message) {
		case 'orangeconfort+userprefget' :
			if (chrome.storage.local.get('UCI41') === null) {
				// Default cookie value first bit set toolbar enable, second one set default lang, third one set to no profile
				chrome.storage.local.set('UCI41', '1|0|0');
			}
			var index = chrome.storage.local.get('blacklist').indexOf(request.value);
			var flag = 0;
			if (index > -1) {
				flag = 1;
			}
			chrome.tabs.sendMessage(sender.tab.id, {
				message: 'orangeconfort+userprefgetresponse',
				value: flag + "|" + chrome.storage.local.get('UCI41')
			});
			break;
		case 'orangeconfort+userprefsave' :
			chrome.storage.local.set('UCI41', request.value);
			break;
		case 'orangeconfort+blacklistsave' :
			var blacklist = chrome.storage.local.get('blacklist');
			var index = blacklist.indexOf(request.value);
			if (index > -1) {
				chrome.storage.local.set('blacklist', blacklist.splice(index, 1));
			} else {
				chrome.storage.local.set('blacklist', blacklist.push(value));
			}
			break;
		case 'orangeconfort+getIsCduEnabled' :
			sendResponse({value: chrome.storage.local.get('isCduEnabled')});
			break;
	}
});

// Update CDU button icon
function updateButtonIcon(isEnabled) {
	if (isEnabled === true) {
		chrome.action.setIcon({
			path: {
				"16": "../img/icon-16.png",
				"19": "../img/icon-19.png",
				"32": "../img/icon-32.png",
				"38": "../img/icon-38.png",
				"48": "../img/icon-48.png",
				"64": "../img/icon-64.png",
				"128": "../img/icon-128.png"
			}
		});
	} else {
		chrome.action.setIcon({
			path: {
				"16": "../img/icon-disabled-16.png",
				"19": "../img/icon-disabled-19.png",
				"32": "../img/icon-disabled-32.png",
				"38": "../img/icon-disabled-38.png",
				"48": "../img/icon-disabled-48.png",
				"64": "../img/icon-disabled-64.png",
				"128": "../img/icon-disabled-128.png"
			}
		});
	}
}

// CDU button click event
chrome.action.onClicked.addListener(function (tab) {
	var value = (chrome.storage.local.get('isCduEnabled') == 'true') ? false : true;
	chrome.storage.local.set('isCduEnabled', value);
	updateButtonIcon(value);
	if (chrome.storage.local.get('isCduEnabled') == 'true') {
		chrome.tabs.query({
				"status": "complete"
			},
			function (tabs) {
				for (var i = 0; i < tabs.length; i++) {
					startCDU(tabs[i]);
				}
			});
	} else {
		chrome.tabs.query({
				"status": "complete"
			},
			function (tabs) {
				for (var i = 0; i < tabs.length; i++) {
					chrome.tabs.sendMessage(tabs[i].id, {message: 'orangeconfort+closecdu'});
				}
			});
	}
});
