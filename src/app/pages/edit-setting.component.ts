const editSettingLayout: HTMLTemplateElement = document.createElement('template');
editSettingLayout.innerHTML = `
	<p>Zone d'affichage du réglage</p>
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
