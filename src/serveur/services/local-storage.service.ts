class LocalStorageService {
	prefix = 'cplus-';

	constructor() {
	}

	setItem<T>(key: string, value: T): void {
		localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
		let clickEvent = new CustomEvent(`storage-${key}`,
			{
				bubbles: true
			});
		window.dispatchEvent(clickEvent);
	}

	getItem<T>(key: string): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			// @ts-ignore
			resolve(JSON.parse(localStorage.getItem(`${this.prefix}${key}`)));
			reject(new Error('KO'));
		});
	}

	removeItem(key: string): void {
		localStorage.removeItem(`${this.prefix}${key}`);
	}
}
