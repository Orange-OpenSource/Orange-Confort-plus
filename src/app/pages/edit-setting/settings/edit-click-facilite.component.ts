const editClickFaciliteLayout: HTMLTemplateElement = document.createElement('template');
editClickFaciliteLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-click-type" data-name="clickType"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-click-delay" class="d-none" data-name="clickDelay"></app-select-edit-value>
	</form>
`;

class EditClickFaciliteComponent extends HTMLElement {
	selectClickTypeElement: HTMLElement | null = null;
	selectClickDelayElement: HTMLElement | null = null;

	settingValues: string[] = null;
	clickTypeValue = '';
	clickDelayValue = '';
	clickTypeValues = [`clickType_${DEFAULT_VALUE}`, `clickType_${CLICK_FACILITE_BIG_ZONE}`, `clickType_${CLICK_FACILITE_LONG_CLICK}`, `clickType_${CLICK_FACILITE_AUTO_CLICK}`];
	clickDelayValues = ['clickDelay_delay-1', 'clickDelay_delay-2', 'clickDelay_delay-3', 'clickDelay_delay-6'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editClickFaciliteLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectClickTypeElement = this.querySelector(`#${PREFIX}select-click-type`);
		this.selectClickDelayElement = this.querySelector(`#${PREFIX}select-click-delay`);

		this.selectClickTypeElement.addEventListener('editSettingClickType', this.handler);
		this.selectClickDelayElement.addEventListener('editSettingClickDelay', this.handler);

		this.selectClickTypeElement.setAttribute('data-setting-values', this.clickTypeValues.join(','));
		this.selectClickDelayElement.setAttribute('data-setting-values', this.clickDelayValues.join(','));

		modeOfUseServiceInstance.getSetting('clickFacilite').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			this.clickTypeValue = this.settingValues[result.valueSelected].split('_')[0];
			this.clickDelayValue = this.settingValues[result.valueSelected].split('_')[1];

			const currentIndexClickType = this.clickTypeValues.findIndex(i => i === `clickType_${this.clickTypeValue}`);
			const currentIndexClickDelay = this.clickDelayValue ? this.clickDelayValues.findIndex(i => i === `clickDelay_${this.clickDelayValue}`) : 0;

			this.selectClickTypeElement.setAttribute('data-index', currentIndexClickType.toString());
			this.selectClickDelayElement.setAttribute('data-index', currentIndexClickDelay.toString());
		});
	}

	setClickFacilite = (): void => {
		let value = '';
		if (this.clickTypeValue === DEFAULT_VALUE || this.clickTypeValue === CLICK_FACILITE_BIG_ZONE) {
			value = this.clickTypeValue;
		} else {
			value = `${this.clickTypeValue}_${this.clickDelayValue}`;
		}

		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('clickFacilite', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('clickFacilite', 3, value);
		}

		clickFaciliteServiceInstance.setClickFacilite(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingClickType':
					this.clickTypeValue = event.detail.newValue.split('_')[1];
					this.selectClickDelayElement.classList.toggle('d-none', this.clickTypeValue === DEFAULT_VALUE || this.clickTypeValue === CLICK_FACILITE_BIG_ZONE);
					this.setClickFacilite();
					break;
				case 'editSettingClickDelay':
					this.clickDelayValue = event.detail.newValue.split('_')[1];
					this.setClickFacilite();
					break;
			}
		}
	}
}

customElements.define('app-edit-click-facilite', EditClickFaciliteComponent);
