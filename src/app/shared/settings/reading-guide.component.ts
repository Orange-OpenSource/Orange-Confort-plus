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
			border-left: 1px solid black;
			height: 100%;
			position: fixed;
			top: 0;
		}
	`;

	classMaskGuide = `
		#cplus-mask-guide--top-elt,
		#cplus-mask-guide--bottom-elt {
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			left: 0;
			right: 0;
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
	}

	connectedCallback(): void {
		super.connectedCallback('readingGuide');
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn?.removeEventListener('changeSettingEvent', () => { });
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
		let classGuide = '';
		if (this.guideType === 'reading') {
			classGuide = this.classReadingGuide;
		} else if (this.guideType === 'mask') {
			classGuide = this.classMaskGuide;
		}

		if (document.querySelectorAll('#cplus-reading-guide').length === 0) {
			// @todo - trouver un moyen de ne pas dupliquer l'ajout de style dans le head dans chaque réglage
			let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
			// @todo - tester si on peut utiliser les adoptedStylesheet
			let stylesReadingGuide: HTMLStyleElement = document.createElement('style');
			stylesReadingGuide.setAttribute('id', 'cplus-reading-guide');
			stylesReadingGuide.innerHTML = classGuide;
			head.appendChild(stylesReadingGuide);
		}

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

		document.addEventListener('mousemove', (event: MouseEvent) => {
			if (this.guideType === 'reading') {
				(document.querySelector('#cplus-vertical-guide-elt') as HTMLElement).style.left = `${event.x + 2}px`;
			} else if (this.guideType === 'mask') {
				(document.querySelector('#cplus-mask-guide--top-elt') as HTMLElement).style.height = `${event.y - this.sizeGuide}px`;
				(document.querySelector('#cplus-mask-guide--bottom-elt') as HTMLElement).style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
			}
			event.stopPropagation();
		});
	}

	resetGuide = (): void => {
		this.guideType = '';
		document.querySelector('#cplus-reading-guide')?.remove();
		document.querySelector('#cplus-vertical-guide-elt')?.remove();
		document.querySelector('#cplus-mask-guide--top-elt')?.remove();
		document.querySelector('#cplus-mask-guide--bottom-elt')?.remove();
	}
}

customElements.define('app-reading-guide', ReadingGuideComponent);
