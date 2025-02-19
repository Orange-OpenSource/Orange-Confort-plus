const tmplRestartTopLeft: HTMLTemplateElement = document.createElement('template');
tmplRestartTopLeft.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class RestartTopLeftComponent extends AbstractSetting {
	activesValues = { values: "noModifications,active", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(restartTopLeftServiceInstance.setRestartTopLeft.bind(this));

		this.appendChild(tmplRestartTopLeft.content.cloneNode(true));
	}
}

customElements.define('app-restart-top-left', RestartTopLeftComponent);
