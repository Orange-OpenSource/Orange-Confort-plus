const editTextSpacingLayout: HTMLTemplateElement = document.createElement('template');
editTextSpacingLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="textSpacing"></app-select-edit-value>
	</form>
`;

class EditTextSpacingComponent extends HTMLElement {
	selectTextSpacingElement: HTMLElement | null = null;
	settingValues: string[] = null;
	textSpacingValues = [DEFAULT_VALUE, 'spacingTextSmall', 'spacingTextBig', 'spacingTextHuge'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editTextSpacingLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectTextSpacingElement = this.querySelector('app-select-edit-value');
		this.selectTextSpacingElement.addEventListener('editSettingTextSpacing', this.handler);
		this.selectTextSpacingElement.setAttribute('data-setting-values', this.textSpacingValues.join(','));

		modeOfUseServiceInstance.getSetting('textSpacing').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.textSpacingValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectTextSpacingElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setSpacingText = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('textSpacing', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('textSpacing', 3, value);
		}

		textSpacingServiceInstance.setSpacingText(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingTextSpacing':
					this.setSpacingText(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-text-spacing', EditTextSpacingComponent);
