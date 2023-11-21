const tmplPointer: HTMLTemplateElement = document.createElement('template');
tmplPointer.innerHTML = `
		<style>
				app-pointer {
						font-size: 1rem;
						display: flex;
						flex-direction: column;
						margin-bottom: .75rem;
				}
		</style>
		<button class="c-btn-tool" id="sc-pointer__tool-btn">
				<div class="c-btn-tool__picto"></div>
				<span class="c-btn-tool__label" data-i18n="pointer"></span>
				<div class="c-btn-tool__picto"></div>
		</button>
		<div class="c-tool__content hidden" id="sc-pointer__tool-content" data-i18n="wip"></div>
`;

class PointerComponent extends HTMLElement {
	toolBtn: HTMLElement | null = null;

	open: boolean = false;

	constructor() {
		super();
		this.appendChild(tmplPointer.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.toolBtn = this.querySelector('#sc-pointer__tool-btn');
		const contentElt = this.querySelector('#sc-pointer__tool-content');

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

customElements.define('app-pointer', PointerComponent);
