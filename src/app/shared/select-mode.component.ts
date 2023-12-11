const selectModeLayout: HTMLTemplateElement = document.createElement('template');
selectModeLayout.innerHTML = `
	<input type="radio" class="sc-select-mode__input">
	<label class="d-flex flex-column gap-1 p-1 sc-select-mode__label">
		<div class="d-flex align-items-center gap-2">
			<app-icon data-size="2rem"></app-icon>
			<span class="fs-5 text"></span>
		</div>
		<span class="fs-6 fw-normal m-0"></span>
	</label>
`;

class SelectModeComponent extends HTMLElement {
	inputElement: HTMLInputElement = null;
	iconElement: HTMLElement = null;
	labelElement: HTMLLabelElement = null;
	textElement: HTMLElement = null;
	descriptionElement: HTMLParagraphElement = null;
	icon = '';
	label = '';
	description = '';

	constructor() {
		super();

		this.icon = this.dataset?.icon || this.icon;
		this.label = this.dataset?.label || this.label;
		this.description = this.dataset?.description || this.description;

		this.appendChild(selectModeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.inputElement = this.querySelector('input');
		this.labelElement = this.querySelector('label');
		this.iconElement = this.querySelector('app-icon');
		this.textElement = this.querySelector('div span');
		this.descriptionElement = this.querySelector('label > span');

		this.inputElement!.id = this.dataset?.id || '';
		this.inputElement!.name = this.dataset?.name || '';
		this.labelElement!.setAttribute('for', this.dataset?.id || '');
		this.iconElement?.setAttribute('data-name', this.icon);
		this.textElement!.innerText = this.label;
		this.descriptionElement!.innerText = this.description;
	}
}

customElements.define('app-select-mode', SelectModeComponent);
