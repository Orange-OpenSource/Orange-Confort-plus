let localStorageServiceIsInstantiated: boolean;

class LocalStorageService {
	hostname: string = '';
	tabId: number;

	constructor() {
		if (localStorageServiceIsInstantiated) {
			throw new Error('LocalStorageService is already instantiated.');
		}

		localStorageServiceIsInstantiated = true;

		this.hostname = window.location.hostname;
		chrome.runtime.sendMessage({ getTabId: true })
			.then(response => {
				this.tabId = response.tabId;
			})
			.catch(error => console.error(error));
	}

	setItem<T>(key: string, value: T): void {
		// @ts-ignore
		chrome.storage.local.set({ [`${PREFIX}${key}-${this.hostname}`]: value });
		chrome.storage.local.set({ [`latest-${PREFIX}${key}`]: value });
		let storeEvent = new CustomEvent(`storage-${key}`,
			{
				bubbles: true
			});
		window.dispatchEvent(storeEvent);

		// @note Special case to handle in-tab navigations and pause
		if (['is-opened', 'is-paused'].includes(key) && this.tabId) {
			chrome.storage.local.set({ [`${PREFIX}${key}-${this.tabId}`]: value });
		}
	}

	getItem<T>(key: string): Promise<T> {
		// @note Special case to handle in-tab navigations and pause
		if (['is-opened', 'is-paused'].includes(key) && this.tabId) {
			//@ts-ignore
			return chrome.storage.local.get([`${PREFIX}${key}-${this.tabId}`]).then(datas => {
				if (datas[`${PREFIX}${key}-${this.tabId}`]) {
					return new Promise<T>((resolve, reject) => {
						// @ts-ignore
						resolve(datas[`${PREFIX}${key}-${this.tabId}`]);
						reject(new Error(`Could not get ${PREFIX}${key}-${this.tabId} in storage.`));
					});
				}
			});
		} else {
			//@ts-ignore
			return chrome.storage.local.get([`${PREFIX}${key}-${this.hostname}`]).then(datas => {
				if (datas[`${PREFIX}${key}-${this.hostname}`]) {
					return new Promise<T>((resolve, reject) => {
						// @ts-ignore
						resolve(datas[`${PREFIX}${key}-${this.hostname}`]);
						reject(new Error(`Could not get ${PREFIX}${key}-${this.hostname} in storage.`));
					});
				} else {
					return chrome.storage.local.get([`latest-${PREFIX}${key}`]).then(datas => {
						return new Promise<T>((resolve, reject) => {
							// @ts-ignore
							resolve(datas[`latest-${PREFIX}${key}`]);
							reject(new Error(`Could not get latest-${PREFIX}${key} in storage.`));
						});
					});
				}
			});
		}
	}

	removeItem(key: string): void {
		//@ts-ignore
		chrome.storage.local.remove([`${PREFIX}${key}-${this.hostname}`]);
	}
}
