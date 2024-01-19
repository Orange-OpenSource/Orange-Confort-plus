let localStorageServiceIsInstantiated: boolean;

class LocalStorageService {
	constructor() {
		if (localStorageServiceIsInstantiated) {
			throw new Error('Le localStorageService est déjà instancié.');
		}

		localStorageServiceIsInstantiated = true;
	}

	setItem<T>(key: string, value: T): void {
		//@ts-ignore
		chrome.storage.local.set({ [`${prefix}${key}`]: value });
		let storeEvent = new CustomEvent(`storage-${key}`,
			{
				bubbles: true
			});
		window.dispatchEvent(storeEvent);
	}

	getItem<T>(key: string): Promise<T> {
		//@ts-ignore
		return chrome.storage.local.get([`${prefix}${key}`]).then(datas => {
			return new Promise<T>((resolve, reject) => {
				// @ts-ignore
				resolve(datas[`${this.prefix}${key}`]);
				reject(new Error('KO'));
			});
		});
	}

	removeItem(key: string): void {
		//@ts-ignore
		chrome.storage.local.remove([`${prefix}${key}`]);
	}
}
