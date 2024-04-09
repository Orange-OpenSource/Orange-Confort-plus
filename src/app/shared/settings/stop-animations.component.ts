const tmplStopAnimations: HTMLTemplateElement = document.createElement('template');
tmplStopAnimations.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="loupe" data-icon="Animation_Hide" data-disabled="true"></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class StopAnimationsComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.appendChild(tmplStopAnimations.content.cloneNode(true));
	}
}

customElements.define('app-stop-animations', StopAnimationsComponent);
