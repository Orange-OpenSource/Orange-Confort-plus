let scrollAspectServiceIsInstantiated: boolean;

class ScrollAspectService {
	isInitialized = false;
	scrollColor = '';
	scrollColorHover = '';
	scrollBorderColor = '';
	scrollWidth = '';
	originalValuesFixedRightElements: any[] = []
	processedElements = new WeakSet<Element>()
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

	moveFixedElements(root :any, offset = 30) {
			const elements = root.querySelectorAll('*');
			
			elements.forEach((element :any) => {
				// Vérifier si l'élément a déjà été traité
				if (this.processedElements.has(element)) {
					return;
				}

				const computedStyle = window.getComputedStyle(element);
				// Vérifier si l'élément est en position fixed
				if (computedStyle.position === 'fixed') {
					if (element.id !== 'cf-custom-scrollbar') {
						// Récupérer la valeur actuelle de right ou left
						let currentRight = computedStyle.right;	
						// Décaler de 30px vers la droite
						if (currentRight !== 'auto' && currentRight !== '') {
							// Si right est défini, on le diminue de  offset px
							let rightValue = parseInt(currentRight) + offset;
							element.style.setProperty('right',rightValue+'px' , 'important');
							this.originalValuesFixedRightElements.push({ element: element, originalRight: currentRight });
							// Marquer l'élément comme traité
							this.processedElements.add(element);
						}	
					}
				}
				// Parcourir le Shadow DOM si présent
				if (element.shadowRoot) {
					this.moveFixedElements(element.shadowRoot, offset);
				}
			});
	}

	/* Restaure les éléments à leur état initial */
	restoreFixedElements() {
		this.originalValuesFixedRightElements.forEach(({ element, originalRight }) => {
			if (element && element.style) {
				element.style.setProperty('right', originalRight, 'important');
			}
		});
		this.originalValuesFixedRightElements = [];
		this.processedElements = new WeakSet<Element>();
	}

	isFirefox() {
		const userAgent = navigator.userAgent.toLowerCase();
		return userAgent.includes('firefox');
	}

	setScrollAspect = (value: any): void => {
		console.log('ScrollAspectService - setScrollAspect ')
		stylesServiceInstance.removeStyle('scroll-aspect');
		stylesServiceInstance.removeStyle('firefox-hide-scrollbar');
		document.body.classList.remove(`${PREFIX}big-scroll`);
		document.body.classList.remove(`${PREFIX}huge-scroll`);
		this.restoreFixedElements()

		console.log('#value scroll aspect ', value);
		if (value !== DEFAULT_VALUE) {
			document.body.classList.add(`${PREFIX}big-scroll`);

			switch (value?.split('_')[0]) {
				case 'big':
					this.scrollWidth = SCROLL_SIZE_BIG;
					if ( this.isFirefox()) {
						this.moveFixedElements(document, 30);
						this.hideFirefoxScrollBrClass();
					}
					break;
				case 'huge':
					this.scrollWidth = SCROLL_SIZE_HUGE;
					document.body.classList.add(`${PREFIX}huge-scroll`);
					if ( this.isFirefox()) {
						this.moveFixedElements(document, 42);
						this.hideFirefoxScrollBrClass();
					}
					break;
				default:
					this.scrollWidth = 'auto';
					break;
			}
			if (  !this.isInitialized && this.isFirefox())  {
					domServiceInstance.addCustomScroolBar();
					this.isInitialized = true;	
			}
			this.scrollColor = value?.split('_')[1] ? value?.split('_')[1] : 'lightgrey';
			let colorHover = this.scrollColorValues.find((o: any) => o.color === this.scrollColor)?.hover;
			let borderColor = this.scrollColorValues.find((o: any) => o.color === this.scrollColor)?.border;
			this.scrollColorHover = colorHover ? colorHover : 'grey';
			this.scrollBorderColor = borderColor ? borderColor : 'grey';
			this.setScrollClass();

		}
	}

	/* Adds the style required for scrolling functions */
	setScrollClass = (): void => {
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
					background-color: red;
					border: 1px solid ${this.scrollBorderColor};
					border-radius: 10px;
					width: ${this.scrollWidth};
					cursor: pointer;
				}
				.${PREFIX}big-scroll::-webkit-scrollbar-thumb:hover,
				.${PREFIX}big-scroll *::-webkit-scrollbar-thumb:hover {
					background-color: ${this.scrollColorHover};
				}

			
			`;

		stylesServiceInstance.setStyle('scroll-aspect', styleScroll);
	}

	hideFirefoxScrollBrClass = (): void => {
		let styleScroll = `
				html {
					scrollbar-width: none;
					width: calc(100% - 40px);
				}
			`;

		stylesServiceInstance.setStyle('firefox-hide-scrollbar', styleScroll);
	}

	
}
