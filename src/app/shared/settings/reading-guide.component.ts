const tmplReadingGuide: HTMLTemplateElement = document.createElement('template');
tmplReadingGuide.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="readingMask" data-icon="Reading_Ruler"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>

<div id="top-guide-elt" class="sc-reading-guide sc-reading-guide--top"></div>
<div id="bottom-guide-elt" class="sc-reading-guide sc-reading-guide--bottom"></div>
`;

class ReadingGuideComponent extends AbstractSetting {
	sizeGuide: number = 40;
	topGuideElt: HTMLElement = null;
	bottomGuideElt: HTMLElement = null;

	constructor() {
		super();

		this.appendChild(tmplReadingGuide.content.cloneNode(true));

		this.topGuideElt = this.querySelector('#top-guide-elt');
		this.bottomGuideElt = this.querySelector('#bottom-guide-elt');

		this.topGuideElt.style.display = 'none';
		this.bottomGuideElt.style.display = 'none';

	}

	connectedCallback(): void {
		super.connectedCallback();

		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			switch ((event as CustomEvent).detail.value) {
				case 'readingGuide': {
					this.setReadingGuide();
					break;
				}
				default: {
					this.resetReadingGuide();
				}
			}
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn?.removeEventListener('changeSettingEvent', () => { });
	}

	setReadingGuide = (): void => {
		this.topGuideElt.style.removeProperty('display');
		this.bottomGuideElt.style.removeProperty('display');

		document.addEventListener('mousemove', (event: MouseEvent) => {
			this.topGuideElt.style.height = `${event.y - this.sizeGuide}px`;
			this.bottomGuideElt.style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
			event.stopPropagation();
		});
	}

	resetReadingGuide = (): void => {
		this.topGuideElt.style.display = 'none';
		this.bottomGuideElt.style.display = 'none';

		this.topGuideElt.style.removeProperty('height');
		this.bottomGuideElt.style.removeProperty('height');
	}
}

customElements.define('app-reading-guide', ReadingGuideComponent);
