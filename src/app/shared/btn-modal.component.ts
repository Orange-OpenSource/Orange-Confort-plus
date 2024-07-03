const btnModalLayout: HTMLTemplateElement = document.createElement('template');
btnModalLayout.innerHTML = `
	<button type="button" class="btn btn-primary pe-4 sc-btn-modal">
		<app-icon data-name="Plus_small"></app-icon>
	</button>`;

class BtnModalComponent extends HTMLElement {
	static observedAttributes = ['data-name', 'data-disabled'];
	modalBtn: HTMLButtonElement = null;
	settingName: string = null
	indexValue: string = null
	disabled = false;

	handler: any;

	constructor() {
		super();

		this.disabled = (this.dataset?.disabled === 'true') || this.disabled;

		this.appendChild(btnModalLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.modalBtn = this.querySelector('button');
		this.modalBtn?.addEventListener('click', this.handler);
		this.modalBtn!.disabled = this.disabled;
	}

	disconnectedCallback(): void {
		this.modalBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-name' === name) {
			this.settingName = newValue;
		}
	}

	setA11yName = (label: string): void => {
		let span = document.createElement('span');
		span.classList.add('visually-hidden');
		span.innerText = label;
		this.modalBtn?.appendChild(span);
		this.modalBtn.setAttribute('title', label);
	}

	private createHandler = () => {
		return (event: Event) => {
			if (event.type === 'click') {
				switch (event.currentTarget) {
					case this.modalBtn:
						let clickEvent = new CustomEvent('changeRoute', {
							bubbles: true,
							detail: {
								route: PAGE_EDIT_SETTING,
								setting: this.settingName
							}
						});
						this.modalBtn?.dispatchEvent(clickEvent);
						break;
				}
			}
		}
	}
}

customElements.define('app-btn-modal', BtnModalComponent);
