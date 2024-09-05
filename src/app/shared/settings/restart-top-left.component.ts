const tmplRestartTopLeft: HTMLTemplateElement = document.createElement('template');
tmplRestartTopLeft.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class RestartTopLeftComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(restartTopLeftServiceInstance.setRestartTopLeft.bind(this));

		this.appendChild(tmplRestartTopLeft.content.cloneNode(true));
	}
}

customElements.define('app-restart-top-left', RestartTopLeftComponent);
