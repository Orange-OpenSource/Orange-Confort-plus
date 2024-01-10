class LocalStorageService {
	prefix = 'cplus-';

	constructor() {
	}

	setItem<T>(key: string, value: T): void {
		chrome.storage.local.set({ [`${this.prefix}${key}`]: value });
		let clickEvent = new CustomEvent(`storage-${key}`,
			{
				bubbles: true
			});
		window.dispatchEvent(clickEvent);
	}

	getItem<T>(key: string): Promise<T> {
		return chrome.storage.local.get([`${this.prefix}${key}`]).then(datas => {
			return new Promise<T>((resolve, reject) => {
				// @ts-ignore
				resolve(JSON.parse(datas));
				reject(new Error('KO'));
			});
		});
	}

	removeItem(key: string): void {
		chrome.storage.local.remove([`${this.prefix}${key}`]);
	}
}
