"use strict";
let textSizeServiceIsInstantiated;
class TextSizeService {
    constructor() {
        if (textSizeServiceIsInstantiated) {
            throw new Error('TextSizeService is already instantiated.');
        }
        textSizeServiceIsInstantiated = true;
    }
    setFontSize = (value) => {
        const nbValue = Number(value);
        const fontSize = value === DEFAULT_VALUE ? null : `${value}%`;
        document.documentElement.style.fontSize = fontSize;
        const lineHeight = !isNaN(nbValue) && (nbValue >= 130) ? `${0.75 * nbValue / 100}` : DEFAULT_VALUE;
        document.documentElement.style.lineHeight = lineHeight;
        const layoutState = (nbValue >= 200) ? 'active' : DEFAULT_VALUE;
        deleteLayoutServiceInstance.setDeleteLayout(layoutState);
    };
}
