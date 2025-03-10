const editNavigationAutoLayout: HTMLTemplateElement = document.createElement('template');
editNavigationAutoLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<fieldset>
			<legend class="fs-5" data-i18n="navigationAuto_label"></legend>
			<div class="btn-group w-100" role="group">
					<input class="btn-check" type="radio" name="navigationAuto" id="${PREFIX}${DEFAULT_VALUE}-navigation-auto" value="${DEFAULT_VALUE}" autocomplete="off">
					<label class="btn btn-secondary" for="${PREFIX}${DEFAULT_VALUE}-navigation-auto" data-i18n="navigationAuto_inactive"></label>
					<input class="btn-check" type="radio" name="navigationAuto" id="${PREFIX}autoFocus-navigation-auto" value="autoFocus" autocomplete="off">
					<label class="btn btn-secondary" for="${PREFIX}autoFocus-navigation-auto" data-i18n="navigationAuto_active"></label>
			</div>
		</fieldset>

		<app-select-edit-value class="d-none" data-name="navigationDelay"></app-select-edit-value>
	</form>
`;

class EditNavigationAutoComponent extends HTMLElement {
	selectNavigationDelayElement: HTMLElement | null = null;
	settingValues: string[] = null;
	navigationDelayValues = ['navigationDelay_delay1', 'navigationDelay_delay2', 'navigationDelay_delay3', 'navigationDelay_delay6'];
	navigationAuto: string;
	delay: string;

	handler: any;

	constructor() {
		super();

		this.appendChild(editNavigationAutoLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectNavigationDelayElement = this.querySelector('app-select-edit-value');
		this.selectNavigationDelayElement.addEventListener('editSettingNavigationDelay', this.handler);
		this.selectNavigationDelayElement.setAttribute('data-setting-values', this.navigationDelayValues.join(','));

		this.querySelector('form').addEventListener('change', this.handler);

		modeOfUseServiceInstance.getSetting('navigationAuto').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			this.navigationAuto = this.settingValues[result.valueSelected].split('_')[0];
			this.delay = this.settingValues[result.valueSelected].split('_')[1];

			(this.querySelector(`input[name="navigationAuto"][id="${PREFIX}${this.navigationAuto}-navigation-auto"]`) as HTMLInputElement).checked = true;
			const currentIndex = this.delay ? this.navigationDelayValues.findIndex(i => i === `navigationDelay_${this.delay}`) : 0;
			this.selectNavigationDelayElement.classList.toggle('d-none', this.navigationAuto === DEFAULT_VALUE);
			this.selectNavigationDelayElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setNavigationAuto = (): void => {
		let value = '';
		if (this.navigationAuto === DEFAULT_VALUE) {
			value = DEFAULT_VALUE;
		} else {
			value = `${this.navigationAuto}_${this.delay}`;
		}

		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('navigationAuto', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('navigationAuto', 3, value);
		}

		navigationAutoServiceInstance.setNavigationAuto(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'change':
					this.navigationAuto = (this.querySelector(`input[name="navigationAuto"]:checked`) as HTMLInputElement).value;
					this.selectNavigationDelayElement.classList.toggle('d-none', this.navigationAuto === DEFAULT_VALUE);
					this.setNavigationAuto();
					break;
				case 'editSettingNavigationDelay':
					this.delay = event.detail.newValue.split('_')[1];
					this.setNavigationAuto();
					break;
			}
		}
	}
}

customElements.define('app-edit-navigation-auto', EditNavigationAutoComponent);
