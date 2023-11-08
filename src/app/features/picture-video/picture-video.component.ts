const tmplPictureVideo: HTMLTemplateElement = document.createElement('template');
tmplPictureVideo.innerHTML = `
    <style>
        app-picture-video {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
    </style>
    <button class="c-btn-tool" id="sc-picture-video__tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label" data-i18n="medias"></span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="sc-picture-video__tool-content" data-i18n="wip"></div>
`;

class PictureVideoComponent extends HTMLElement {
	toolBtn: HTMLElement | null = null;

	open: boolean = false;

	constructor() {
		super();
		this.appendChild(tmplPictureVideo.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.toolBtn = this.querySelector('#sc-picture-video__tool-btn');
		const contentElt = this.querySelector('#sc-picture-video__tool-content');

		this.toolBtn?.addEventListener('click', () => {
			this.open = !this.open;

			if (this.open) {
				contentElt?.classList.remove('hidden');
			} else {
				contentElt?.classList.add('hidden');
			}
		});
	}

	disconnectedCallback(): void {
		this.toolBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-picture-video', PictureVideoComponent);
