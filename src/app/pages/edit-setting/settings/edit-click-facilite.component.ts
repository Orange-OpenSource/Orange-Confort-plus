const editClickFaciliteLayout: HTMLTemplateElement = document.createElement('template');
editClickFaciliteLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-click-facilite" data-name="ClickFacilite"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-delay" class="d-none" data-name="ClickDelay"></app-select-edit-value>
	</form>
`;

class EditClickFaciliteComponent extends HTMLElement {
	selectClickFaciliteElement: HTMLElement | null = null;
	selectClickDelayElement: HTMLElement | null = null;

	settingValues: string[] = null;
	clickFaciliteValue = '';
	clickDelayValue = '';
	clickFaciliteValues = [DEFAULT_VALUE, 'bigZone', 'longClick', 'autoClick'];
	clickDelayValues = ['clickDelay_1', 'clickDelay_2', 'clickDelay_3', 'clickDelay_6'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editClickFaciliteLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectClickFaciliteElement = this.querySelector(`#${PREFIX}select-click-facilite`);
		this.selectClickDelayElement = this.querySelector(`#${PREFIX}select-delay`);

		this.selectClickFaciliteElement.addEventListener('editSettingClickFacilite', this.handler);
		this.selectClickDelayElement.addEventListener('editSettingClickDelay', this.handler);

		this.selectClickFaciliteElement.setAttribute('data-setting-values', this.clickFaciliteValues.join(','));
		this.selectClickDelayElement.setAttribute('data-setting-values', this.clickDelayValues.join(','));

		modeOfUseServiceInstance.getSetting('clickFacilite').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			this.clickFaciliteValue = this.settingValues[result.valueSelected].split('_')[0];
			this.clickDelayValue = this.settingValues[result.valueSelected].split('_')[1];

			const currentIndexClickFacilite = this.clickFaciliteValues.findIndex(i => i === this.clickFaciliteValue);
			const currentIndexClickDelay = this.clickDelayValue ? this.clickDelayValues.findIndex(i => i === `clickDelay_${this.clickDelayValue}`) : 0;

			this.selectClickFaciliteElement.setAttribute('data-index', currentIndexClickFacilite.toString());
			this.selectClickDelayElement.setAttribute('data-index', currentIndexClickDelay.toString());
		});
	}

	setClickFacilite = (): void => {
		let value = '';
		if (this.clickFaciliteValue === DEFAULT_VALUE || this.clickFaciliteValue === CLICK_FACILITE_BIG_ZONE) {
			value = this.clickFaciliteValue;
		} else {
			value = `${this.clickFaciliteValue}_${this.clickDelayValue.split('_')[1]}`;
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
				case 'editSettingClickFacilite':
					this.clickFaciliteValue = event.detail.newValue;
					this.selectClickDelayElement.classList.toggle('d-none', this.clickFaciliteValue === DEFAULT_VALUE || this.clickFaciliteValue === CLICK_FACILITE_BIG_ZONE);

					this.setClickFacilite();
					break;
				case 'editSettingClickDelay':
					this.clickDelayValue = event.detail.newValue;
					this.setClickFacilite();
					break;
			}
		}
	}
}

customElements.define('app-edit-click-facilite', EditClickFaciliteComponent);
