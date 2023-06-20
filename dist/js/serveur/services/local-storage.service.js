"use strict";
let localStorageServiceIsInstantiated;
class LocalStorageService {
    constructor() {
        if (localStorageServiceIsInstantiated) {
            throw new Error('LocalStorageService is already instantiated.');
        }
        localStorageServiceIsInstantiated = true;
    }
    setItem(key, value) {
        //@ts-ignore
        localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
        let storeEvent = new CustomEvent(`storage-${key}`, {
            bubbles: true
        });
        window.dispatchEvent(storeEvent);
    }
    getItem(key) {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            resolve(JSON.parse(localStorage.getItem(`${PREFIX}${key}`)));
            reject(new Error('KO'));
        });
    }
    removeItem(key) {
        //@ts-ignore
        localStorage.removeItem(`${PREFIX}${key}`);
    }
}
