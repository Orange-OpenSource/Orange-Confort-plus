const tmplReadingGuide: HTMLTemplateElement = document.createElement('template');
tmplReadingGuide.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="readingMask" data-icon="Reading_Ruler"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>

<div id="cplus-top-guide-elt" class="bg-black position-fixed start-0 end-0 top-0 d-none" style="--cplus-bg-opacity: .5;"></div>
<div id="cplus-bottom-guide-elt" class="bg-black position-fixed start-0 end-0 bottom-0 d-none" style="--cplus-bg-opacity: .5;"></div>
`;

class ReadingGuideComponent extends AbstractSetting {
	sizeGuide: number = 40;
	topGuideElt: HTMLElement = null;
	bottomGuideElt: HTMLElement = null;

	constructor() {
		super();

		this.appendChild(tmplReadingGuide.content.cloneNode(true));

		this.topGuideElt = this.querySelector('#cplus-top-guide-elt');
		this.bottomGuideElt = this.querySelector('#cplus-bottom-guide-elt');
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
		this.topGuideElt.classList.remove('d-none');
		this.bottomGuideElt.classList.remove('d-none');

		document.addEventListener('mousemove', (event: MouseEvent) => {
			this.topGuideElt.style.height = `${event.y - this.sizeGuide}px`;
			this.bottomGuideElt.style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
			event.stopPropagation();
		});
	}

	resetReadingGuide = (): void => {
		this.topGuideElt.classList.add('d-none');
		this.bottomGuideElt.classList.add('d-none');

		this.topGuideElt.style.removeProperty('height');
		this.bottomGuideElt.style.removeProperty('height');
	}
}

customElements.define('app-reading-guide', ReadingGuideComponent);
