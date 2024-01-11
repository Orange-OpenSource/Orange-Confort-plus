const btnModalLayout: HTMLTemplateElement = document.createElement('template');
btnModalLayout.innerHTML = `<button type="button" class="btn btn-primary pe-4 sc-btn-modal"></button>`;

class BtnModalComponent extends HTMLElement {
	static observedAttributes = ['data-value', 'data-label'];
	modalBtn: HTMLElement = null;
	value: any = null;
	i18nService: any;

	constructor() {
		super();

		// @todo Utiliser singleton pour I18nService pour éviter plusieurs instances
		// @ts-ignore
		this.i18nService = new I18nService();

		this.value = this.dataset?.value || this.value;

		this.appendChild(btnModalLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.modalBtn = this.querySelector('button');

		this.modalBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('clickModalEvent', { bubbles: true });
			this.modalBtn?.dispatchEvent(clickEvent);
		});
	}

	disconnectedCallback(): void {
		this.modalBtn?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-value' === name) {
			this.modalBtn.innerText = newValue === 'default' ? this.i18nService.getMessage('noModifications') : newValue;
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
}

customElements.define('app-btn-modal', BtnModalComponent);
