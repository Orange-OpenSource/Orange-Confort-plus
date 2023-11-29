const btnModalLayout: HTMLTemplateElement = document.createElement('template');
btnModalLayout.innerHTML = `<button type="button" class="btn btn-primary pe-4 sc-btn-modal"></button>`;

class BtnModalComponent extends HTMLElement {
	static observedAttributes = ['data-value', 'data-label'];
	modalBtn: HTMLElement | null = null;
	id = '';
	value: any = null;

	constructor() {
		super();

		this.id = this.dataset?.id || this.id;
		this.value = this.dataset?.value || this.value;

		this.appendChild(btnModalLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.modalBtn = this.querySelector('button');

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
			this.modalBtn.innerText = newValue;
		}
		if ('data-label' === name && this.modalBtn !== null) {
			this.setA11yName(newValue);
		}
	}

	setA11yName(label: string): void {
		let span = document.createElement('span');
		span.classList.add('visually-hidden');
		span.innerText = label;
		this.modalBtn?.appendChild(span);
		this.modalBtn!.title = label;
	}
}

customElements.define('app-btn-modal', BtnModalComponent);
