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

	parameters = [
		{ name: 'Taille de texte', values: '16, 18, 20, 22, 24' },
		{ name: 'Graisse', values: 'light, regular, bold' },
		{ name: 'Font', values: 'Nom font 1, Nom font 2, Nom font 3' },
	];

	constructor() {
		super();

		this.appendChild(tmplMode.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.modeContent = this.querySelector('#mode-content');
		this.setParameters();
	}

	setParameters(): void {
		let btnSettingList = '';
		this.parameters?.forEach((parameter) => {
			const label = parameter?.name;
			const settingsList = parameter?.values;
			let btnSetting = `<app-btn-setting data-label="${label}" data-settings-list="${settingsList}"></app-btn-setting>`;
			btnSettingList = btnSettingList + btnSetting;
		});

		this.modeContent!.innerHTML = btnSettingList;
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-parameters' === name) {
			this.setParameters();
		}
	}
}

customElements.define('app-mode', ModeComponent);
