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
		<span>Label</span>
		<app-icon data-name="Text_Size"></app-icon>
		<div class="d-flex gap-1 align-items-center sc-btn-setting__btn-slots"></div>
	</button>
`;

class BtnSettingComponent extends HTMLElement {
	settingBtn: HTMLButtonElement | null = null;
	index: number = 0;
	settingsList = '';
	separator = ',';

	constructor() {
		super();
		this.settingsList = this.dataset?.settingsList || this.settingsList;
		this.appendChild(btnSettingLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.settingBtn = this.querySelector('button');
		// @ts-ignore
		const btnContentSlots: HTMLElement = this.querySelector('div');

		/* Create array with settings value */
		const settingsArray = this.settingsList.split(this.separator);

		/* Init slots display */
		let slot = '';
		settingsArray.forEach((value, index) => {
			let div = '<div class="sc-btn-setting__btn-slot"></div>';
			if (index === this.index) {
				div = '<div class="sc-btn-setting__btn-slot selected"></div>';
			}
			slot = `${slot}${div}`;
		});
		btnContentSlots.innerHTML = slot;

		this.settingBtn?.addEventListener('click', () => {
			/* Increment setting list */
			this.index++;
			if (this.index >= settingsArray.length) {
				this.index = 0;
			}

			/* Updates slots display */
			slot = '';
			settingsArray.forEach((value, index) => {
				let div = '<div class="sc-btn-setting__btn-slot"></div>';
				if (index === this.index) {
					div = '<div class="sc-btn-setting__btn-slot selected"></div>';

					/* Emit event */
					let clickEvent = new CustomEvent(
						'changeSettingEvent',
						{
							detail: {
								value: value,
							},
						});
					template.dispatchEvent(clickEvent);
				}
				slot = `${slot}${div}`;
			});
			btnContentSlots.innerHTML = slot;
		});
	}

	disconnectedCallback(): void {
		this.settingBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-btn-setting', BtnSettingComponent);
