"use strict";
let marginAlignServiceIsInstantiated;
class MarginAlignService {
    alignLeftStyle = `
		p {
			text-align: left !important;
		}
	`;
    marginStyle = `
		p, h1, h2, h3, h4, h5, h6 {
			position: relative;
			text-align: left !important;
			margin-left: 1lh !important;
		}

		p *, h1 *, h2 *, h3 *, h4 *, h5 *, h6 * {
			margin-left: 0 !important;
		}
	`;
    marginLeftStyle = `
		${this.marginStyle}

		p:before, h1:before, h2:before, h3:before, h4:before, h5:before, h6:before {
			content: "";
			background: currentColor;
			border-radius: 10px;
			width: 12px;
			height: 100%;
			position: absolute;
			left: -24px;
		}
	`;
    marginListStyle = `
		${this.marginStyle}

		ul, ol {
			list-style-position: initial !important;
			list-style-image: none !important;
			list-style-type: decimal !important;
		}

		p:before, h1:before, h2:before, h3:before, h4:before, h5:before, h6:before {
			content: "";
			background: radial-gradient(ellipse at center, currentColor 10%, currentColor 30%, transparent 30%);
			background-repeat: repeat-y;
			background-position-x: right;
			background-size: 1lh 1lh;
			width: 1lh;
			height: 100%;
			position: absolute;
			left: -1lh;
		}
	`;
    constructor() {
        if (marginAlignServiceIsInstantiated) {
            throw new Error('MarginAlignService is already instantiated.');
        }
        marginAlignServiceIsInstantiated = true;
    }
    setMargin = (value) => {
        stylesServiceInstance.removeStyle('align-left');
        stylesServiceInstance.removeStyle('margin-left');
        stylesServiceInstance.removeStyle('margin-list');
        switch (value) {
            case 'alignLeft': {
                stylesServiceInstance.setStyle('align-left', this.alignLeftStyle);
                break;
            }
            case 'marginLeft': {
                stylesServiceInstance.setStyle('margin-left', this.marginLeftStyle);
                break;
            }
            case 'marginList': {
                stylesServiceInstance.setStyle('margin-list', this.marginListStyle);
                break;
            }
        }
    };
}
