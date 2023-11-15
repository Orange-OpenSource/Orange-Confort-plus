const tmplText: HTMLTemplateElement = document.createElement('template');
tmplText.innerHTML = `
    <style>
        app-text {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
    </style>
    <button class="c-btn-tool" id="sc-text__tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label" data-i18n="text"></span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="sc-text__tool-content">
        <app-increase-text-size></app-increase-text-size>
        <app-text-transform></app-text-transform>
        <app-font-family></app-font-family>
        <app-reading-guide></app-reading-guide>
    </div>
`;

class TextComponent extends HTMLElement {
	toolBtn: HTMLElement | null = null;

	open: boolean = false;

	constructor() {
		super();
		this.appendChild(tmplText.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.toolBtn = this.querySelector('#sc-text__tool-btn');
		const contentElt = this.querySelector('#sc-text__tool-content');

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

customElements.define('app-text', TextComponent);
