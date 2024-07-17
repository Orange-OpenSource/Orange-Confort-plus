const editCapitalLettersLayout: HTMLTemplateElement = document.createElement('template');
editCapitalLettersLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="CapitalLetters"></app-select-edit-value>
	</form>
`;

class EditCapitalLettersComponent extends HTMLElement {
	selectCapitalLettersElement: HTMLElement | null = null;
	settingValues: string[] = null;
	capitalLettersValues = [DEFAULT_VALUE, 'uppercase', 'capitalize'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editCapitalLettersLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectCapitalLettersElement = this.querySelector('app-select-edit-value');
		this.selectCapitalLettersElement.addEventListener('editSettingCapitalLetters', this.handler);
		this.selectCapitalLettersElement.setAttribute('data-setting-values', this.capitalLettersValues.join(','));

		modeOfUseServiceInstance.getSetting('capitalLetters').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.capitalLettersValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectCapitalLettersElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setCapitalLetters = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('capitalLetters', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('capitalLetters', 3, value);
		}

		capitalLettersServiceInstance.setCapitalLetters(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingCapitalLetters':
					this.setCapitalLetters(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-capital-letters', EditCapitalLettersComponent);
