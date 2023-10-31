const tmplReadingGuide: HTMLTemplateElement = document.createElement('template');
tmplReadingGuide.innerHTML = `
<style>
    app-reading-guide {
        margin-bottom: 1rem;
    }
    .c-reading-guide {
        background: rgba(0, 0, 0, .5);
        position: fixed;
        left: 0;
        right: 0;
        z-index: 99999;
    }
    .c-reading-guide--top {
        top: 0;
    }
    .c-reading-guide--bottom {
        bottom: 0;
    }
    .c-reading-guide__close-msg {
        color: white;
        font-weight: 700;
        padding: 1rem;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .c-reading-guide__close-btn {
        width: 80px;
        height: 80px;
        position: absolute;
        right: 0;
        bottom: -80px;
    }
</style>
<button id="reading-guide-btn" data-i18n="readingMask"></button>
<div id="top-guide-elt" class="c-reading-guide c-reading-guide--top">
    <span class="c-reading-guide__close-msg" data-i18n="readingMaskClose"></span>
    <button id="close-btn" class="c-reading-guide__close-btn" data-i18n="close"></button>
</div>
<div id="bottom-guide-elt" class="c-reading-guide c-reading-guide--bottom"></div>
`;

class ReadingGuideComponent extends HTMLElement {
	open: boolean = false;
	sizeGuide: number = 40;

	topGuideElt: HTMLElement | null = null;
	bottomGuideElt: HTMLElement | null = null;
	activeGuideBtn: HTMLElement | null = null;
	closeBtn: HTMLElement | null = null;

	constructor() {
		super();

		this.appendChild(tmplReadingGuide.content.cloneNode(true));

		this.activeGuideBtn = this.querySelector('#reading-guide-btn');
		this.topGuideElt = this.querySelector('#top-guide-elt');
		this.bottomGuideElt = this.querySelector('#bottom-guide-elt');
		this.closeBtn = this.querySelector('#close-btn');

		if (this.topGuideElt && this.bottomGuideElt) {
			this.topGuideElt.style.display = 'none';
			this.bottomGuideElt.style.display = 'none';
		}
	}

	connectedCallback(): void {
		this.activeGuideBtn?.addEventListener('click', () => {
			this.open = !this.open;
			if (!this.open) {
				this.resetReadingGuide();
				return;
			}

			if (this.topGuideElt && this.bottomGuideElt) {
				this.topGuideElt.style.removeProperty('display');
				this.bottomGuideElt.style.removeProperty('display');
			}
		});

		this.closeBtn?.addEventListener('click', () => {
			this.open = !this.open;
			if (!this.open) {
				this.resetReadingGuide();
			}
		});

		document.onkeydown = (event) => {
			if (event.code === 'Escape') {
				this.open = !this.open;
				this.resetReadingGuide();
			}
		}

		document.addEventListener('mousemove', (event: MouseEvent) => {
			if (this.open && this.topGuideElt && this.bottomGuideElt) {
				this.topGuideElt.style.height = `${event.y - this.sizeGuide}px`;
				this.bottomGuideElt.style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
			}
			event.stopPropagation();
		});
	}

	disconnectedCallback(): void {
		this.closeBtn?.removeEventListener('click', () => {
		});
	}

	private resetReadingGuide(): void {
		if (this.topGuideElt && this.bottomGuideElt) {
			this.topGuideElt.style.display = 'none';
			this.bottomGuideElt.style.display = 'none';

			this.topGuideElt.style.removeProperty('height');
			this.bottomGuideElt.style.removeProperty('height');
		}
	}
}

customElements.define('app-reading-guide', ReadingGuideComponent);
