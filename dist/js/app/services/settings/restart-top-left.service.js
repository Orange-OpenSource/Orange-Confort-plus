"use strict";
let restartTopLeftServiceIsInstantiated;
class RestartTopLeftService {
    firstElement;
    constructor() {
        if (restartTopLeftServiceIsInstantiated) {
            throw new Error('RestartTopLeftService is already instantiated.');
        }
        restartTopLeftServiceIsInstantiated = true;
    }
    setRestartTopLeft = () => {
        this.firstElement?.remove();
        this.addAndFocusFirstElement();
    };
    addAndFocusFirstElement = () => {
        this.firstElement = document.createElement('a');
        document.body.insertBefore(this.firstElement, document.querySelector(APP_NAME));
        this.firstElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
}
