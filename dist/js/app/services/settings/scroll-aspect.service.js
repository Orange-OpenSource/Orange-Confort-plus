"use strict";
let scrollAspectServiceIsInstantiated;
class ScrollAspectService {
    scrollColor = '';
    scrollColorHover = '';
    scrollBorderColor = '';
    scrollWidth = '';
    scrollColorValues = [
        { color: 'white', hover: 'lightgrey', border: 'black' },
        { color: 'blue', hover: 'darkblue', border: 'blue' },
        { color: 'red', hover: 'darkred', border: 'red' },
        { color: 'yellow', hover: 'gold', border: 'yellow' },
        { color: 'green', hover: 'darkgreen', border: 'green' },
        { color: 'black', hover: 'darkgrey', border: 'black' }
    ];
    constructor() {
        if (scrollAspectServiceIsInstantiated) {
            throw new Error('ScrollAspectService is already instantiated.');
        }
        scrollAspectServiceIsInstantiated = true;
    }
    setScrollAspect = (value) => {
        stylesServiceInstance.removeStyle('scroll-aspect');
        document.body.classList.remove(`${PREFIX}big-scroll`);
        if (value !== DEFAULT_VALUE) {
            document.body.classList.add(`${PREFIX}big-scroll`);
            switch (value?.split('_')[0]) {
                case 'big':
                    this.scrollWidth = SCROLL_SIZE_BIG;
                    break;
                case 'huge':
                    this.scrollWidth = SCROLL_SIZE_HUGE;
                    break;
                default:
                    this.scrollWidth = 'auto';
                    break;
            }
            this.scrollColor = value?.split('_')[1] ? value?.split('_')[1] : 'lightgrey';
            let colorHover = this.scrollColorValues.find((o) => o.color === this.scrollColor)?.hover;
            let borderColor = this.scrollColorValues.find((o) => o.color === this.scrollColor)?.border;
            this.scrollColorHover = colorHover ? colorHover : 'grey';
            this.scrollBorderColor = borderColor ? borderColor : 'grey';
            this.setScrollClass();
        }
    };
    /* Adds the style required for scrolling functions */
    setScrollClass = () => {
        let styleScroll = `
				html {
					overflow: initial !important;
				}

				.d-none {
					display: none;
				}

				/* WebKit (Chrome, Safari) */
				.${PREFIX}big-scroll::-webkit-scrollbar,
				.${PREFIX}big-scroll *::-webkit-scrollbar {
					width: ${this.scrollWidth};
				}
				.${PREFIX}big-scroll::-webkit-scrollbar-thumb,
				.${PREFIX}big-scroll *::-webkit-scrollbar-thumb {
					background-color: ${this.scrollColor};
					border: 1px solid ${this.scrollBorderColor};
					border-radius: 10px;
					width: ${this.scrollWidth};
					cursor: pointer;
				}
				.${PREFIX}big-scroll::-webkit-scrollbar-thumb:hover,
				.${PREFIX}big-scroll *::-webkit-scrollbar-thumb:hover {
					background-color: ${this.scrollColorHover};
				}

				/* Firefox */
				@-moz-document url-prefix() {
					.${PREFIX}big-scroll,
					.${PREFIX}big-scroll * {
						scrollbar-width: auto;
						scrollbar-color: ${this.scrollColor} transparent;
					}
					.${PREFIX}big-scroll:hover,
					.${PREFIX}big-scroll *:hover {
						scrollbar-color: ${this.scrollColorHover} transparent;
					}
				}
			`;
        stylesServiceInstance.setStyle('scroll-aspect', styleScroll);
    };
}
