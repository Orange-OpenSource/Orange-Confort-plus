const btnSettingLayout: HTMLTemplateElement = document.createElement('template');
btnSettingLayout.innerHTML = `
	<button type="button" class="sc-btn-setting btn btn-primary flex-column justify-content-between w-100 px-1">
		<span class="d-flex flex-column">
			<span class="sc-btn-setting__name"></span>
			<app-icon data-size="1.5em"></app-icon>
		</span>
		<span class="sc-btn-setting__values d-flex gap-1 align-items-center mt-2 mb-0"></span>
	</button>
`;

class BtnSettingComponent extends HTMLElement {
	static observedAttributes = ['data-values', 'data-active-value', 'data-name', 'data-disabled'];
	settingBtn: HTMLButtonElement = null;
	btnContentSlots: HTMLElement = null;
	index: number = 0;
	value: string;
	name: string;
	slot = '';
	separator = ',';
	settingsList: string[] = [];
	disabled = false;
	handler: any;

	constructor() {
		super();

		this.disabled = (this.dataset?.disabled === 'true') || this.disabled;

		this.appendChild(btnSettingLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.settingBtn = this.querySelector('button');
		this.btnContentSlots = this.querySelector('.sc-btn-setting__values');
		this.settingBtn.addEventListener('click', this.handler);
		this.setDisabledState();
	}

	disconnectedCallback(): void {
		this.settingBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		this.setTitle();
		if ('data-values' === name) {
			this.settingsList = newValue.split(this.separator);
		}
		if ('data-active-value' === name) {
			this.setIndex(Number(newValue));
		}
		if ('data-name' === name) {
			const settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
			this.name = settingName;

			const span: HTMLElement = this.querySelector('.sc-btn-setting__name');
			const icon = this.querySelector('app-icon');
			span.innerText = i18nServiceInstance.getMessage(`setting-${this.name}`);
			icon?.setAttribute('data-name', this.name);
		}
		if ('data-disabled' === name) {
			this.disabled = newValue === 'true';
			this.setDisabledState();
		}
	}

	getValueLabel = (value: string): string => {
		if (value?.includes('_')) {
			let arrayValues: string[] = [];
			value.split('_').forEach((item: string) => {
				arrayValues.push(i18nServiceInstance.getMessage(item));
			});
			return i18nServiceInstance.getMessage(`${this.name}-values`, arrayValues);
		} else {
			return i18nServiceInstance.getMessage(`${this.name}-${value}`);
		}
	}

	setTitle = (): void => {
		const settingName = i18nServiceInstance.getMessage(`setting-${this.name}`);
		const settingsNumber = this.settingsList.length;

		if (settingsNumber > 0) {
			const currentValueLabel = this.getValueLabel(this.value);
			const nextValueIndex = settingsNumber === (this.index + 1) ? 0 : this.index + 1;
			const nextValueLabel = this.getValueLabel(this.settingsList[nextValueIndex]);

			let content = '';
			if (currentValueLabel === 'active') {
				content = i18nServiceInstance.getMessage('multiclicToggleOn');
			} else if (nextValueLabel === 'active') {
				content = i18nServiceInstance.getMessage('multiclicToggleOff');
			} else {
				const currentIndex = (this.index + 1).toString();
				content = i18nServiceInstance.getMessage('multiclic', [
					currentValueLabel,
					currentIndex,
					settingsNumber.toString(),
					nextValueLabel,
					(nextValueIndex + 1).toString()
				]);
			}

			['title', 'aria-label'].forEach(attribute => {
				this.settingBtn.setAttribute(attribute, `${settingName}${content}`);
			});
		}
	}

	setIndex = (index?: number): void => {
		if (index?.toString()) {
			this.index = index;
		} else {
			let i = this.index + 1;
			this.index = i >= this.settingsList.length ? 0 : i;

			// If value is null, increment to the next value
			// It's for the case where setting has only 2 values but can add custom value
			if (!this.settingsList[this.index]) {
				let i = this.index + 1;
				this.index = i >= this.settingsList.length ? 0 : i;
			}
		}

		if (this.index === 0) {
			this.settingBtn?.classList.add('sc-btn-setting--default');
		} else {
			this.settingBtn?.classList.remove('sc-btn-setting--default');
		}
		this.calculateList();
	}

	setDisabledState = (): void => {
		if (this.settingBtn) {
			this.settingBtn!.disabled = this.disabled;
		}
	}

	calculateList = (): void => {
		this.slot = '';
		this.settingsList.forEach((value, index) => {
			/* Display the point only if value */
			if (value) {
				let point = '<span class="sc-btn-setting__value rounded-circle"></span>';
				if (index === this.index) {
					point = '<span class="sc-btn-setting__value sc-btn-setting__current-value rounded-circle"></span>';
					this.value = value;
				}
				this.slot = `${this.slot}${point}`;
			}
		});
		this.btnContentSlots!.innerHTML = this.slot;
		this.setTitle();
	}

	private createHandler = () => {
		return (event: any) => {
			if (event.type === 'click') {
				this.setIndex();

				let clickEvent = new CustomEvent(
					'changeSettingEvent',
					{
						bubbles: true,
						detail: {
							value: this.value,
							index: this.index
						}
					});
				this.settingBtn?.dispatchEvent(clickEvent);
			}
		}
	}
}

customElements.define('app-btn-setting', BtnSettingComponent);
