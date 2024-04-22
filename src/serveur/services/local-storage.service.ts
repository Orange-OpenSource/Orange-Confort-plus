let localStorageServiceIsInstantiated: boolean;

class LocalStorageService {
	constructor() {
		if (localStorageServiceIsInstantiated) {
			throw new Error('LocalStorageService is already instantiated.');
		}

		localStorageServiceIsInstantiated = true;
	}

	setItem<T>(key: string, value: T): void {
		//@ts-ignore
		localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
		let storeEvent = new CustomEvent(`storage-${key}`,
			{
				bubbles: true
			});
		window.dispatchEvent(storeEvent);
	}

	getItem<T>(key: string): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			// @ts-ignore
			resolve(JSON.parse(localStorage.getItem(`${PREFIX}${key}`)));
			reject(new Error('KO'));
		});
	}

	removeItem(key: string): void {
		//@ts-ignore
		localStorage.removeItem(`${PREFIX}${key}`);
	}
}
