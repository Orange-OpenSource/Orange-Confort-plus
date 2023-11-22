const editSettingLayout: HTMLTemplateElement = document.createElement('template');
editSettingLayout.innerHTML = `
	<p>Valeur à transmettre au parent</p>

	<button id="validate-setting" class="btn btn-primary">Valider</button>
`;

class EditSettingComponent extends HTMLElement {
	validateBtn: HTMLElement | null = null;

	constructor() {
		super();

		this.appendChild(editSettingLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.validateBtn = this.querySelector('#validate-setting');

		this.validateBtn?.addEventListener('click', () => {
			let clickValidateEvent = new CustomEvent('validateSettingEvent');
			template.dispatchEvent(clickValidateEvent);
		});
	}
}

customElements.define('app-edit-setting', EditSettingComponent);
