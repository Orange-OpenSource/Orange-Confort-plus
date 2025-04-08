const editZoomLayout: HTMLTemplateElement = document.createElement('template');
editZoomLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="zoom"></app-select-edit-value>
	</form>
`;

class EditZoomComponent extends HTMLElement {
	selectZoomElement: HTMLElement | null = null;
	settingValues: string[] = null;
	zoomValues = [DEFAULT_VALUE, '110', '130', '160', '200', '350', '500'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editZoomLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectZoomElement = this.querySelector('app-select-edit-value');
		this.selectZoomElement.addEventListener('editSettingZoom', this.handler);
		this.selectZoomElement.setAttribute('data-setting-values', this.zoomValues.join(','));

		modeOfUseServiceInstance.getSetting('zoom').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.zoomValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectZoomElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setZoom(value: string): void {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex === -1) {
			modeOfUseServiceInstance.addSettingCustomValue('zoom', 3, value);
		} else {
			modeOfUseServiceInstance.setSettingValue('zoom', newSettingIndex, true);
		}

		zoomServiceInstance.setZoom(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingZoom':
					this.setZoom(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-zoom', EditZoomComponent);
