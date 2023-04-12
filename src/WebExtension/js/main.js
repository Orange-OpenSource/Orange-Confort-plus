chrome.runtime.onInstalled.addListener(({ reason }) => {
	// Reload content scripts
	if (reason === chrome.runtime.OnInstalledReason.UPDATE) {
		const scripts = chrome.runtime.getManifest().content_scripts;
		for (const script of scripts) {
			chrome.tabs.query({url: script.matches}).then(tabs => {
				for (const tab of tabs) {
					chrome.scripting.executeScript({
						target: {tabId: tab.id},
						files: script.js,
					});
				}
			});
		}
	}

	// Setup websites blacklist
	chrome.storage.local.get('blacklist').then(result => {
		if (result.blacklist === undefined) {
			chrome.storage.local.set({'blacklist': []});
		}
	});

	// Set CDU disable by default
	chrome.tabs.query({}).then(tabs => {
		for (const tab of tabs) {
			chrome.storage.local.get(`isCduEnabled-${tab.id}`).then(result => {
				// Reload tabs that had CDU loaded and active
				if (result[`isCduEnabled-${tab.id}`]) {
					chrome.tabs.reload(tab.id).then(() => {
						chrome.storage.local.set({[`isCduEnabled-${tab.id}`]: false});
						updateButtonIcon(false, tab.id);
					});
				} else {
					chrome.storage.local.set({[`isCduEnabled-${tab.id}`]: false});
					updateButtonIcon(false, tab.id);
				}
			});
		}
	});
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
				chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
					const currentTabId = tabs[0].id;
					chrome.storage.local.get(`isCduEnabled-${currentTabId}`).then(result => {
						sendResponse({value: result[`isCduEnabled-${currentTabId}`]});
						updateButtonIcon(result[`isCduEnabled-${currentTabId}`], currentTabId);
					});
				});
				break;
			default:
				break;
		}
	});
});

// Update CDU button icon
function updateButtonIcon(isEnabled, tabId) {
	if (isEnabled) {
		chrome.action.setIcon({
			tabId: tabId,
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
			tabId: tabId,
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
chrome.action.onClicked.addListener((tab) => {
	// @todo Disable action in browsers internal pages
	// @note Does not work…
	/* if (!['edge://', 'chrome://', 'about://'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.disable(tab.id);
		updateButtonIcon(false, tab.id);
		return false;
	} */

	chrome.storage.local.get(`isCduEnabled-${tab.id}`).then(result => {
		const currentState = result[`isCduEnabled-${tab.id}`];
		chrome.storage.local.set({[`isCduEnabled-${tab.id}`]: !currentState});
		updateButtonIcon(!currentState, tab.id);
		if (!currentState) {
			chrome.tabs.sendMessage(tab.id, {message: "orangeconfort+doyouexist"}).then(response => {
				if (response.message === 'yes') {
					chrome.tabs.sendMessage(tab.id, {message: 'orangeconfort+loadcdu'});
				}
			});
		} else {
			chrome.tabs.sendMessage(tab.id, {message: 'orangeconfort+closecdu'});
		}
	});
});
