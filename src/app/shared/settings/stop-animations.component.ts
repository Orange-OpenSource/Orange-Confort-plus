const tmplStopAnimations: HTMLTemplateElement = document.createElement('template');
tmplStopAnimations.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
</div>
`;

class StopAnimationsComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(stopAnimationsServiceInstance.setStopAnimations.bind(this));

		this.appendChild(tmplStopAnimations.content.cloneNode(true));
	}
}

customElements.define('app-stop-animations', StopAnimationsComponent);
