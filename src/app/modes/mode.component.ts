const tmplMode: HTMLTemplateElement = document.createElement('template');
tmplMode.innerHTML = `
<section class="d-grid">
	<div id="mode-content" class="sc-mode__setting-grid gap-2 mb-2">
	</div>

	<button class="btn btn-secondary">Plus de réglage</button>
</section>
`;

class ModeComponent extends HTMLElement {
	static observedAttributes = ['data-parameters'];
	modeContent: HTMLElement | null = null;

	constructor() {
		super();

		this.appendChild(tmplMode.content.cloneNode(true));
	}

	setParameters(mode: JSON): void {
		this.modeContent = this.querySelector('#mode-content');
		let btnSettingList = '';
		let label = '';

		if (this.modeContent) {
			// @ts-ignore
			Object.entries(mode.parameters).forEach(([key, value]) => {
				let listValue = '';
				// @ts-ignore
				label = value['name'];
				// @ts-ignore
				Object.entries(value).forEach(([key, value]) => {
					// @ts-ignore
					if (key.indexOf('value') > -1) {
						listValue ? listValue = `${listValue},${value}` : listValue = `${value}`;
					}
				});
				let btnSetting = `<app-btn-setting data-label="${label}" data-settings-list="${listValue}"></app-btn-setting>`;
				btnSettingList = btnSettingList + btnSetting;
			});

			this.modeContent.innerHTML = btnSettingList;
		}
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-parameters' === name) {
			this.setParameters(JSON.parse(newValue));
			console.log(JSON.parse(newValue))
		}
	}
}

customElements.define('app-mode', ModeComponent);
