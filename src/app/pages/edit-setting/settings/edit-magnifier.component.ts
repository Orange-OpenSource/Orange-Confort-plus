const editMagnifierLayout: HTMLTemplateElement = document.createElement('template');
editMagnifierLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="magnifier"></app-select-edit-value>
	</form>
`;

class EditMagnifierComponent extends HTMLElement {
	selectMagnifierElement: HTMLElement | null = null;
	settingValues: string[] = null;
	magnifierValues = [DEFAULT_VALUE, 'zoom2', 'zoom5', 'zoom10', 'zoom15'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editMagnifierLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectMagnifierElement = this.querySelector('app-select-edit-value');
		this.selectMagnifierElement.addEventListener('editSettingMagnifier', this.handler);
		this.selectMagnifierElement.setAttribute('data-setting-values', this.magnifierValues.join(','));

		this.querySelector('form').addEventListener('change', this.handler);

		modeOfUseServiceInstance.getSetting('magnifier').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.magnifierValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectMagnifierElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setMagnifier = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('magnifier', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('magnifier', 3, value);
		}

		magnifierServiceInstance.setMagnifier(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingMagnifier':
					this.setMagnifier(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-magnifier', EditMagnifierComponent);
