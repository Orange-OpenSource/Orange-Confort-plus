const editScrollLayout: HTMLTemplateElement = document.createElement('template');
editScrollLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-scroll-size" data-name="ScrollSize"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-scroll-color" data-name="ScrollColor"></app-select-edit-value>
	</form>
`;

class EditScrollComponent extends HTMLElement {
	selectScrollSizeElement: HTMLElement | null = null;
	selectScrollColorElement: HTMLElement | null = null;

	settingValues: string[] = null;
	scrollSizeValue = '';
	scrollColorValue = '';
	scrollSizeValues = [DEFAULT_VALUE, 'bigScroll', 'hugeScroll'];
	scrollColorValues = [DEFAULT_VALUE, 'scrollColor_white_lightgrey', 'scrollColor_blue_darkblue', 'scrollColor_red_darkred', 'scrollColor_yellow_gold', 'scrollColor_green_darkgreen', 'scrollColor_black_darkgrey'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editScrollLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectScrollSizeElement = this.querySelector(`#${PREFIX}select-scroll-size`);
		this.selectScrollColorElement = this.querySelector(`#${PREFIX}select-scroll-color`);

		this.selectScrollSizeElement.addEventListener('editSettingScrollSize', this.handler);
		this.selectScrollColorElement.addEventListener('editSettingScrollColor', this.handler);

		this.selectScrollSizeElement.setAttribute('data-setting-values', this.scrollSizeValues.join(','));
		this.selectScrollColorElement.setAttribute('data-setting-values', this.scrollColorValues.join(','));

		modeOfUseServiceInstance.getSetting('scroll').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			this.scrollSizeValue = this.settingValues[result.valueSelected].split('_')[0];
			this.scrollColorValue = `scrollColor_${this.settingValues[result.valueSelected].split('_')[1]}_${this.settingValues[result.valueSelected].split('_')[2]}`;

			const currentIndexScrollSize = this.scrollSizeValues.findIndex(i => i === this.scrollSizeValue);
			const currentIndexScrollColor = this.scrollColorValues.findIndex(i => i === this.scrollColorValue);

			this.selectScrollSizeElement.setAttribute('data-index', currentIndexScrollSize.toString());
			this.selectScrollColorElement.setAttribute('data-index', currentIndexScrollColor.toString());
		});
	}

	setScroll = (): void => {
		let value = '';
		if (this.scrollColorValue === DEFAULT_VALUE) {
			value = this.scrollSizeValue;
		} else {
			value = `${this.scrollSizeValue}_${this.scrollColorValue.split('_')[1]}_${this.scrollColorValue.split('_')[2]}`;
		}

		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('scroll', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('scroll', 3, value);
		}

		scrollServiceInstance.setScroll(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingScrollSize':
					this.scrollSizeValue = event.detail.newValue;
					this.setScroll();
					break;
				case 'editSettingScrollColor':
					this.scrollColorValue = event.detail.newValue;
					this.setScroll();
					break;
			}
		}
	}
}

customElements.define('app-edit-scroll', EditScrollComponent);
