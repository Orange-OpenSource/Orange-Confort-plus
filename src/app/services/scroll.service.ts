let scrollServiceIsInstantiated: boolean;

type BtnScrollStateType = 'click' | 'mouseover' | '';

interface ScrollSettingValues {
	name: string;
	btnState: BtnScrollStateType;
	bigScrollActivated: boolean;
}

class ScrollService {
	btnScrollUp: HTMLElement = null;
	btnScrollDown: HTMLElement = null;
	btnState: BtnScrollStateType = '';
	bigScrollActivated = false;
	scrollSteps = 10;
	scrollTimer = 50;

	settingsValues: ScrollSettingValues[] = [];

	constructor() {
		if (scrollServiceIsInstantiated) {
			throw new Error('ScrollService is already instantiated.');
		}

		scrollServiceIsInstantiated = true;

		this.setScrollClass();
	}

	/* Adds the style required for scrolling functions */
	setScrollClass = (): void => {
		let styleScroll = `
			.cplus-big-scroll::-webkit-scrollbar, .cplus-big-scroll *::-webkit-scrollbar {
					width: 2rem;
			}
			.cplus-big-scroll::-webkit-scrollbar-thumb, .cplus-big-scroll *::-webkit-scrollbar-thumb {
				background-color: lightgrey;
				border-radius: 1.75rem
				width: 2rem;
				cursor: pointer;
			}
			.cplus-big-scroll::-webkit-scrollbar-thumb:hover, .cplus-big-scroll *::-webkit-scrollbar-thumb:hover {
				background-color: grey;
			}

			#cplus-container-scroll-buttons {
				display: flex;
				gap: 1rem;
				position: fixed;
				bottom: 1rem;
				right: 1rem;
				z-index: 2147483647;
			}

			#cplus-container-scroll-buttons button {
				background: #f16e00;
				color: #000;
				border: none;
				font-weight: bold;
				padding: 1rem 2rem;
			}
			.d-none {
				display: none;
			}
		`;

		stylesServiceInstance.setStyle('scroll', styleScroll);
	}

	/* Allows a setting to enable or disable scroll functionality by listing the values for each setting */
	setScroll = (values: ScrollSettingValues): void => {
		let addNewSetting = false;
		if (this.settingsValues.length > 0) {
			for (let setting of this.settingsValues) {
				if (setting.name === values.name) {
					setting.btnState = values.btnState;
					setting.bigScrollActivated = values.bigScrollActivated;
					addNewSetting = false;
					break;
				} else {
					addNewSetting = true;
				}
			}
		}

		if (this.settingsValues.length === 0 || addNewSetting) {
			this.settingsValues.push(values);
		}

		this.calculatePriority(values);
		this.setBigScroll();
		this.setBtnScroll();
	}

	/* Calculates the priorities for each value */
	calculatePriority = (values: ScrollSettingValues): void => {
		let tmpBigScroll: boolean = false;
		let tmpBtnState: BtnScrollStateType = '';

		for (let setting of this.settingsValues) {
			tmpBigScroll = Boolean(tmpBigScroll || setting.bigScrollActivated);
			// The last setting will determine whether it is 'click' or 'mouseover'.
			tmpBtnState = setting.btnState ? setting.btnState : tmpBtnState;
		}

		this.bigScrollActivated = tmpBigScroll;
		this.btnState = tmpBtnState;
	}

	/* Enable or disable the large scrollbar */
	setBigScroll = (): void => {
		document.body.classList.toggle('cplus-big-scroll');
	}

	/* Activate or deactivate the scroll up/down buttons */
	setBtnScroll = (): void => {
		document.querySelector('#cplus-container-scroll-buttons')?.remove();
		if (this.btnState) {
			let intervalUp: any;
			let intervalDown: any;
			const btnArray = [
				{ id: 'cplus-scroll-up', label: i18nServiceInstance.getMessage('scrollUp'), element: this.btnScrollUp, interval: intervalUp },
				{ id: 'cplus-scroll-down', label: i18nServiceInstance.getMessage('scrollDown'), element: this.btnScrollDown, interval: intervalDown }
			];

			let fragment = document.createDocumentFragment();
			const container = document.createElement('div');
			container.setAttribute('id', 'cplus-container-scroll-buttons');

			btnArray.forEach((button) => {
				let btn = document.createElement('button');
				btn.setAttribute('id', button.id);
				btn.type = "button";
				btn.innerHTML = button.label;
				container.appendChild(btn);
				fragment.appendChild(container);
				document.body.appendChild(fragment);

				button.element = document.querySelector(`#${button.id}`);

				let scrollDir = button.id.includes('up') ? -1 : button.id.includes('down') ? 1 : 0;
				let scrollBy = scrollDir * this.scrollSteps;

				if (this.btnState === 'mouseover') {
					button.element?.addEventListener('mouseover', (event: any) => {
						button.interval = setInterval(function () { window.scrollBy(0, scrollBy) }, this.scrollTimer)
					});
					button.element?.addEventListener('mouseleave', (event: any) => {
						clearInterval(button.interval);
					});
				} else {
					button.element?.addEventListener('click', (event: any) => {
						window.scrollBy(0, scrollBy);
					});
				}
			});
		}
	}
}
