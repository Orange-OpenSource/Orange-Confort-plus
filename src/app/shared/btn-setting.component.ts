const btnSettingLayout: HTMLTemplateElement = document.createElement('template');
// @fixme button > ul seems really weird
btnSettingLayout.innerHTML = `
	<button type="button" class="sc-btn-setting btn btn-primary flex-column justify-content-between w-100 px-1">
		<div class="d-flex flex-column">
			<span></span>
			<app-icon data-size="1.5em"></app-icon>
		</div>
		<ul class="d-flex gap-1 align-items-center mt-2 mb-0 list-unstyled"></ul>
	</button>
`;

class BtnSettingComponent extends HTMLElement {
	static observedAttributes = ['data-values', 'data-active-value', 'data-name', 'data-disabled'];
	settingBtn: HTMLButtonElement = null;
	btnContentSlots: HTMLElement = null;
	index: number;
	value: string;
	label = '';
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
		this.btnContentSlots = this.querySelector('ul');
		this.settingBtn.addEventListener('click', this.handler);
		this.setDisabledState();
	}

	disconnectedCallback(): void {
		this.settingBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-values' === name) {
			this.settingsList = newValue.split(this.separator);
		}
		if ('data-active-value' === name) {
			this.setIndex(Number(newValue));
		}
		if ('data-name' === name) {
			const settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
			this.label = settingName;
			const span = this.querySelector('span');
			const icon = this.querySelector('app-icon');
			span.innerText = i18nServiceInstance.getMessage(settingName);
			icon?.setAttribute('data-name', settingName);
		}
		if ('data-disabled' === name) {
			this.disabled = newValue === 'true';
			this.setDisabledState();
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
				let point = '<li class="bg-white rounded-circle sc-btn-setting__btn-slot"></li>';
				if (index === this.index) {
					point = '<li class="border border-4 border-black rounded-circle"></li>';
					this.value = value;
				}
				this.slot = `${this.slot}${point}`;
			}
		});
		this.btnContentSlots!.innerHTML = this.slot;
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
