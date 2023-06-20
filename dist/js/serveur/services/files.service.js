"use strict";
let filesServiceIsInstantiated;
class FilesService {
    path = '';
    constructor() {
        if (filesServiceIsInstantiated) {
            throw new Error('FilesService is already instantiated.');
        }
        filesServiceIsInstantiated = true;
        this.path = `${window.location.origin}/`;
    }
    getJSONFile(file) {
        return fetch(`${this.path}assets/json/${file}.json`)
            .then(response => {
            return response.json();
        })
            .catch(error => {
            console.error(`Error when retrieving ${file}.json: ${error}.`);
            return error;
        });
    }
}
