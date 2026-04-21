const editColorReadLayout: HTMLTemplateElement = document.createElement('template');
editColorReadLayout.innerHTML = `
	<form class="d-flex flex-column gap-4 text-center">
		<app-select-edit-value id="${PREFIX}select-color-read-action" data-name="colorReadAction" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-color-read-scope" data-name="colorReadScope" data-label="true"></app-select-edit-value>
	</form>
`;

class EditColorReadComponent extends HTMLElement {
	selectColorReadActionElement: HTMLElement | null = null;
	selectColorReadScopeElement: HTMLElement | null = null;
	settingValues: string[] = null;
	colorReadActionValue = 'none';
	colorReadScopeValue = 'word';

	colorReadActions = [
		"none",
		"splitSyllables",
		"colorSyllables",
		"colorTrickyWords",
		"customColors"
	];

	colorReadScopes = [
		"word",
		"sentence",
		"paragraph",
		"all"
	];

	handler: any;

	constructor() {
		super();

		this.appendChild(editColorReadLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectColorReadActionElement = this.querySelector(`#${PREFIX}select-color-read-action`);
		this.selectColorReadScopeElement = this.querySelector(`#${PREFIX}select-color-read-scope`);

		this.selectColorReadActionElement.addEventListener('editSettingColorReadAction', this.handler);
		this.selectColorReadScopeElement.addEventListener('editSettingColorReadScope', this.handler);

		this.selectColorReadActionElement.setAttribute('data-setting-values', this.colorReadActions.join(','));
		this.selectColorReadScopeElement.setAttribute('data-setting-values', this.colorReadScopes.join(','));

		modeOfUseServiceInstance.getSetting('colorRead').then((result: SettingModel) => {
			this.settingValues = result.values?.split(',');
			const currentValue = this.settingValues?.[result.valueSelected];

			if (currentValue && currentValue !== DEFAULT_VALUE && currentValue !== 'none') {
				const parts = currentValue.split('_');
				this.colorReadActionValue = parts[0];
				this.colorReadScopeValue = parts[1] || 'word';
			} else {
				this.colorReadActionValue = 'none';
				this.colorReadScopeValue = 'word';
			}

			const currentActionIndex = this.colorReadActions.findIndex(i => i === this.colorReadActionValue);
			const currentScopeIndex = this.colorReadScopes.findIndex(i => i === this.colorReadScopeValue);

			this.selectColorReadActionElement.setAttribute('data-index', currentActionIndex.toString());
			this.selectColorReadScopeElement.setAttribute('data-index', currentScopeIndex.toString());

			this.toggleScopeVisibility();
		});
	}

	setColorRead = (): void => {
		const value = this.colorReadActionValue === 'none'
			? DEFAULT_VALUE
			: `${this.colorReadActionValue}_${this.colorReadScopeValue}`;

		let newSettingIndex = this.settingValues.indexOf(value);
		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('colorRead', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('colorRead', 3, value);
		}

		colorReadServiceInstance.setColorRead(value);
	}

	toggleScopeVisibility = (): void => {
		if (this.colorReadActionValue === 'none') {
			this.selectColorReadScopeElement.style.display = 'none';
		} else {
			this.selectColorReadScopeElement.style.display = '';
		}
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingColorReadAction':
					this.colorReadActionValue = event.detail.newValue;
					this.toggleScopeVisibility();
					this.setColorRead();
					break;
				case 'editSettingColorReadScope':
					this.colorReadScopeValue = event.detail.newValue;
					this.setColorRead();
					break;
			}
		}
	}
}

customElements.define('app-edit-color-read', EditColorReadComponent);
