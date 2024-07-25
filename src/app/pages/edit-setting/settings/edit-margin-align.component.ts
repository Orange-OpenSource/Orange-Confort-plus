const editMarginAlignLayout: HTMLTemplateElement = document.createElement('template');
editMarginAlignLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="marginAlign"></app-select-edit-value>
	</form>
`;

class EditMarginAlignComponent extends HTMLElement {
	selectMarginAlignElement: HTMLElement | null = null;
	settingValues: string[] = null;
	marginAlignValues = [DEFAULT_VALUE, 'alignLeft', 'marginLeft', 'margeList'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editMarginAlignLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectMarginAlignElement = this.querySelector('app-select-edit-value');
		this.selectMarginAlignElement.addEventListener('editSettingMarginAlign', this.handler);
		this.selectMarginAlignElement.setAttribute('data-setting-values', this.marginAlignValues.join(','));

		modeOfUseServiceInstance.getSetting('marginAlign').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.marginAlignValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectMarginAlignElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setMarginAlign = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('marginAlign', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('marginAlign', 3, value);
		}

		marginAlignServiceInstance.setMargin(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingMarginAlign':
					this.setMarginAlign(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-margin-align', EditMarginAlignComponent);
