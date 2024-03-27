let localStorageServiceIsInstantiated: boolean;

class LocalStorageService {
	hostname: string = '';

	constructor() {
		if (localStorageServiceIsInstantiated) {
			throw new Error('LocalStorageService is already instantiated.');
		}

		localStorageServiceIsInstantiated = true;

		this.hostname = window.location.hostname;
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
	}

	getItem<T>(key: string): Promise<T> {
		//@ts-ignore
		return chrome.storage.local.get([`${PREFIX}${key}-${this.hostname}`]).then(datas => {
			if (datas[`${PREFIX}${key}-${this.hostname}`]) {
				return new Promise<T>((resolve, reject) => {
					// @ts-ignore
					resolve(datas[`${prefix}${key}-${this.hostname}`]);
					reject(new Error(`Could not get ${PREFIX}${key}-${this.hostname} in storage.`));
				});
			} else {
				return chrome.storage.local.get([`latest-${PREFIX}${key}`]).then(datas => {
					return new Promise<T>((resolve, reject) => {
						// @ts-ignore
						resolve(datas[`latest-${prefix}${key}`]);
						reject(new Error(`Could not get latest-${PREFIX}${key} in storage.`));
					});
				});
			}
		});
	}

	removeItem(key: string): void {
		//@ts-ignore
		chrome.storage.local.remove([`${PREFIX}${key}-${this.hostname}`]);
	}
}
