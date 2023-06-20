"use strict";
let navigationButtonsServiceIsInstantiated = false;
class NavigationButtonsService {
    currentFocusElt;
    handlerNavigationButtons;
    navigationButtonSet = DEFAULT_VALUE;
    delay = 0;
    hoverTimeoutIds = {};
    constructor() {
        if (navigationButtonsServiceIsInstantiated) {
            throw new Error('NavigationButtonsService is already instantiated.');
        }
        navigationButtonsServiceIsInstantiated = true;
        this.handlerNavigationButtons = this.createHandlerNavigationButtons();
    }
    navigationButtonsList = ['escape', 'start', 'previous', 'next', 'click'];
    fullButtonsList = ['escape', 'start', 'content', 'previous', 'next', 'click'];
    currentList = this.navigationButtonsList;
    setNavigationButtons = (value) => {
        this.navigationButtonSet = value.split("_")[0];
        this.delay = this.getDelay(value.split('_')[1]);
        this.resetNavigationButtons();
        switch (this.navigationButtonSet) {
            case 'scrollSet':
                this.currentList = [];
                if (this.delay <= 0) {
                    scrollTypeServiceInstance.setScrollType('scrollOnClick');
                }
                else {
                    scrollTypeServiceInstance.setScrollType('scrollOnMouseover', this.delay);
                }
                break;
            case 'navigationSet':
                this.currentList = this.navigationButtonsList;
                this.getFocusedElement();
                this.addNavigationButtons();
                break;
            case 'fullSet':
                this.currentList = this.fullButtonsList;
                this.getFocusedElement();
                this.addNavigationButtons();
                if (this.delay <= 0) {
                    scrollTypeServiceInstance.setScrollType('scrollOnClick');
                }
                else {
                    scrollTypeServiceInstance.setScrollType('scrollOnMouseover', this.delay);
                }
                break;
            default:
                break;
        }
    };
    resetNavigationButtons = () => {
        scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
        this.currentList.forEach((navigationButton) => {
            domServiceInstance.removeButtonsInDom(navigationButton);
            if (this.hoverTimeoutIds[navigationButton]) {
                clearTimeout(this.hoverTimeoutIds[navigationButton]);
                this.hoverTimeoutIds[navigationButton] = null;
            }
        });
        document.removeEventListener('click', this.handlerNavigationButtons);
        document.removeEventListener('focusout', this.handlerNavigationButtons);
    };
    addNavigationButtons = () => {
        this.currentList.forEach((navigationButton) => {
            domServiceInstance.addButtonsInDom(navigationButton);
            let btnNav = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${navigationButton}`);
            if (btnNav) {
                btnNav.addEventListener('mousedown', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.simulateKeyEvent(navigationButton);
                });
                if (this.delay > 0) {
                    btnNav.addEventListener('mouseenter', () => {
                        if (this.hoverTimeoutIds[navigationButton]) {
                            clearTimeout(this.hoverTimeoutIds[navigationButton]);
                        }
                        this.hoverTimeoutIds[navigationButton] = window.setTimeout(() => {
                            this.simulateKeyEvent(navigationButton);
                            this.hoverTimeoutIds[navigationButton] = null;
                        }, this.delay);
                    });
                    btnNav.addEventListener('mouseleave', () => {
                        if (this.hoverTimeoutIds[navigationButton]) {
                            clearTimeout(this.hoverTimeoutIds[navigationButton]);
                            this.hoverTimeoutIds[navigationButton] = null;
                        }
                    });
                }
            }
        });
    };
    simulateKeyEvent = (name) => {
        switch (name) {
            case 'next':
                this.focusElement('next');
                break;
            case 'previous':
                this.focusElement('previous');
                break;
            case 'click':
                this.currentFocusElt?.click();
                break;
            case 'escape':
                this.simulateKeydownEscape();
                break;
            case 'start':
                restartTopLeftServiceInstance.setRestartTopLeft();
                break;
            case 'content':
                skipToContentServiceInstance.setSkipToContent();
                break;
            default:
                break;
        }
    };
    focusElement = (direction) => {
        const focusableElements = domServiceInstance.getFocusableElements();
        let newIndex = 0;
        if (this.currentFocusElt) {
            const currentIndex = focusableElements.indexOf(this.currentFocusElt);
            newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
            newIndex = newIndex > focusableElements.length - 1 ? 0 : newIndex < 0 ? focusableElements.length - 1 : newIndex;
        }
        const newFocusElt = focusableElements[newIndex];
        newFocusElt?.focus();
        this.currentFocusElt = newFocusElt;
    };
    getFocusedElement = () => {
        document.addEventListener('focus', this.handlerNavigationButtons);
    };
    simulateKeydownEscape = () => {
        var event = new KeyboardEvent('keydown', {
            key: 'Escape',
            keyCode: 27,
            code: 'Escape',
            which: 27,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    };
    createHandlerNavigationButtons = () => {
        return (event) => {
            if (event.type === 'focusout') {
                this.currentFocusElt = event.currentTarget;
            }
        };
    };
    getDelay = (delay) => {
        if (delay !== 'clicAction') {
            return parseInt(delay?.replace(/\D/g, ''), 10) * 1000;
        }
        return 0;
    };
}
