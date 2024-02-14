const tmplReadingGuide: HTMLTemplateElement = document.createElement('template');
tmplReadingGuide.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="readingMask" data-icon="Reading_Ruler"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ReadingGuideComponent extends AbstractSetting {
	topGuideElt: HTMLElement = null;
	bottomGuideElt: HTMLElement = null;
	readingGuideElt: HTMLElement = null;
	guideType: 'reading' | 'mask' | '' = '';
	sizeGuide: number = 40;

	activesValues = {
		"values": "noModifications,readingGuide,maskGuide",
		"activeValue": 0
	};

	classReadingGuide = `
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
		super();

		this.setCallback(this.setReadingMaskGuide.bind(this));

		this.appendChild(tmplReadingGuide.content.cloneNode(true));

		this.readingGuideElt = this.querySelector('#cplus-vertical-guide-elt');
		this.topGuideElt = this.querySelector('#cplus-top-guide-elt');
		this.bottomGuideElt = this.querySelector('#cplus-bottom-guide-elt');

		this.handler = this.createHandler();
	}

	setReadingMaskGuide = (value: string): void => {
		switch (value) {
			case 'readingGuide': {
				this.resetGuide();
				this.guideType = 'reading';
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
		if (this.guideType === 'reading') {
			styleGuide = this.classReadingGuide;
		} else if (this.guideType === 'mask') {
			styleGuide = this.classMaskGuide;
		}

		stylesServiceInstance.setStyle(this.name, styleGuide);

		if (this.guideType === 'reading') {
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

		document.addEventListener('mousemove', this.handler);
	}

	disconnectedCallback(): void {
		document.removeEventListener('mousemove', this.handler);
	}

	resetGuide = (): void => {
		this.guideType = '';
		stylesServiceInstance.removeStyle(this.name);
		document.querySelector('#cplus-vertical-guide-elt')?.remove();
		document.querySelector('#cplus-mask-guide--top-elt')?.remove();
		document.querySelector('#cplus-mask-guide--bottom-elt')?.remove();
	}

	createHandler() {
		return (event: Event) => {
			if (event.type === 'mousemove') {
				if (this.guideType === 'reading') {
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

customElements.define('app-reading-guide', ReadingGuideComponent);
