const btnModalLayout: HTMLTemplateElement = document.createElement('template');
btnModalLayout.innerHTML = `
	<style>
		.sc-btn-modal {
			clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
			min-width: 6rem;
		}
	</style>

	<button type="button" class="btn btn-primary pe-4 sc-btn-modal">
	</button>
`;

class BtnModalComponent extends HTMLElement {
	static observedAttributes = ['data-value', 'data-label'];
	modalBtn: HTMLElement | null = null;
	id = '';
	label = '';
	value: any = null;

	constructor() {
		super();

		this.id = this.dataset?.id || this.id;
		this.label = this.dataset?.label || this.label;
		this.value = this.dataset?.value || this.value;

		this.appendChild(btnModalLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.modalBtn = this.querySelector('button');

		this.setA11yName();

		this.modalBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent(`clickModalEvent${this.id}`);
			template.dispatchEvent(clickEvent);
		});
	}

	disconnectedCallback(): void {
		this.modalBtn?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-value' === name && this.modalBtn !== null) {
			this.modalBtn.innerHTML = newValue;
		}
		if ('data-label' === name && this.modalBtn !== null) {
			this.setA11yName();
		}
	}

	setA11yName(): void {
		let span = document.createElement('span');
		span.classList.add('visually-hidden');
		span.innerHTML = this.label;
		this.modalBtn?.appendChild(span);
		this.modalBtn?.setAttribute('title', this.label);
	}
}

customElements.define('app-btn-modal', BtnModalComponent);
