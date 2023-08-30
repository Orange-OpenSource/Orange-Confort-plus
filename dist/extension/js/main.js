chrome.runtime.onInstalled.addListener(async ({ reason }) => {
	// Update action icon and state
	const tabs = await chrome.tabs.query({});

	for (const tab of tabs) {
		// Set CDU disable by default
		updateButtonIcon(false, tab.id);
		// Disable action on internal browser pages
		if (['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
			chrome.action.disable(tab.id);
		} else {
			chrome.action.enable(tab.id);
			const states = await chrome.storage.local.get(`isCduEnabled-${tab.id}`);
			chrome.storage.local.set({[`isCduEnabled-${tab.id}`]: false});
			// Reload tabs that had CDU loaded and active
			if (states[`isCduEnabled-${tab.id}`]) {
				chrome.tabs.reload(tab.id)
					.catch(error => {
						console.error(`Cannot reload tab ${tab.id}. Error: ${error}`)
					});
			}
		}
	}
});

// Update CDU button icon
const updateButtonIcon = (isEnabled, tabId) => {
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
chrome.action.onClicked.addListener(async (tab) => {
	// Just in case we're on internal browser page and action couldn't be disabled before
	if (['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.disable(tab.id);
		return false;
	}

	const states = await chrome.storage.local.get(`isCduEnabled-${tab.id}`);
	const currentState = states[`isCduEnabled-${tab.id}`];
	chrome.storage.local.set({[`isCduEnabled-${tab.id}`]: !currentState});
	updateButtonIcon(!currentState, tab.id);
	if (!currentState) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['js/inject.js']
		});
	} else {
		// @todo: drop <app-root> but allow to restore it, too
		// @link https://github.com/GoogleChromeLabs/ProjectVisBug/blob/main/extension/visbug.js
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	updateButtonIcon(false, tabId);
	if (['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.disable(tabId);
	} else {
		chrome.action.enable(tabId);
		chrome.storage.local.set({[`isCduEnabled-${tabId}`]: false});
	}
});

chrome.tabs.onCreated.addListener(tab => {
	updateButtonIcon(false, tab.id);
	chrome.action.disable(tab.id);
	if (!['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.enable(tab.id);
	}
});
