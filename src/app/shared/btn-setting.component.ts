const btnSettingLayout: HTMLTemplateElement = document.createElement('template');
// @fixme button > ul seems really weird
btnSettingLayout.innerHTML = `
	<button class="btn btn-primary flex-column w-100">
		<span></span>
		<app-icon data-name="Text_Size"></app-icon>
		<ul class="d-flex gap-1 align-items-center mt-2 mb-0 list-unstyled"></ul>
	</button>
`;

class BtnSettingComponent extends HTMLElement {
	static observedAttributes = ['data-settings-list', 'data-label'];
	settingBtn: HTMLElement = null;
	btnContentSlots: HTMLElement = null;
	index: number = 1;
	settingsList = '';
	label = '';
	slot = '';
	separator = ',';
	settingsArray: string[] = [];

	constructor() {
		super();

		this.label = this.dataset?.label || this.label;

		this.appendChild(btnSettingLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.settingBtn = this.querySelector('button');
		this.btnContentSlots = this.querySelector('ul');

		const span = this.querySelector('span');
		span!.innerText = this.label;

		this.settingBtn?.addEventListener('click', () => {
			this.index++;
			if (this.index >= this.settingsArray.length) {
				this.index = 0;
			}
			this.calculateList();
		});
	}

	disconnectedCallback(): void {
		this.settingBtn?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings-list' === name) {
			this.settingsList = newValue;
			this.settingsArray = this.settingsList.split(this.separator);
			this.calculateList();
		}
	}

	calculateList = (): void => {
		this.slot = '';
		this.settingsArray.forEach((value, index) => {
			let point = '<li class="bg-white rounded-circle sc-btn-setting__btn-slot"></li>';
			if (index === this.index) {
				point = '<li class="bg-black border border-4 border-black rounded-circle"></li>';

				let clickEvent = new CustomEvent(
					'changeSettingEvent',
					{
						bubbles: true,
						detail: {
							id: this.id,
							value: value,
						}
					});
				this.settingBtn?.dispatchEvent(clickEvent);
			}
			this.slot = `${this.slot}${point}`;
		});
		this.btnContentSlots!.innerHTML = this.slot;
	}
}

customElements.define('app-btn-setting', BtnSettingComponent);
