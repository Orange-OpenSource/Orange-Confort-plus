const btnSettingLayout: HTMLTemplateElement = document.createElement('template');
btnSettingLayout.innerHTML = `
	<style>
		.sc-btn-setting__btn-slots {
			margin-top: .5rem;
		}
		.sc-btn-setting__btn-slot {
			background: white;
			border-radius: 50%;
			width: .25rem;
			height: .25rem;
		}
		.sc-btn-setting__btn-slot.selected {
			background: black;
			border: 2px solid black;
			box-sizing: content-box;
		}
	</style>

	<button class="btn btn-primary flex-column">
		<span></span>
		<app-icon data-name="Text_Size"></app-icon>
		<div class="d-flex gap-1 align-items-center sc-btn-setting__btn-slots"></div>
	</button>
	<slot name="bidouille"></slot>
`;

class BtnSettingComponent extends HTMLElement {
	static observedAttributes = ['data-settings-list', 'data-label'];
	settingBtn: HTMLElement | null = null;
	btnContentSlots: HTMLElement | null = null;
	index: number = 0;
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
		this.btnContentSlots = this.querySelector('div');

		const span = this.querySelector('span');
		span!.innerHTML = this.label;

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

	calculateList(): void {
		this.slot = '';
		this.settingsArray.forEach((value, index) => {
			let div = '<div class="sc-btn-setting__btn-slot"></div>';
			if (index === this.index) {
				div = '<div class="sc-btn-setting__btn-slot selected"></div>';

				let clickEvent = new CustomEvent(
					'changeSettingEvent',
					{
						detail: {
							id: this.id,
							value: value,
						},
					});
				template.dispatchEvent(clickEvent);
			}
			this.slot = `${this.slot}${div}`;
		});
		this.btnContentSlots!.innerHTML = this.slot;
	}
}

customElements.define('app-btn-setting', BtnSettingComponent);
