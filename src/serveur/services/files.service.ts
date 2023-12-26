class FilesService {
	path: string = '';

	constructor() {
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

