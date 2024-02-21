const btnModalLayout: HTMLTemplateElement = document.createElement('template');
btnModalLayout.innerHTML = `<button type="button" class="btn btn-primary pe-4 sc-btn-modal"></button>`;

class BtnModalComponent extends HTMLElement {
	static observedAttributes = ['data-value', 'data-label'];
	modalBtn: HTMLElement = null;
	value: any = null;

	handler: any;

	constructor() {
		super();

		this.value = this.dataset?.value || this.value;

		this.appendChild(btnModalLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.modalBtn = this.querySelector('button');
		this.modalBtn?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.modalBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-value' === name) {
			this.modalBtn.innerText = newValue;
		}
		if ('data-label' === name) {
			this.setA11yName(newValue);
		}
	}

	setA11yName = (label: string): void => {
		let span = document.createElement('span');
		span.classList.add('visually-hidden');
		span.innerText = label;
		this.modalBtn?.appendChild(span);
		this.modalBtn.setAttribute('title', label);
	}

	private createHandler() {
		return (event: Event) => {
			if (event.type === 'click') {
				switch (event.target) {
					case this.modalBtn:
						let clickEvent = new CustomEvent('clickModalEvent', { bubbles: true });
						this.modalBtn?.dispatchEvent(clickEvent);
						break;
				}
			}
		}
	}
}

customElements.define('app-btn-modal', BtnModalComponent);
