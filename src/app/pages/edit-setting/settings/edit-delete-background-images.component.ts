const editDeleteBackgroundImagesLayout: HTMLTemplateElement = document.createElement('template');
editDeleteBackgroundImagesLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="deleteBackgroundImages"></app-select-edit-value>
	</form>
`;

class EditDeleteBackgroundImagesComponent extends HTMLElement {
	selectDeleteBgImgElement: HTMLElement | null = null;
	settingValues: string[] = null;
	deleteBackgroundImagesValues = [DEFAULT_VALUE, 'backgroundTransparent', 'backgroundForegroundTransparent'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editDeleteBackgroundImagesLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectDeleteBgImgElement = this.querySelector('app-select-edit-value');
		this.selectDeleteBgImgElement.addEventListener('editSettingDeleteBackgroundImages', this.handler);
		this.selectDeleteBgImgElement.setAttribute('data-setting-values', this.deleteBackgroundImagesValues.join(','));

		modeOfUseServiceInstance.getSetting('deleteBackgroundImages').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.deleteBackgroundImagesValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectDeleteBgImgElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setDeleteBackgroundImages = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('deleteBackgroundImages', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('deleteBackgroundImages', 3, value);
		}

		deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingDeleteBackgroundImages':
					this.setDeleteBackgroundImages(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-delete-background-images', EditDeleteBackgroundImagesComponent);
