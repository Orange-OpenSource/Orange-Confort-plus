"use strict";
let iconsServiceIsInstantiated;
class IconsService {
    constructor() {
        if (iconsServiceIsInstantiated) {
            throw new Error('IconsService is already instantiated.');
        }
        iconsServiceIsInstantiated = true;
    }
    get path() {
        return `${window.location.origin}/assets/icons/orange-icons-sprite.svg`;
    }
    loadSprite(root) { return; }
}
