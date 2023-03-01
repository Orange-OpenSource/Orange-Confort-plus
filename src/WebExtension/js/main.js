chrome.runtime.onInstalled.addListener(() => {
	// Set CDU disable by default
	chrome.storage.local.get('isCduEnabled').then(result => {
		if (result.isCduEnabled === undefined) {
			chrome.storage.local.set({'isCduEnabled': false});
			updateButtonIcon(false);
		} else {
			updateButtonIcon(result.isCduEnabled);
		}
	})
	// Setup websites blacklist
	chrome.storage.local.get('blacklist').then(result => {
		if (result.blacklist === undefined) {
			chrome.storage.local.set({'blacklist': []});
		}
	})
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	chrome.storage.local.get('blacklist').then(result => {
		const blacklist = result.blacklist;
		const index = (blacklist !== undefined) ? blacklist.indexOf(request.value) : -1;
		switch (request.message) {
			case 'orangeconfort+userprefget':
				chrome.storage.local.get('UCI41').then(result => {
					if (result.UCI41 === undefined) {
						// Default cookie value first bit set toolbar enable, second one set default lang, third one set to no profile
						chrome.storage.local.set({'UCI41': '1|0|0'});
					}
					let flag = 0;
					if (index > -1) {
						flag = 1;
					}
					chrome.tabs.sendMessage(sender.tab.id, {
						message: 'orangeconfort+userprefgetresponse',
						value: `${flag}|${result.UCI41}`
					});
				})
				break;
			case 'orangeconfort+userprefsave':
				chrome.storage.local.set({'UCI41': request.value});
				break;
			case 'orangeconfort+blacklistsave':
				if (index > -1) {
					chrome.storage.local.set({'blacklist': blacklist.splice(index, 1)});
				} else {
					chrome.storage.local.set({'blacklist': blacklist.push(value)});
				}
				break;
			case 'orangeconfort+getIsCduEnabled':
				chrome.storage.local.get('isCduEnabled').then(result => {
					sendResponse({value: result.isCduEnabled});
				})
				break;
			default:
				break;
		}
	});
});

// Update CDU button icon
function updateButtonIcon(isEnabled) {
	if (isEnabled) {
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
chrome.action.onClicked.addListener(() => {
	chrome.storage.local.get('isCduEnabled').then(result => {
		// @note This is global
		const currentState = result.isCduEnabled;
		// @note Reversing the value
		chrome.storage.local.set({'isCduEnabled': !currentState});
		updateButtonIcon(!currentState);
		if (!currentState) {
			chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
				for (let i = 0; i < tabs.length; i++) {
					// @note But suddenly we loop on each tab
					const tab = tabs[i];
					chrome.storage.local.get('isCduEnabled').then(result => {
						// @note Then we're getting the value we reversed above
						// @note So we already have it, don't we?
						// @note Then even the condition shouldn't exist
						if (result.isCduEnabled) {
							// Then we send message for each tab, but content script weren't loaded on each tab!
							chrome.tabs.sendMessage(tab.id, {message: "orangeconfort+doyouexist"}).then(response => {
								// @note So we don't have response but an error: "Receiving end does not exist".
								if (response) {
									chrome.tabs.sendMessage(tab.id, {message: 'orangeconfort+loadcdu'});
								}
							});
						}
					});
				}
			});
		} else {
			chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
				// @note Closing CDU on all tabs?
				for (var i = 0; i < tabs.length; i++) {
					chrome.tabs.sendMessage(tabs[i].id, {message: 'orangeconfort+closecdu'});
				}
			});
		}
	});
});
