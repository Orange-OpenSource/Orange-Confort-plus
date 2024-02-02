let filesServiceIsInstantiated: boolean;

class FilesService {
	constructor() {
		if (filesServiceIsInstantiated) {
			throw new Error('FilesService is already instantiated.');
		}

		filesServiceIsInstantiated = true;
	}

	getModesOfUse(): Promise<string> {
		return fetch(chrome.runtime.getURL('assets/json/modes-of-use.json'))
			.then(response => {
				return response.json();
			})
			.catch(error => {
				console.error(`Error when retrieving JSON file : ${error}.`);
				return error;
			});
	}
}
