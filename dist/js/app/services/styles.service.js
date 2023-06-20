"use strict";
let stylesServiceIsInstantiated;
class StylesService {
    //@ts-ignore
    prefixStyle = `${PREFIX}style-`;
    constructor() {
        if (stylesServiceIsInstantiated) {
            throw new Error('StylesService is already instantiated.');
        }
        stylesServiceIsInstantiated = true;
    }
    setStyle = (name, style) => {
        if (document.querySelectorAll(`#${this.prefixStyle}${name}`).length === 0) {
            let styleElement = document.createElement('style');
            styleElement.setAttribute('id', `${this.prefixStyle}${name}`);
            styleElement.innerHTML = style;
            document.head.appendChild(styleElement);
        }
        else {
            document.querySelector(`#${this.prefixStyle}${name}`).innerHTML = style;
        }
    };
    removeStyle = (name) => {
        document.querySelector(`#${this.prefixStyle}${name}`)?.remove();
    };
}
