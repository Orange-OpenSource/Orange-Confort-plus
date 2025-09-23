let filesServiceIsInstantiated: boolean;

class FilesService {
	constructor() {
		if (filesServiceIsInstantiated) {
			throw new Error('FilesService is already instantiated.');
		}

		filesServiceIsInstantiated = true;
	}

	getJSONFile(file: string): Promise<string> {
		return fetch(chrome.runtime.getURL(`assets/json/${file}.json`))
			.then(response => {
				return response.json();
			})
			.catch(error => {
				console.error(`Error when retrieving ${file}.json: ${error}.`);
				return error;
			});
	}
}
