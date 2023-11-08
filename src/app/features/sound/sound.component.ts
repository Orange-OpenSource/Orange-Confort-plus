const tmplSound: HTMLTemplateElement = document.createElement('template');
tmplSound.innerHTML = `
    <style>
        app-sound {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
    </style>
    <button class="c-btn-tool" id="sc-sound__tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label" data-i18n="audio"></span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="sc-sound__tool-content" data-i18n="wip"></div>
`;

class SoundComponent extends HTMLElement {
	toolBtn: HTMLElement | null = null;

	open: boolean = false;

	constructor() {
		super();
		this.appendChild(tmplSound.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.toolBtn = this.querySelector('#sc-sound__tool-btn');
		const contentElt = this.querySelector('#sc-sound__tool-content');

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

customElements.define('app-sound', SoundComponent);
