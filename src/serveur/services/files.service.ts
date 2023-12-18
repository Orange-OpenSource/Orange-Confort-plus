class filesService {
	getModesOfUse(): Promise<any> {
		return fetch(`./assets/json/modes-of-use.json`)
			.then(response => response.json())
			.then(data => {
				// Faites quelque chose avec les données JSON, par exemple :
				return data;
			})
			.catch(error => {
				console.error('Erreur lors de la récupération du fichier JSON :', error);
				return error;
			});
	}
}

