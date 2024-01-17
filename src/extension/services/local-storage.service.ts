let localStorageServiceIsInstantiated: boolean;

class LocalStorageService {
	prefix = 'cplus-';

	constructor() {
		if (localStorageServiceIsInstantiated) {
			throw new Error('Le localStorageService est déjà instancié.');
		}

		localStorageServiceIsInstantiated = true;
	}

	setItem<T>(key: string, value: T): void {
		chrome.storage.local.set({ [`${this.prefix}${key}`]: value });
		let storeEvent = new CustomEvent(`storage-${key}`,
			{
				bubbles: true
			});
		window.dispatchEvent(storeEvent);
	}

	getItem<T>(key: string): Promise<T> {
		return chrome.storage.local.get([`${this.prefix}${key}`]).then(datas => {
			return new Promise<T>((resolve, reject) => {
				// @ts-ignore
				resolve(datas[`${this.prefix}${key}`]);
				reject(new Error('KO'));
			});
		});
	}

	removeItem(key: string): void {
		chrome.storage.local.remove([`${this.prefix}${key}`]);
	}
}
