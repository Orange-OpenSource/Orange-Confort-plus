const tmplReadingGuide: HTMLTemplateElement = document.createElement('template');
tmplReadingGuide.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="readingMask" data-icon="Reading_Ruler"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ReadingGuideComponent extends AbstractSetting {
	sizeGuide: number = 40;
	topGuideElt: HTMLElement = null;
	bottomGuideElt: HTMLElement = null;
	readingGuideElt: HTMLElement = null;
	i18nService: any;

	constructor() {
		super();

		// @todo Utiliser singleton pour I18nService pour éviter plusieurs instances
		// @ts-ignore
		this.i18nService = new I18nService();

		this.appendChild(tmplReadingGuide.content.cloneNode(true));

		this.readingGuideElt = this.querySelector('#cplus-vertical-guide-elt');
		this.topGuideElt = this.querySelector('#cplus-top-guide-elt');
		this.bottomGuideElt = this.querySelector('#cplus-bottom-guide-elt');
	}

	connectedCallback(): void {
		super.connectedCallback();

		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			switch ((event as CustomEvent).detail.value) {
				case 'readingGuide': {
					this.resetGuide();
					this.setReadingGuide();
					break;
				}
				case 'maskGuide': {
					this.resetGuide();
					this.setMaskGuide();
					break;
				}
				default: {
					this.resetGuide();
				}
			}
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn?.removeEventListener('changeSettingEvent', () => { });
	}

	setReadingGuide = (): void => {
		let classReadingGuide = `
			#cplus-vertical-guide-elt {
				border-left: 1px solid black;
				height: 100%;
				position: fixed;
				top: 0;
			}
		`;

		if (document.querySelectorAll('#cplus-reading-guide').length === 0) {
			// @todo - trouver un moyen de ne pas dupliquer l'ajout de style dans le head dans chaque réglage
			let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
			// @todo - tester si on peut utiliser les adoptedStylesheet
			let stylesReadingGuide: HTMLStyleElement = document.createElement('style');
			stylesReadingGuide.setAttribute('id', 'cplus-reading-guide');
			stylesReadingGuide.innerHTML = classReadingGuide;
			head.appendChild(stylesReadingGuide);
		}

		const readingElt = document.createElement('div');
		readingElt.setAttribute('id', 'cplus-vertical-guide-elt');
		document.body.appendChild(readingElt);
		this.modalBtn.setAttribute('data-value', this.i18nService.getMessage('readingGuide'));

		document.addEventListener('mousemove', (event: MouseEvent) => {
			(document.querySelector('#cplus-vertical-guide-elt') as HTMLElement).style.left = `${event.x + 2}px`;
			event.stopPropagation();
		});
	}

	setMaskGuide = (): void => {
		let classMaskGuide = `
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

		if (document.querySelectorAll('#cplus-mask-guide').length === 0) {
			// @todo - trouver un moyen de ne pas dupliquer l'ajout de style dans le head dans chaque réglage
			let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
			// @todo - tester si on peut utiliser les adoptedStylesheet
			let stylesReadingGuide: HTMLStyleElement = document.createElement('style');
			stylesReadingGuide.setAttribute('id', 'cplus-mask-guide');
			stylesReadingGuide.innerHTML = classMaskGuide;
			head.appendChild(stylesReadingGuide);
		}

		const maskTopElt = document.createElement('div');
		const maskBottomElt = document.createElement('div');
		maskTopElt.setAttribute('id', 'cplus-mask-guide--top-elt');
		maskBottomElt.setAttribute('id', 'cplus-mask-guide--bottom-elt');
		document.body.appendChild(maskTopElt);
		document.body.appendChild(maskBottomElt);
		this.modalBtn.setAttribute('data-value', this.i18nService.getMessage('maskGuide'));

		document.addEventListener('mousemove', (event: MouseEvent) => {
			(document.querySelector('#cplus-mask-guide--top-elt') as HTMLElement).style.height = `${event.y - this.sizeGuide}px`;
			(document.querySelector('#cplus-mask-guide--bottom-elt') as HTMLElement).style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
			event.stopPropagation();
		});
	}

	resetGuide = (): void => {
		document.querySelector('#cplus-vertical-guide-elt')?.remove();
		document.querySelector('#cplus-reading-guide')?.remove();

		document.querySelector('#cplus-mask-guide--top-elt')?.remove();
		document.querySelector('#cplus-mask-guide--bottom-elt')?.remove();
		document.querySelector('#cplus-mask-guide')?.remove();
	}
}

customElements.define('app-reading-guide', ReadingGuideComponent);
