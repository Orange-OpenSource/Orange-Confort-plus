const editColorReadLayout: HTMLTemplateElement = document.createElement('template');
editColorReadLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="colorRead"></app-select-edit-value>
	</form>
`;

class EditColorReadComponent extends HTMLElement {
	selectColorReadElement: HTMLElement | null = null;
	settingValues: string[] = null;
	colorReadValues = [DEFAULT_VALUE, 'active'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editColorReadLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectColorReadElement = this.querySelector('app-select-edit-value');
		this.selectColorReadElement.addEventListener('editSettingColorRead', this.handler);
		this.selectColorReadElement.setAttribute('data-setting-values', this.colorReadValues.join(','));

		modeOfUseServiceInstance.getSetting('colorRead').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.colorReadValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectColorReadElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setColorRead = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('colorRead', newSettingIndex, true);
		}

		colorReadServiceInstance.setColorRead(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingColorRead':
					this.setColorRead(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-color-read', EditColorReadComponent);
