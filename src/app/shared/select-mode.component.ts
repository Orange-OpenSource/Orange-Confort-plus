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
	private inputIsChecked: boolean = false;
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
		// @ts-ignore
		const inputElement: HTMLInputElement = this.querySelector('input');
		// @ts-ignore
		const iconElement: HTMLElement = this.querySelector('app-icon');
		// @ts-ignore
		const labelElement: HTMLElement = this.querySelector('span');
		// @ts-ignore
		const descriptionElement: HTMLParagraphElement = this.querySelector('p');

		inputElement?.setAttribute('id', this.id);
		inputElement?.setAttribute('name', this.name);
		iconElement.dataset.name = this.icon;
		labelElement.innerHTML = this.label;
		descriptionElement.innerHTML = this.description;
	}
}

customElements.define('app-select-mode', SelectModeComponent);
