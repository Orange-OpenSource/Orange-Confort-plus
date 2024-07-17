const editMagnifierLayout: HTMLTemplateElement = document.createElement('template');
editMagnifierLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<fieldset>
			<legend class="fs-5" data-i18n="magnifierShape"></legend>
			<div class="form-check">
				<input class="form-check-input" type="radio" name="magnifierShape" id="${PREFIX}${DEFAULT_VALUE}-magnifier-shape" value="${DEFAULT_VALUE}">
				<label class="form-check-label" for="${PREFIX}${DEFAULT_VALUE}-magnifier-shape" data-i18n="magnifierDefault"></label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="radio" name="magnifierShape" id="${PREFIX}square-magnifier-shape" value="square">
				<label class="form-check-label" for="${PREFIX}square-magnifier-shape" data-i18n="magnifierSquare"></label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="radio" name="magnifierShape" id="${PREFIX}circle-magnifier-shape" value="circle">
				<label class="form-check-label" for="${PREFIX}circle-magnifier-shape" data-i18n="magnifierCircle"></label>
			</div>
		</fieldset>

		<app-select-edit-value data-name="MagnifierZoom"></app-select-edit-value>
	</form>
`;

class EditMagnifierComponent extends HTMLElement {
	selectMagnifierZoomElement: HTMLElement | null = null;
	settingValues: string[] = null;
	magnifierZoomValues = ['magnifierZoom_2', 'magnifierZoom_5', 'magnifierZoom_10', 'magnifierZoom_15'];
	shape: string;
	zoom: string;

	handler: any;

	constructor() {
		super();

		this.appendChild(editMagnifierLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectMagnifierZoomElement = this.querySelector('app-select-edit-value');
		this.selectMagnifierZoomElement.addEventListener('editSettingMagnifierZoom', this.handler);
		this.selectMagnifierZoomElement.setAttribute('data-setting-values', this.magnifierZoomValues.join(','));

		this.querySelector('form').addEventListener('change', this.handler);

		modeOfUseServiceInstance.getSetting('magnifier').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');

			if (this.settingValues[result.valueSelected] === DEFAULT_VALUE) {
				this.shape = DEFAULT_VALUE;
				this.zoom = `magnifierZoom_${this.magnifierZoomValues[0]}`;
			} else {
				this.shape = this.settingValues[result.valueSelected].split('_')[0] as MagnifierShape;
				this.zoom = `magnifierZoom_${this.settingValues[result.valueSelected].split('_')[1]}`;
			}

			(this.querySelector(`input[name="magnifierShape"][id="${this.shape}MagnifierShape"]`) as HTMLInputElement).checked = true;
			const currentIndex = this.magnifierZoomValues.findIndex(i => i === this.zoom);
			this.selectMagnifierZoomElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setMagnifier = (): void => {
		let value = '';
		if (this.shape === DEFAULT_VALUE) {
			value = DEFAULT_VALUE;
		} else {
			value = `${this.shape}_${this.zoom.split('_')[1]}`;
		}

		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('magnifier', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('magnifier', 3, value);
		}

		magnifierServiceInstance.setMagnifier(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'change':
					this.shape = (this.querySelector(`input[name="magnifierShape"]:checked`) as HTMLInputElement).value;
					this.setMagnifier();
					break;
				case 'editSettingMagnifierZoom':
					this.zoom = event.detail.newValue;
					this.setMagnifier();
					break;
			}
		}
	}
}

customElements.define('app-edit-magnifier', EditMagnifierComponent);
