const editLinkStyleLayout: HTMLTemplateElement = document.createElement('template');
editLinkStyleLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-color-link" data-name="linkColor" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-color-active-link" data-name="linkPointedColor" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-color-visited-link" data-name="linkVisitedColor" data-label="true"></app-select-edit-value>
	</form>
`;

class EditLinkStyleComponent extends HTMLElement {
	selectColorLinkElement: HTMLElement | null = null;
	selectColorActiveLinkElement: HTMLElement | null = null;
	selectColorVisitedLinkElement: HTMLElement | null = null;

	settingValues: string[] = null;
	colorLinkValue = '';
	colorActiveLinkValue = '';
	colorVisitedLinkValue = '';
	colorLinkValues = [`linkColor_${DEFAULT_VALUE}`, 'linkColor_lightblue', 'linkColor_lightgreen', 'linkColor_yellow', 'linkColor_orange', 'linkColor_pink', 'linkColor_black', 'linkColor_darkblue', 'linkColor_darkgreen', 'linkColor_red', 'linkColor_purple', 'linkColor_brown'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editLinkStyleLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectColorLinkElement = this.querySelector(`#${PREFIX}select-color-link`);
		this.selectColorActiveLinkElement = this.querySelector(`#${PREFIX}select-color-active-link`);
		this.selectColorVisitedLinkElement = this.querySelector(`#${PREFIX}select-color-visited-link`);

		this.selectColorLinkElement.addEventListener('editSettingLinkColor', this.handler);
		this.selectColorActiveLinkElement.addEventListener('editSettingLinkPointedColor', this.handler);
		this.selectColorVisitedLinkElement.addEventListener('editSettingLinkVisitedColor', this.handler);

		this.selectColorLinkElement.setAttribute('data-setting-values', this.colorLinkValues.join(','));
		this.selectColorActiveLinkElement.setAttribute('data-setting-values', this.colorLinkValues.join(','));
		this.selectColorVisitedLinkElement.setAttribute('data-setting-values', this.colorLinkValues.join(','));

		modeOfUseServiceInstance.getSetting('linkStyle').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			this.colorLinkValue = this.settingValues[result.valueSelected]?.split('_')[0];
			this.colorActiveLinkValue = this.settingValues[result.valueSelected]?.split('_')[1];
			this.colorVisitedLinkValue = this.settingValues[result.valueSelected]?.split('_')[2];

			const currentIndexColorLink = this.colorLinkValues.findIndex(i => i === `linkColor_${this.colorLinkValue}`);
			const currentIndexColorActiveLink = this.colorLinkValues.findIndex(i => i === `linkColor_${this.colorActiveLinkValue}`);
			const currentIndexColorVisitedLink = this.colorLinkValues.findIndex(i => i === `linkColor_${this.colorVisitedLinkValue}`);

			this.selectColorLinkElement.setAttribute('data-index', currentIndexColorLink.toString());
			this.selectColorActiveLinkElement.setAttribute('data-index', currentIndexColorActiveLink.toString());
			this.selectColorVisitedLinkElement.setAttribute('data-index', currentIndexColorVisitedLink.toString());
		});
	}

	setLinkStyle = (): void => {
		let value = '';
		if (this.colorLinkValue === DEFAULT_VALUE && this.colorActiveLinkValue === DEFAULT_VALUE && this.colorVisitedLinkValue === DEFAULT_VALUE) {
			value = DEFAULT_VALUE;
		} else {
			value = `${this.colorLinkValue}_${this.colorActiveLinkValue}_${this.colorVisitedLinkValue}`;
		}

		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('linkStyle', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('linkStyle', 3, value);
		}

		linkStyleServiceInstance.setLinkStyle(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingLinkColor':
					this.colorLinkValue = event.detail.newValue.split('_')[1];
					this.setLinkStyle();
					break;
				case 'editSettingLinkPointedColor':
					this.colorActiveLinkValue = event.detail.newValue.split('_')[1];
					this.setLinkStyle();
					break;
				case 'editSettingLinkVisitedColor':
					this.colorVisitedLinkValue = event.detail.newValue.split('_')[1];
					this.setLinkStyle();
					break;
			}
		}
	}
}

customElements.define('app-edit-link-style', EditLinkStyleComponent);
