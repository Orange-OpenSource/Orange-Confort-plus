const editFocusAspectLayout: HTMLTemplateElement = document.createElement('template');
editFocusAspectLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-focus-size" data-name="focusSize" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-focus-color" data-name="focusColor" data-label="true"></app-select-edit-value>

		<p>Exemple de texte avec le <span id="${PREFIX}example-focus">focus</span>.</p>
	</form>
`;

class EditFocusAspectComponent extends HTMLElement {
	selectFocusSizeElement: HTMLElement | null = null;
	selectFocusColorElement: HTMLElement | null = null;

	settingValues: string[] = null;
	focusSizeValue = '';
	focusColorValue = '';
	focusSizeValues = [DEFAULT_VALUE, 'focusSize_big', 'focusSize_huge'];
	focusColorValues = [DEFAULT_VALUE, 'focusColor_white', 'focusColor_blue', 'focusColor_red', 'focusColor_yellow', 'focusColor_green', 'focusColor_black'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editFocusAspectLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {

		this.selectFocusSizeElement = this.querySelector(`#${PREFIX}select-focus-size`);
		this.selectFocusColorElement = this.querySelector(`#${PREFIX}select-focus-color`);

		this.selectFocusSizeElement.addEventListener('editSettingFocusSize', this.handler);
		this.selectFocusColorElement.addEventListener('editSettingFocusColor', this.handler);

		this.selectFocusSizeElement.setAttribute('data-setting-values', this.focusSizeValues.join(','));
		this.selectFocusColorElement.setAttribute('data-setting-values', this.focusColorValues.join(','));

		modeOfUseServiceInstance.getSetting('focusAspect').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			this.focusSizeValue = this.settingValues[result.valueSelected]?.split('_')[0];
			this.focusColorValue = this.settingValues[result.valueSelected]?.split('_')[1];

			const currentIndexFocusSize = this.focusSizeValues.findIndex(i => i === `focusSize_${this.focusSizeValue}`);
			const currentIndexFocusColor = this.focusColorValues.findIndex(i => i === `focusColor_${this.focusColorValue}`);

			this.selectFocusSizeElement.setAttribute('data-index', currentIndexFocusSize.toString());
			this.selectFocusColorElement.setAttribute('data-index', currentIndexFocusColor.toString());
		});
	}

	setFocusAspect = (): void => {
		let value = '';
		if (this.focusSizeValue === DEFAULT_VALUE && this.focusColorValue === DEFAULT_VALUE) {
			value = DEFAULT_VALUE;
		} else {
			value = `${this.focusSizeValue}_${this.focusColorValue}`;
		}

		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('focusAspect', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('focusAspect', 3, value);
		}

		this.setExampleFocus();
		focusAspectServiceInstance.setFocus(value);
	}

	setExampleFocus = (): void => {
		let spanExample: HTMLElement = this.querySelector(`#${PREFIX}example-focus`);
		let size = this.focusSizeValue;
		let color = this.focusColorValue;

		const styleFocusSize = size !== DEFAULT_VALUE ? size === 'big' ? FOCUS_SIZE_BIG : FOCUS_SIZE_HUGE : '';
		const styleFocusColor = color !== DEFAULT_VALUE ? color : '';

		spanExample.style.outlineStyle = 'solid';
		spanExample.style.outlineWidth = styleFocusSize;
		spanExample.style.outlineColor = styleFocusColor;
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingFocusSize':
					if(event.detail.newValue === DEFAULT_VALUE) {
						this.focusSizeValue = DEFAULT_VALUE;
					} else {
						this.focusSizeValue = event.detail.newValue.split('_')[1];
					}
					this.setFocusAspect();
					break;
				case 'editSettingFocusColor':
					if(event.detail.newValue === DEFAULT_VALUE) {
						this.focusColorValue = DEFAULT_VALUE;
					} else {
						this.focusColorValue = event.detail.newValue.split('_')[1];
					}
					this.setFocusAspect();
					break;
			}
		}
	}
}

customElements.define('app-edit-focus-aspect', EditFocusAspectComponent);
