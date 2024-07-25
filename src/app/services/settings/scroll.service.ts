let scrollServiceIsInstantiated: boolean;

class ScrollService {
	scrollColor = '';
	scrollColorHover = '';
	scrollWidth = '';
	scrollColorValues = [
		{ color: 'white', hover: 'lightgrey' },
		{ color: 'blue', hover: 'darkblue' },
		{ color: 'red', hover: 'darkred' },
		{ color: 'yellow', hover: 'gold' },
		{ color: 'green', hover: 'darkgreen' },
		{ color: 'black', hover: 'darkgrey' }
	];

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

			switch (value?.split('_')[0]) {
				case 'big':
					this.scrollWidth = SCROLL_SIZE_BIG;
					break;
				case 'huge':
					this.scrollWidth = SCROLL_SIZE_HUGE;
					break;
				default:
					this.scrollWidth = 'inherit';
					break;
			}
			this.scrollColor = value?.split('_')[1] ? value?.split('_')[1] : 'lightgrey';
			let colorHover = this.scrollColorValues.find((o: any) => o.color === this.scrollColor)?.hover;
			this.scrollColorHover = colorHover ? colorHover : 'grey';
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
