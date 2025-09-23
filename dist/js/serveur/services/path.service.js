"use strict";
let pathServiceIsInstantiated;
class PathService {
    path = '';
    constructor() {
        if (pathServiceIsInstantiated) {
            throw new Error('PathService is already instantiated.');
        }
        pathServiceIsInstantiated = true;
        this.path = `${window.location.origin}/`;
    }
}
