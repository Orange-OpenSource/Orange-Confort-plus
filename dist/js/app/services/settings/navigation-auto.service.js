"use strict";
let navigationAutoServiceIsInstantiated;
class NavigationAutoService {
    currentFocusElt;
    currentIndex;
    handler;
    timer = null;
    constructor() {
        if (navigationAutoServiceIsInstantiated) {
            throw new Error('NavigationAutoService is already instantiated.');
        }
        navigationAutoServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setNavigationAuto = (value) => {
        window.removeEventListener('focus', this.handler);
        this.clearIntervalFocus();
        if (value !== DEFAULT_VALUE) {
            window.addEventListener('focus', this.handler, true);
            let delay = parseInt(value.split('_')[1]?.replace(/\D/g, ''), 10) * 1000;
            this.setIntervalFocus(delay);
        }
    };
    focusElement = () => {
        const focusableElements = domServiceInstance.getFocusableElements();
        let newIndex = 0;
        if (this.currentFocusElt) {
            const currentIndex = focusableElements.indexOf(this.currentFocusElt);
            newIndex = (currentIndex + 1) % focusableElements.length;
        }
        const newFocusElt = focusableElements[newIndex];
        newFocusElt?.focus();
        this.currentFocusElt = newFocusElt;
    };
    setIntervalFocus = (delay) => {
        this.timer = setInterval(() => {
            this.focusElement();
        }, delay);
    };
    clearIntervalFocus = () => {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
    createHandler() {
        return (event) => {
            if (event.currentTarget) {
                this.currentFocusElt = event.currentTarget;
            }
        };
    }
}
