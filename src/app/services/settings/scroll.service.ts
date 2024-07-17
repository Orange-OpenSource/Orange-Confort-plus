let scrollServiceIsInstantiated: boolean;

class ScrollService {
	scrollColor = '';
	scrollColorHover = '';
	scrollWidth = '';

	constructor() {
		if (scrollServiceIsInstantiated) {
			throw new Error('ScrollService is already instantiated.');
		}

		scrollServiceIsInstantiated = true;
	}

	setScroll = (value: any): void => {
		stylesServiceInstance.removeStyle('scroll');
		document.body.classList.remove(`${PREFIX}big-scroll`);

		if (value !== DEFAULT_VALUE) {
			document.body.classList.add(`${PREFIX}big-scroll`);

			switch (value.split('_')[0]) {
				case 'bigScroll':
					this.scrollWidth = SCROLL_SIZE_BIG;
					break;
				case 'hugeScroll':
					this.scrollWidth = SCROLL_SIZE_HUGE;
					break;
				default:
					this.scrollWidth = 'inherit';
					break;
			}
			this.scrollColor = value.split('_')[1] ? value.split('_')[1] : 'lightgrey';
			this.scrollColorHover = value.split('_')[2] ? value.split('_')[2] : 'grey';
			this.setScrollClass();
		}
	}

	/* Adds the style required for scrolling functions */
	setScrollClass = (): void => {
		let styleScroll = `
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
					border-radius: 1rem;
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

		stylesServiceInstance.setStyle('scroll', styleScroll);
	}
}
