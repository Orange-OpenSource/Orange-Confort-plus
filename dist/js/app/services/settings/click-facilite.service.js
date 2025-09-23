"use strict";
let clickFaciliteServiceIsInstantiated;
class ClickFaciliteService {
    selectedElt;
    delay;
    isClicking = false;
    clickableElements = ['A', 'INPUT', 'SELECT', 'OPTION', 'TEXTAREA', 'LABEL', 'BUTTON'];
    timer = null;
    handlerClickFacilite;
    constructor() {
        if (clickFaciliteServiceIsInstantiated) {
            throw new Error('ClickFaciliteService is already instantiated.');
        }
        clickFaciliteServiceIsInstantiated = true;
        this.handlerClickFacilite = this.createHandlerClickFacilite();
    }
    setClickFacilite = (value) => {
        let paramName = value.split('_')[0];
        this.delay = parseInt(value.split('_')[1]?.replace(/\D/g, ''), 10) * 1000;
        switch (paramName) {
            case CLICK_FACILITE_BIG_ZONE: {
                this.resetEventClick();
                scrollAspectServiceInstance.setScrollAspect('bigScroll');
                // Issue #500 : conflict between "Navigation buttons" et "Click Facilite"
                // scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
                break;
            }
            case CLICK_FACILITE_LONG_CLICK: {
                this.resetEventClick();
                scrollAspectServiceInstance.setScrollAspect('bigScroll');
                // Issue #500 : conflict between "Navigation buttons" et "Click Facilite"
                // scrollTypeServiceInstance.setScrollType('scrollOnClick');
                this.longClick();
                break;
            }
            case CLICK_FACILITE_AUTO_CLICK: {
                this.resetEventClick();
                scrollAspectServiceInstance.setScrollAspect('bigScroll');
                // Issue #500 : conflict between "Navigation buttons" et "Click Facilite"
                // scrollTypeServiceInstance.setScrollType('scrollOnMouseover');
                this.autoClick();
                break;
            }
            default: {
                scrollAspectServiceInstance.setScrollAspect(DEFAULT_VALUE);
                scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
                this.resetEventClick();
                break;
            }
        }
    };
    getClickableElt = (event) => {
        let pointedElt = event.target;
        let closestPointedElt = pointedElt.closest(this.clickableElements.join(','));
        return this.clickableElements.includes(pointedElt.nodeName) ? pointedElt :
            closestPointedElt ? closestPointedElt : pointedElt;
    };
    longClick = () => {
        document.addEventListener('click', this.handlerClickFacilite);
        document.addEventListener('mousedown', this.handlerClickFacilite);
        document.addEventListener('mouseup', this.handlerClickFacilite);
    };
    autoClick = () => {
        document.addEventListener('mouseover', this.handlerClickFacilite);
        document.addEventListener('mouseout', this.handlerClickFacilite);
    };
    resetEventClick = () => {
        document.removeEventListener('click', this.handlerClickFacilite);
        document.removeEventListener('mouseover', this.handlerClickFacilite);
        document.removeEventListener('mouseout', this.handlerClickFacilite);
        document.removeEventListener('mousedown', this.handlerClickFacilite);
        document.removeEventListener('mouseup', this.handlerClickFacilite);
    };
    doClick = (elt) => {
        if (this.clickableElements.includes(elt.nodeName)) {
            switch (elt.nodeName) {
                case 'A':
                case 'AREA':
                    this.clickLink(elt);
                    break;
                case 'INPUT':
                    this.clickInput(elt);
                    break;
                case 'SELECT':
                case 'TEXTAREA':
                    elt.focus();
                    break;
                case 'OPTION':
                    this.selectOption(elt);
                    break;
                case 'LABEL':
                    document.getElementById(elt.htmlFor).click();
                    break;
                default:
                    elt.click();
                    break;
            }
        }
        else if (elt.onclick && elt.onclick !== null) {
            elt.onclick();
        }
        else {
            elt.click();
        }
    };
    clickLink = (elt) => {
        if (elt.href && elt.href !== "") {
            window.location = elt.href;
        }
    };
    clickInput = (elt) => {
        elt.focus();
        switch (elt.type) {
            case 'radio':
                elt.checked = true;
                break;
            case 'checkbox':
                elt.checked = !elt.checked;
                break;
        }
    };
    selectOption = (elt) => {
        let options = elt.closest('SELECT')?.options;
        for (var i = 0; i < options.length; i++) {
            if (options[i].text === elt.text) {
                options[i].selected = true;
                elt.focus();
            }
            else {
                options[i].selected = false;
            }
        }
    };
    createHandlerClickFacilite = () => {
        return (event) => {
            switch (event.type) {
                case 'click':
                    event.preventDefault();
                    break;
                case 'mousedown':
                case 'mouseover':
                    this.setTimeoutClick(event);
                    break;
                case 'mouseup':
                case 'mouseout':
                    this.clearTimeout();
                    break;
            }
        };
    };
    setTimeoutClick = (event) => {
        this.timer = setTimeout(() => {
            this.doClick(this.getClickableElt(event));
        }, this.delay);
    };
    clearTimeout = () => {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
    };
}
