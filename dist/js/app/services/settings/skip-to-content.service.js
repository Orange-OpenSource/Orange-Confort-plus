"use strict";
let skipToContentServiceIsInstantiated;
class SkipToContentService {
    constructor() {
        if (skipToContentServiceIsInstantiated) {
            throw new Error('SkipToContentService is already instantiated.');
        }
        skipToContentServiceIsInstantiated = true;
    }
    setSkipToContent = () => {
        this.goToMain();
    };
    goToMain = () => {
        let mainElement;
        mainElement =
            document.querySelector('main') ||
                document.querySelector('[role="main"]') ||
                document.querySelector('[id="main"]') ||
                document.querySelector('[class="main"]') ||
                document.querySelector('[id="content"]') ||
                document.querySelector('[class="content"]');
        if (mainElement) {
            mainElement.tabIndex = -1;
            mainElement.focus();
        }
    };
}
