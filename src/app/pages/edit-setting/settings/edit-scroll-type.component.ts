const editScrollTypeLayout: HTMLTemplateElement = document.createElement('template');
editScrollTypeLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="ScrollType"></app-select-edit-value>
	</form>
`;

class EditScrollTypeComponent extends HTMLElement {
	selectScrollTypeElement: HTMLElement | null = null;
	settingValues: string[] = null;
	scrollTypeValues = [DEFAULT_VALUE, 'scrollOnClick', 'scrollOnMouseover'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editScrollTypeLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectScrollTypeElement = this.querySelector('app-select-edit-value');
		this.selectScrollTypeElement.addEventListener('editSettingScrollSize', this.handler);
		this.selectScrollTypeElement.setAttribute('data-setting-values', this.scrollTypeValues.join(','));

		modeOfUseServiceInstance.getSetting('scrollType').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.scrollTypeValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectScrollTypeElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setScrollType = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('scrollType', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('scrollType', 3, value);
		}

		scrollTypeServiceInstance.setScrollType(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingScrollSize':
					this.setScrollType(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-scroll-type', EditScrollTypeComponent);
