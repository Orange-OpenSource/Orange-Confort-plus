let localStorageServiceIsInstantiated: boolean;

class LocalStorageService {
	constructor() {
		if (localStorageServiceIsInstantiated) {
			throw new Error('LocalStorageService is already instantiated.');
		}

		localStorageServiceIsInstantiated = true;
	}

	setItem<T>(key: string, value: T): void {
		// @todo Suffixer avec l’ID de l’onglet, ou le domaine ?
		// @ts-ignore
		chrome.storage.local.set({ [`${PREFIX}${key}`]: value });
		let storeEvent = new CustomEvent(`storage-${key}`,
			{
				bubbles: true
			});
		window.dispatchEvent(storeEvent);
	}

	getItem<T>(key: string): Promise<T> {
		//@ts-ignore
		return chrome.storage.local.get([`${PREFIX}${key}`]).then(datas => {
			return new Promise<T>((resolve, reject) => {
				// @ts-ignore
				resolve(datas[`${PREFIX}${key}`]);
				reject(new Error('KO'));
			});
		});
	}

	removeItem(key: string): void {
		//@ts-ignore
		chrome.storage.local.remove([`${PREFIX}${key}`]);
	}
}
