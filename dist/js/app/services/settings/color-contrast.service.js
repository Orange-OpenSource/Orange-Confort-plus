"use strict";
let colorContrastServiceIsInstantiated;
;
class ColorContrastService {
    colorContrastDictionnary = [
        { name: DEFAULT_VALUE, cursor: DEFAULT_VALUE, focus: DEFAULT_VALUE, scroll: DEFAULT_VALUE, link: DEFAULT_VALUE },
        { name: 'reinforcedContrasts', cursor: 'bigCursor_black', focus: 'big_black', scroll: 'big_black', link: 'darkblue_orange_brown' },
        { name: 'ivory_black', cursor: 'bigCursor_ivory', focus: 'big_ivory', scroll: 'big_ivory', link: 'lightblue_orange_lightgreen' },
        { name: 'black_ivory', cursor: 'bigCursor_black', focus: 'big_black', scroll: 'big_black', link: 'darkblue_orange_brown' },
        { name: 'white_red', cursor: 'bigCursor_white', focus: 'big_white', scroll: 'big_white', link: 'yellow_darkblue_lightgreen' },
        { name: 'black_yellow', cursor: 'bigCursor_black', focus: 'big_black', scroll: 'big_black', link: 'darkblue_purple_darkgreen' },
        { name: 'white_blue', cursor: 'bigCursor_white', focus: 'big_white', scroll: 'big_white', link: 'yellow_orange_lightgreen' },
        { name: 'yellow_blue', cursor: 'bigCursor_yellow', focus: 'big_yellow', scroll: 'big_yellow', link: 'white_darkgreen_lightgreen' },
        { name: 'black_green', cursor: 'bigCursor_black', focus: 'big_black', scroll: 'big_black', link: 'yellow_orange_blue' }
    ];
    /* Daltonism type deuteranomaly */
    matrixFilter = `
		0.8,   0.2,   0,     0, 0
    0.258, 0.742, 0,     0, 0
    0,     0.142, 0.858, 0, 0
    0,     0,     0,     1, 0`;
    svgFilterDaltonism = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="daltonism"><feColorMatrix in="SourceGraphic" type="matrix" values="${this.matrixFilter.replace(/\s+/g, ' ').trim()}"/></filter></svg>`;
    styleFilterDaltonism = `
		html body > *:not(${APP_NAME}) {
			filter: url('data:image/svg+xml;utf8,${this.svgFilterDaltonism}#daltonism');
		}
	`;
    constructor() {
        if (colorContrastServiceIsInstantiated) {
            throw new Error('ColorContrastService is already instantiated.');
        }
        colorContrastServiceIsInstantiated = true;
    }
    setColorsContrasts = (value) => {
        stylesServiceInstance.removeStyle('color-contrast');
        stylesServiceInstance.removeStyle('filter-daltonism');
        this.setServices(DEFAULT_VALUE);
        switch (value) {
            case DEFAULT_VALUE:
                break;
            case 'daltonism':
                stylesServiceInstance.setStyle('filter-daltonism', this.styleFilterDaltonism);
                break;
            case 'reinforcedContrasts':
            default:
                let color;
                let backgroundColor;
                if (value === 'reinforcedContrasts') {
                    color = '#000';
                    backgroundColor = '#fff';
                    this.setServices('reinforcedContrasts');
                }
                else {
                    color = value?.split('_')[0];
                    backgroundColor = value?.split('_')[1];
                    this.setServices(`${color}_${backgroundColor}`);
                }
                this.setColorContrastStyle(color, backgroundColor);
                break;
        }
    };
    setColorContrastStyle = (color, backgroundColor) => {
        let styleColorContrast = `
			*:not(.${PREFIX}container-buttons) {
				color: ${color} !important;
				background-color: ${backgroundColor} !important;
			}

			fieldset,
			button {
				border-color: ${color} !important;
			}

			input, td, th {
				border: 2px solid ${color} !important;
			}

			td, th {
				padding: .2em !important;
			}

			table {
				border-collapse: collapse !important;
			}
		`;
        stylesServiceInstance.setStyle('color-contrast', styleColorContrast);
    };
    setServices = (value) => {
        const colorParams = this.colorContrastDictionnary.find((o) => o.name === value);
        cursorAspectServiceInstance.setCursor(colorParams?.cursor);
        focusAspectServiceInstance.setFocus(colorParams?.focus);
        scrollAspectServiceInstance.setScrollAspect(colorParams?.scroll);
        linkStyleServiceInstance.setLinkStyle(colorParams?.link);
    };
}
