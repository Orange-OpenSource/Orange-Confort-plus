let readingGuideServiceIsInstantiated: boolean;

class ReadingGuideService {
	topGuideElt: HTMLElement = null;
	bottomGuideElt: HTMLElement = null;
	readingGuideElt: HTMLElement = null;
	guideType: 'rule' | 'mask' | '' = '';
	sizeGuide: number = 40;
	handlerReadingGuide: any;

	classRuleGuide = `
		#${PREFIX}vertical-guide-elt {
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
		#${PREFIX}mask-guide--top-elt,
		#${PREFIX}mask-guide--bottom-elt {
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			left: 0;
			right: 0;
			z-index: 2147483645;
		}
		#${PREFIX}mask-guide--top-elt {
			top: 0;
		}
		#${PREFIX}mask-guide--bottom-elt {
			bottom: 0;
		}
	`;

	constructor() {
		if (readingGuideServiceIsInstantiated) {
			throw new Error('ReadingGuideService is already instantiated.');
		}

		readingGuideServiceIsInstantiated = true;

		this.readingGuideElt = document.querySelector(`#${PREFIX}vertical-guide-elt`);
		this.topGuideElt = document.querySelector(`#${PREFIX}top-guide-elt`);
		this.bottomGuideElt = document.querySelector(`#${PREFIX}bottom-guide-elt`);

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
			readingElt.setAttribute('id', `${PREFIX}vertical-guide-elt`);
			document.body.appendChild(readingElt);
		} else if (this.guideType === 'mask') {
			const maskTopElt = document.createElement('div');
			const maskBottomElt = document.createElement('div');
			maskTopElt.setAttribute('id', `${PREFIX}mask-guide--top-elt`);
			maskBottomElt.setAttribute('id', `${PREFIX}mask-guide--bottom-elt`);
			document.body.appendChild(maskTopElt);
			document.body.appendChild(maskBottomElt);
		}

		document.addEventListener('mousemove', this.handlerReadingGuide);
	}

	resetGuide = (): void => {
		this.guideType = '';
		stylesServiceInstance.removeStyle('reading-guide');
		document.querySelector(`#${PREFIX}vertical-guide-elt`)?.remove();
		document.querySelector(`#${PREFIX}mask-guide--top-elt`)?.remove();
		document.querySelector(`#${PREFIX}mask-guide--bottom-elt`)?.remove();
	}

	createHandlerReadingGuide = () => {
		return (event: Event) => {
			if (event.type === 'mousemove') {
				if (this.guideType === 'rule') {
					(document.querySelector(`#${PREFIX}vertical-guide-elt`) as HTMLElement).style.left = `${(event as MouseEvent).x + 2}px`;
				} else if (this.guideType === 'mask') {
					(document.querySelector(`#${PREFIX}mask-guide--top-elt`) as HTMLElement).style.height = `${(event as MouseEvent).y - this.sizeGuide}px`;
					(document.querySelector(`#${PREFIX}mask-guide--bottom-elt`) as HTMLElement).style.height = `${window.innerHeight - (event as MouseEvent).y - this.sizeGuide}px`;
				}
				event.stopPropagation();
			}
		}
	}
}
