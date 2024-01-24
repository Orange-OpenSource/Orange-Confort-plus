let filesServiceIsInstantiated: boolean;

class FilesService {
	path: string = '';

	constructor() {
		if (filesServiceIsInstantiated) {
			throw new Error('Le FilesService est déjà instancié.');
		}

		filesServiceIsInstantiated = true;
		this.path = `${window.location.origin}/`;
	}

	getModesOfUse(): Promise<string> {
		return fetch(`${this.path}assets/json/modes-of-use.json`)
			.then(response => {
				return response.json();
			})
			.catch(error => {
				console.error(`Error when retrieving JSON file : ${error}.`);
				return error;
			});
	}
}

