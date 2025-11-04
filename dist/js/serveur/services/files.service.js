"use strict";
let filesServiceIsInstantiated;
class FilesService {
    constructor() {
        if (filesServiceIsInstantiated) {
            throw new Error('FilesService is already instantiated.');
        }
        filesServiceIsInstantiated = true;
    }
    getJSONFile(file) {
        return fetch(`${appPath}assets/json/${file}.json`)
            .then(response => {
            return response.json();
        })
            .catch(error => {
            console.error(`Error when retrieving ${file}.json: ${error}.`);
            return error;
        });
    }
}
