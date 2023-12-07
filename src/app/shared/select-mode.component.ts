const selectModeLayout: HTMLTemplateElement = document.createElement('template');
selectModeLayout.innerHTML = `
	<input type="radio" name="modes" class="sc-select-mode__input">
	<label class="d-flex flex-column align-items-start gap-1 p-1 sc-select-mode__label btn btn-tertiary">
		<div class="d-flex align-items-center gap-2">
			<app-icon data-size="2rem"></app-icon>
			<span class="fs-5 text"></span>
		</div>
		<p class="fs-6 fw-normal m-0"></p>
	</label>
`;

class SelectModeComponent extends HTMLElement {
	inputElement: HTMLInputElement = null;
	iconElement: HTMLElement = null;
	labelElement: HTMLLabelElement = null;
	textElement: HTMLElement = null;
	descriptionElement: HTMLParagraphElement = null;
	label = '';
	i18nService: any;

	constructor() {
		super();

		this.label = this.dataset?.label || this.label;
		this.i18nService = new i18nService();

		this.appendChild(selectModeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.inputElement = this.querySelector('input');
		this.labelElement = this.querySelector('label');
		this.iconElement = this.querySelector('app-icon');
		this.textElement = this.querySelector('div span');
		this.descriptionElement = this.querySelector('label > p');

		this.inputElement!.id = this.label;
		this.inputElement!.value = this.label;
		this.labelElement!.setAttribute('for', this.label);
		this.iconElement!.setAttribute('name', this.label);
		this.textElement!.innerText = this.i18nService.getMessage(`${this.label}Name`);
		this.descriptionElement!.innerText = this.i18nService.getMessage(`${this.label}Description`);
	}
}

customElements.define('app-select-mode', SelectModeComponent);
