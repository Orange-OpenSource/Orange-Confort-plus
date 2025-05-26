const editNavigationButtonsComponent: HTMLTemplateElement = document.createElement('template');
editNavigationButtonsComponent.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-button-preset" data-name="buttonSet" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-pointing-delay" data-name="pointingDelay" data-label="true"></app-select-edit-value>
	</form>
`;

class EditNavigationButtonsComponent extends HTMLElement {
	selectButtonPresetElement: HTMLElement | null = null;
	selectPointingDelayElement: HTMLElement | null = null;

	settingValues: string[] = null;
	buttonSetValue = '';
	pointingDelayValue = '';
	buttonSetValues = [`buttonSet_${DEFAULT_VALUE}`, 'buttonSet_navigationSet', 'buttonSet_fullSet'];
	pointingDelayValues = [`pointingDelay_clicAction`, 'pointingDelay_delay1', 'pointingDelay_delay2', 'pointingDelay_delay3', 'pointingDelay_delay6'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editNavigationButtonsComponent.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectButtonPresetElement = this.querySelector(`#${PREFIX}select-button-preset`);
		this.selectPointingDelayElement = this.querySelector(`#${PREFIX}select-pointing-delay`);

		this.selectButtonPresetElement.addEventListener('editSettingButtonSet', this.handler);
		this.selectPointingDelayElement.addEventListener('editSettingPointingDelay', this.handler);

		this.selectButtonPresetElement.setAttribute('data-setting-values', this.buttonSetValues.join(','));
		this.selectPointingDelayElement.setAttribute('data-setting-values', this.pointingDelayValues.join(','));

		modeOfUseServiceInstance.getSetting('buttonSet').then((result: SettingModel) => {
			this.settingValues = result.values?.split(',');
			this.buttonSetValue = this.settingValues[result.valueSelected]?.split('_')[0];
			this.pointingDelayValue = this.settingValues[result.valueSelected]?.split('_')[1];

			const currentIndexButtonPreset = this.buttonSetValues.findIndex(i => i === `buttonSet_${this.buttonSetValue}`);
			const currentIndexPointingDelay = this.pointingDelayValues.findIndex(i => i === `pointingDelay_${this.pointingDelayValue}`);

			this.selectButtonPresetElement.setAttribute('data-index', currentIndexButtonPreset.toString());
			this.selectPointingDelayElement.setAttribute('data-index', currentIndexPointingDelay.toString());
		});
	}

	private createHandler = () => {
		return (event: any) => {
			// TODO: Implement the logic to handle the events
		}
	}
}

customElements.define('app-edit-navigation-buttons', EditNavigationButtonsComponent);
