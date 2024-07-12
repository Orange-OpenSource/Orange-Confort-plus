const tmplStopAnimations: HTMLTemplateElement = document.createElement('template');
tmplStopAnimations.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
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
