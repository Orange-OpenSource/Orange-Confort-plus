const editScrollAspectLayout: HTMLTemplateElement = document.createElement('template');
editScrollAspectLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-scroll-size" data-name="scrollSize" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-scroll-color" data-name="scrollColor" data-label="true"></app-select-edit-value>
	</form>
`;

class EditScrollAspectComponent extends HTMLElement {
	selectScrollSizeElement: HTMLElement | null = null;
	selectScrollColorElement: HTMLElement | null = null;

	settingValues: string[] = null;
	scrollSizeValue = '';
	scrollColorValue = '';
	scrollSizeValues = [DEFAULT_VALUE, 'scrollSize_big', 'scrollSize_huge'];
	scrollColorValues = [DEFAULT_VALUE, 'scrollColor_white', 'scrollColor_blue', 'scrollColor_red', 'scrollColor_yellow', 'scrollColor_green', 'scrollColor_black'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editScrollAspectLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectScrollSizeElement = this.querySelector(`#${PREFIX}select-scroll-size`);
		this.selectScrollColorElement = this.querySelector(`#${PREFIX}select-scroll-color`);

		this.selectScrollSizeElement.addEventListener('editSettingScrollSize', this.handler);
		this.selectScrollColorElement.addEventListener('editSettingScrollColor', this.handler);

		this.selectScrollSizeElement.setAttribute('data-setting-values', this.scrollSizeValues.join(','));
		this.selectScrollColorElement.setAttribute('data-setting-values', this.scrollColorValues.join(','));

		modeOfUseServiceInstance.getSetting('scrollAspect').then((result: SettingModel) => {
			this.settingValues = result.values?.split(',');
			this.scrollSizeValue = this.settingValues[result.valueSelected]?.split('_')[0];
			this.scrollColorValue = this.settingValues[result.valueSelected]?.split('_')[1];

			const currentIndexScrollSize = this.scrollSizeValues.findIndex(i => i === `scrollSize_${this.scrollSizeValue}`);
			const currentIndexScrollColor = this.scrollColorValues.findIndex(i => i === `scrollColor_${this.scrollColorValue}`);

			this.selectScrollSizeElement.setAttribute('data-index', currentIndexScrollSize.toString());
			this.selectScrollColorElement.setAttribute('data-index', currentIndexScrollColor.toString());
		});
	}

	setScrollAspect = (): void => {
		let value = '';
		if (this.scrollColorValue === DEFAULT_VALUE) {
			value = this.scrollSizeValue;
		} else {
			value = `${this.scrollSizeValue}_${this.scrollColorValue}`;
		}

		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('scrollAspect', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('scrollAspect', 3, value);
		}

		scrollAspectServiceInstance.setScrollAspect(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingScrollSize':
					if (event.detail.newValue === DEFAULT_VALUE) {
						this.scrollSizeValue = DEFAULT_VALUE;
					} else {
						this.scrollSizeValue = event.detail.newValue.split('_')[1];
					}
					this.setScrollAspect();
					break;
				case 'editSettingScrollColor':
					if (event.detail.newValue === DEFAULT_VALUE) {
						this.scrollColorValue = DEFAULT_VALUE;
					} else {
						this.scrollColorValue = event.detail.newValue.split('_')[1];
					}
					this.setScrollAspect();
					break;
			}
		}
	}
}

customElements.define('app-edit-scroll-aspect', EditScrollAspectComponent);
