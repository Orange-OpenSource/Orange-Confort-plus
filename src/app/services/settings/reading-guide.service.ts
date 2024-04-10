let readingGuideServiceIsInstantiated: boolean;

class ReadingGuideService {
	topGuideElt: HTMLElement = null;
	bottomGuideElt: HTMLElement = null;
	readingGuideElt: HTMLElement = null;
	guideType: 'rule' | 'mask' | '' = '';
	sizeGuide: number = 40;
	handlerReadingGuide: any;

	classRuleGuide = `
		#cplus-vertical-guide-elt {
			border-left: 4px solid black;
			background: white;
			height: 100%;
			width: 6px;
			position: fixed;
			top: 0;
			z-index: 2147483645;
		}
	`;

	classMaskGuide = `
		#cplus-mask-guide--top-elt,
		#cplus-mask-guide--bottom-elt {
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			left: 0;
			right: 0;
			z-index: 2147483645;
		}
		#cplus-mask-guide--top-elt {
			top: 0;
		}
		#cplus-mask-guide--bottom-elt {
			bottom: 0;
		}
	`;

	constructor() {
		if (readingGuideServiceIsInstantiated) {
			throw new Error('ReadingGuideService is already instantiated.');
		}

		readingGuideServiceIsInstantiated = true;

		this.readingGuideElt = document.querySelector('#cplus-vertical-guide-elt');
		this.topGuideElt = document.querySelector('#cplus-top-guide-elt');
		this.bottomGuideElt = document.querySelector('#cplus-bottom-guide-elt');

		this.handlerReadingGuide = this.createHandlerReadingGuide();
	}

	setReadingMaskGuide = (value: string): void => {
		switch (value) {
			case 'ruleGuide': {
				this.resetGuide();
				this.guideType = 'rule';
				this.setGuide();
				break;
			}
			case 'maskGuide': {
				this.resetGuide();
				this.guideType = 'mask';
				this.setGuide();
				break;
			}
			default: {
				this.resetGuide();
			}
		}
	}

	setGuide = (): void => {
		let styleGuide = '';
		if (this.guideType === 'rule') {
			styleGuide = this.classRuleGuide;
		} else if (this.guideType === 'mask') {
			styleGuide = this.classMaskGuide;
		}

		stylesServiceInstance.setStyle('reading-guide', styleGuide);

		if (this.guideType === 'rule') {
			const readingElt = document.createElement('div');
			readingElt.setAttribute('id', 'cplus-vertical-guide-elt');
			document.body.appendChild(readingElt);
		} else if (this.guideType === 'mask') {
			const maskTopElt = document.createElement('div');
			const maskBottomElt = document.createElement('div');
			maskTopElt.setAttribute('id', 'cplus-mask-guide--top-elt');
			maskBottomElt.setAttribute('id', 'cplus-mask-guide--bottom-elt');
			document.body.appendChild(maskTopElt);
			document.body.appendChild(maskBottomElt);
		}

		document.addEventListener('mousemove', this.handlerReadingGuide);
	}

	resetGuide = (): void => {
		this.guideType = '';
		stylesServiceInstance.removeStyle('reading-guide');
		document.querySelector('#cplus-vertical-guide-elt')?.remove();
		document.querySelector('#cplus-mask-guide--top-elt')?.remove();
		document.querySelector('#cplus-mask-guide--bottom-elt')?.remove();
	}

	createHandlerReadingGuide = () => {
		return (event: Event) => {
			if (event.type === 'mousemove') {
				if (this.guideType === 'rule') {
					(document.querySelector('#cplus-vertical-guide-elt') as HTMLElement).style.left = `${(event as MouseEvent).x + 2}px`;
				} else if (this.guideType === 'mask') {
					(document.querySelector('#cplus-mask-guide--top-elt') as HTMLElement).style.height = `${(event as MouseEvent).y - this.sizeGuide}px`;
					(document.querySelector('#cplus-mask-guide--bottom-elt') as HTMLElement).style.height = `${window.innerHeight - (event as MouseEvent).y - this.sizeGuide}px`;
				}
				event.stopPropagation();
			}
		}
	}
}