const selectModeLayout: HTMLTemplateElement = document.createElement('template');
selectModeLayout.innerHTML = `
	<style>
		label {
			width: 100%;
			cursor: pointer;
		}

		input {
			appearance: none;
    	-webkit-appearance: none;
    	-moz-appearance: none;
			position: absolute;
		}

		input:checked + div {
			box-shadow: var(--bs-focus-ring-x,0) var(--bs-focus-ring-y,0) var(--bs-focus-ring-blur,0) var(--bs-focus-ring-width) var(--bs-focus-ring-color);
		}

		input:not(:checked) + div > p {
			display: none;
		}
	</style>

	<label>
		<input type="radio">
		<div class="d-flex flex-column gap-1 p-1">
			<div class="d-flex align-items-center gap-2">
				<app-icon data-size="2rem"></app-icon>
				<span class="fs-5 text"></span>
			</div>
			<p class="fs-6 fw-normal m-0"></p>
		</div>
	</label>
`;

class SelectModeComponent extends HTMLElement {
	inputElement: HTMLElement | null = null;
	iconElement: HTMLElement | null = null;
	labelElement: HTMLElement | null = null;
	descriptionElement: HTMLElement | null = null;
	id = '';
	icon = '';
	name = '';
	label = '';
	description = '';

	constructor() {
		super();

		this.id = this.dataset?.id || this.id;
		this.icon = this.dataset?.icon || this.icon;
		this.name = this.dataset?.name || this.name;
		this.label = this.dataset?.label || this.label;
		this.description = this.dataset?.description || this.description;

		this.appendChild(selectModeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.inputElement = this.querySelector('input');
		this.iconElement = this.querySelector('app-icon');
		this.labelElement = this.querySelector('span');
		this.descriptionElement = this.querySelector('p');

		this.inputElement?.setAttribute('id', this.id);
		this.inputElement?.setAttribute('name', this.name);
		this.iconElement!.dataset.name = this.icon;
		this.labelElement!.innerHTML = this.label;
		this.descriptionElement!.innerHTML = this.description;
	}
}

customElements.define('app-select-mode', SelectModeComponent);
