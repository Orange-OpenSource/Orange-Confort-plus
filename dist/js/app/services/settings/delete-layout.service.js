"use strict";
let deleteLayoutServiceIsInstantiated;
;
class DeleteLayoutService {
    storedStyles = [];
    constructor() {
        if (deleteLayoutServiceIsInstantiated) {
            throw new Error('DeleteLayoutService is already instantiated.');
        }
        deleteLayoutServiceIsInstantiated = true;
    }
    setDeleteLayout = (value) => {
        this.storedStyles?.forEach((style) => {
            style.parent.appendChild(style.stylesheet);
        });
        if (value !== DEFAULT_VALUE) {
            const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
            Array.from(stylesheets).filter((style) => {
                if (!style.id.startsWith(PREFIX)) {
                    const storedStyle = { stylesheet: style, parent: style.parentElement };
                    this.storedStyles.push(storedStyle);
                    style.remove();
                }
            });
        }
    };
}
