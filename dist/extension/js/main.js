const options = {
	debug: false
};

chrome.runtime.onInstalled.addListener(async ({temporary}) => {
	// Debug mode
	if (temporary) {
		options.debug = true;
		chrome.storage.sync.set({options});
	}

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

	const activations = await chrome.storage.local.get(`isCduEnabled-${tab.id}`);
	const isLoaded = activations[`isCduEnabled-${tab.id}`];
	chrome.storage.local.set({[`isCduEnabled-${tab.id}`]: !isLoaded});

	const injections = await chrome.storage.local.get(`isCduInjected-${tab.id}`);
	const isInjected = injections[`isCduInjected-${tab.id}`];

	updateButtonIcon(!isLoaded, tab.id);

	if (!isLoaded && !isInjected) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['js/inject.js']
		});
		chrome.storage.local.set({[`isCduInjected-${tab.id}`]: true});
	} else if (!isLoaded && isInjected) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['js/restore.js']
		});
	} else if (isLoaded && isInjected) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['js/eject.js']
		});
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	updateButtonIcon(false, tabId);
	if (['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.disable(tabId);
	} else {
		chrome.action.enable(tabId);
		chrome.storage.local.set({[`isCduEnabled-${tabId}`]: false});
		chrome.storage.local.set({[`isCduInjected-${tabId}`]: false});
	}
});

chrome.tabs.onCreated.addListener(tab => {
	updateButtonIcon(false, tab.id);
	chrome.action.disable(tab.id);
	if (!['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.enable(tab.id);
	}
});

// @note Debugging storage
// @see https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
chrome.storage.onChanged.addListener(async (changes, namespace) => {
	const data = await chrome.storage.sync.get('options');
	console.log(data)
	if (data.debug) {
		console.log('debug')
		for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
			console.log(
				`Storage key "${key}" in namespace "${namespace}" changed.`,
				`Old value was "${oldValue}", new value is "${newValue}".`
			);
		}
	}
});
