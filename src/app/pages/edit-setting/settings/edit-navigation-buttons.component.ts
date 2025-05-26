const editNavigationButtonsComponent: HTMLTemplateElement = document.createElement('template');
editNavigationButtonsComponent.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-button-preset" data-name="buttonPreset" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-pointing-delay" data-name="pointingDelay" data-label="true"></app-select-edit-value>
	</form>
`;

class EditNavigationButtonsComponent extends HTMLElement {
	selectButtonPresetElement: HTMLButtonElement;
	selectPointingDelayElement: HTMLButtonElement;

	settingValues: string[] = null;
	buttonPresetValue = '';
	pointingDelayValue = '';
	buttonPresetValues = [DEFAULT_VALUE, 'navigationButtons_navigationSet', 'navigationButtons_fullSet'];
	pointingDelayValues = [DEFAULT_VALUE, 'pointingDelay_delay1', 'pointingDelay_delay2', 'pointingDelay_delay3', 'pointingDelay_delay6'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editNavigationButtonsComponent.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectButtonPresetElement = this.querySelector(`#${PREFIX}select-button-preset`);
		this.selectPointingDelayElement = this.querySelector(`#${PREFIX}select-pointing-delay`);

		this.selectButtonPresetElement.addEventListener('editSettingButtonPreset', this.handler);
		this.selectPointingDelayElement.addEventListener('editSettingPointingDelay', this.handler);

		this.selectButtonPresetElement.setAttribute('data-setting-values', this.buttonPresetValues.join(','));
		this.selectPointingDelayElement.setAttribute('data-setting-values', this.pointingDelayValues.join(','));
	}

	private createHandler = () => {
		return (event: any) => {
			// TODO: Implement the logic to handle the events
		}
	}
}

customElements.define('app-edit-navigation-buttons', EditNavigationButtonsComponent);
