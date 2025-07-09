let readingGuideServiceIsInstantiated: boolean;

class ReadingGuideService {
	guideType: 'rule' | 'mask' | 'alternatingLines' |'' = '';
	sizeGuide: number = 40;
	handler: any;

	horizontalGuideID = `${PREFIX}horizontal-guide-elt`;
	maskTopEltID = `${PREFIX}mask-guide__top-elt`;
	maskBottomEltID = `${PREFIX}mask-guide__bottom-elt`;
	closeTextID = `${PREFIX}mask-guide__close-text`;

	classRuleGuide = `
		#${this.horizontalGuideID} {
			border-top: 4px solid black;
			border-bottom: 4px solid white;
			background: black;
			height: 1px;
			width: 100%;
			position: fixed;
			left: 0;
			z-index: calc(infinity);
		}
	`;

	classMaskGuide = `
		#${this.maskTopEltID},
		#${this.maskBottomEltID} {
			background: rgba(0, 0, 0, 0.5) !important;
			position: fixed;
			left: 0;
			right: 0;
			z-index: calc(infinity);
		}
		#${this.maskTopEltID} {
			top: 0;
		}
		#${this.maskBottomEltID} {
			bottom: 0;
		}

		#${this.closeTextID} {
			background: rgba(255, 255, 255, 0.4) !important;
			padding: 0.25em 1em;
			position: fixed;
			left: 0;
			line-height: 2em;
			transform: translate(0, -100%);
			z-index: calc(infinity);
		}
	`;
	classAlternatingLinesGuide = `
	${PAGE_P_MARKUP_SELECTOR} {
		background: repeating-linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.4) 0 1lh,
			rgba(0, 0, 0, 0.2) 1lh 2lh
		)
	}
	`;

	constructor() {
		if (readingGuideServiceIsInstantiated) {
			throw new Error('ReadingGuideService is already instantiated.');
		}

		readingGuideServiceIsInstantiated = true;

		this.handler = this.createHandler();
	}

	setReadingMaskGuide = (value: string): void => {
		switch (value) {
			case 'ruleGuide':
				this.resetGuide();
				this.guideType = 'rule';
				this.setGuide();
				break;
			case 'maskGuide':
				this.resetGuide();
				this.guideType = 'mask';
				this.setGuide();
				break;
			case 'alternatingLines':
				this.resetGuide();
				this.guideType = 'alternatingLines';
				this.setGuide();
				break;
			default:
				this.resetGuide();
		}
	}

	setGuide = (): void => {
		let styleGuide = '';
		if (this.guideType === 'rule') {
			styleGuide = this.classRuleGuide;
		} else if (this.guideType === 'mask') {
			styleGuide = this.classMaskGuide;
		} else if (this.guideType === 'alternatingLines') {
			this.setPagePMarkupElementsFlag();
			styleGuide = this.classAlternatingLinesGuide;
		}

		stylesServiceInstance.setStyle('reading-guide', styleGuide);

		if (this.guideType === 'rule') {
			const readingElt = document.createElement('div');
			readingElt.setAttribute('id', `${this.horizontalGuideID}`);
			document.body.insertBefore(readingElt, document.querySelector(APP_NAME));
		} else if (this.guideType === 'mask') {
			const maskTopElt = document.createElement('div');
			const maskBottomElt = document.createElement('div');
			const closeMask = document.createElement('span');
			maskTopElt.setAttribute('id', `${this.maskTopEltID}`);
			maskBottomElt.setAttribute('id', `${this.maskBottomEltID}`);
			closeMask.setAttribute('id', `${this.closeTextID}`);
			closeMask.innerText = i18nServiceInstance.getMessage('readingGuide_closeMask');
			document.body.insertBefore(maskTopElt, document.querySelector(APP_NAME));
			document.body.insertBefore(maskBottomElt, document.querySelector(APP_NAME));
			document.body.insertBefore(closeMask, document.querySelector(APP_NAME));
		}

		document.addEventListener('mousemove', this.handler);
	}

	resetGuide = (): void => {
		this.guideType = '';
		stylesServiceInstance.removeStyle('reading-guide');
		document.querySelector(`#${this.horizontalGuideID}`)?.remove();
		document.querySelector(`#${this.maskTopEltID}`)?.remove();
		document.querySelector(`#${this.maskBottomEltID}`)?.remove();
		document.querySelector(`#${this.closeTextID}`)?.remove();
		document.removeEventListener('mousemove', this.handler);
		this.removePagePMarkupElementsFlag();
	}

	setPagePMarkupElementsFlag = (): void => {
		const elts = document.querySelectorAll(PAGE_P_MARKUP_SELECTOR);
		elts.forEach((elt) => {
			if (!elt.classList.contains(TEXT_ALTERNATE_LINES)) {
				elt.classList.add(TEXT_ALTERNATE_LINES);
			}
		});
	}

	removePagePMarkupElementsFlag = (): void => {
		const elts = document.querySelectorAll(PAGE_P_MARKUP_SELECTOR);
		elts.forEach((elt) => {
			if (elt.classList.contains(TEXT_ALTERNATE_LINES)) {
				elt.classList.remove(TEXT_ALTERNATE_LINES);
			}
		});
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'mousemove':
					if (this.guideType === 'rule') {
						(document.querySelector(`#${PREFIX}horizontal-guide-elt`) as HTMLElement).style.top = `${(event as MouseEvent).y + 2}px`;
					} else if (this.guideType === 'mask') {
						(document.querySelector(`#${this.maskTopEltID}`) as HTMLElement).style.height = `${(event as MouseEvent).y - this.sizeGuide}px`;
						(document.querySelector(`#${this.maskBottomEltID}`) as HTMLElement).style.height = `${window.innerHeight - (event as MouseEvent).y - this.sizeGuide}px`;
						(document.querySelector(`#${this.closeTextID}`) as HTMLElement).style.top = `${(event as MouseEvent).y - this.sizeGuide}px`;
					}
					event.stopPropagation();
					break;
			}
		}
	}
}
