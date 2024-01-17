const btnSettingLayout: HTMLTemplateElement = document.createElement('template');
// @fixme button > ul seems really weird
btnSettingLayout.innerHTML = `
	<button class="sc-btn-setting btn btn-primary flex-column justify-content-between w-100 px-1">
		<div class="d-flex flex-column">
			<span></span>
			<app-icon data-size="1.5em"></app-icon>
		</div>
		<ul class="d-flex gap-1 align-items-center mt-2 mb-0 list-unstyled"></ul>
	</button>
`;

class BtnSettingComponent extends HTMLElement {
	static observedAttributes = ['data-values', 'data-active-value', 'data-label', 'data-icon'];
	settingBtn: HTMLElement = null;
	btnContentSlots: HTMLElement = null;
	icon: HTMLElement = null;
	index: number;
	value: string;
	label = '';
	slot = '';
	separator = ',';
	settingsList: string[] = [];
	i18nService: any;

	constructor() {
		super();

		// @todo Utiliser singleton pour I18nService pour éviter plusieurs instances
		// @ts-ignore
		this.i18nService = new I18nService();

		this.appendChild(btnSettingLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.settingBtn = this.querySelector('button');
		this.btnContentSlots = this.querySelector('ul');

		this.settingBtn?.addEventListener('click', () => {
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
		});
	}

	disconnectedCallback(): void {
		this.settingBtn?.removeEventListener('click', () => { });
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-values' === name) {
			this.settingsList = newValue.split(this.separator);
		}
		if ('data-active-value' === name) {
			this.setIndex(Number(newValue));
		}
		if ('data-label' === name) {
			this.label = newValue;
			const span = this.querySelector('span');
			span.innerText = this.i18nService.getMessage(newValue);
		}
		if ('data-icon' === name) {
			this.icon = this.querySelector('app-icon');
			this.icon?.setAttribute('data-name', newValue);
		}
	}

	setIndex = (index?: number): void => {
		if (index?.toString()) {
			this.index = index;
		} else {
			let i = this.index + 1;
			this.index = i >= this.settingsList.length ? 0 : i;
		}

		if (this.index === 0) {
			this.settingBtn?.classList.add('sc-btn-setting--default');
		} else {
			this.settingBtn?.classList.remove('sc-btn-setting--default');
		}
		this.calculateList();
	}

	calculateList = (): void => {
		this.slot = '';
		this.settingsList.forEach((value, index) => {
			let point = '<li class="bg-white rounded-circle sc-btn-setting__btn-slot"></li>';
			if (index === this.index) {
				point = '<li class="border border-4 border-black rounded-circle"></li>';
				this.value = value;
			}
			this.slot = `${this.slot}${point}`;
		});
		this.btnContentSlots!.innerHTML = this.slot;
	}
}

customElements.define('app-btn-setting', BtnSettingComponent);
