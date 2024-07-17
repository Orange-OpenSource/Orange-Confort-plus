const editClearlyLinksLayout: HTMLTemplateElement = document.createElement('template');
editClearlyLinksLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="ClearlyLinks"></app-select-edit-value>
	</form>
`;

class EditClearlyLinksComponent extends HTMLElement {
	selectClearlyLinksElement: HTMLElement | null = null;
	settingValues: string[] = null;
	clearlyLinksValues = [DEFAULT_VALUE, 'bold_underline', 'bold_boxed'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editClearlyLinksLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectClearlyLinksElement = this.querySelector('app-select-edit-value');
		this.selectClearlyLinksElement.addEventListener('editSettingClearlyLinks', this.handler);
		this.selectClearlyLinksElement.setAttribute('data-setting-values', this.clearlyLinksValues.join(','));

		modeOfUseServiceInstance.getSetting('clearlyLinks').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.clearlyLinksValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectClearlyLinksElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setClearlyLinks = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('clearlyLinks', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('clearlyLinks', 3, value);
		}

		clearlyLinksServiceInstance.setClearlyLinks(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingClearlyLinks':
					this.setClearlyLinks(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-clearly-links', EditClearlyLinksComponent);
