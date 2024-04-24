let scrollServiceIsInstantiated: boolean;

type BtnScrollStateType = 'scrollOnClick' | 'scrollOnMouseover' | '';

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
	scrollColor = 'lightgrey';
	scrollColorHover = 'grey';
	scrollWidth = '2rem';

	settingsValues: ScrollSettingValues[] = [];

	constructor() {
		if (scrollServiceIsInstantiated) {
			throw new Error('ScrollService is already instantiated.');
		}

		scrollServiceIsInstantiated = true;
	}

	/* Adds the style required for scrolling functions */
	setScrollClass = (): void => {
		let styleScroll = `
			#${PREFIX}container-scroll-buttons {
				display: flex;
				gap: 1rem;
				position: fixed;
				bottom: 1rem;
				right: 1rem;
				z-index: 2147483647;
			}

			#${PREFIX}container-scroll-buttons button {
				background: #f16e00;
				color: #000;
				border: none;
				font-weight: bold;
				padding: 1rem 2rem;
			}
			.d-none {
				display: none;
			}

			/* WebKit (Chrome, Safari) */
			.${PREFIX}big-scroll::-webkit-scrollbar,
			.${PREFIX}big-scroll *::-webkit-scrollbar {
					width: ${this.scrollWidth};
			}
			.${PREFIX}big-scroll::-webkit-scrollbar-thumb,
			.${PREFIX}big-scroll *::-webkit-scrollbar-thumb {
				background-color: ${this.scrollColor};
				border-radius: 1.75rem
				width: ${this.scrollWidth};
				cursor: pointer;
			}
			.${PREFIX}big-scroll::-webkit-scrollbar-thumb:hover,
			.${PREFIX}big-scroll *::-webkit-scrollbar-thumb:hover {
				background-color: ${this.scrollColorHover};
			}

			/* Firefox */
			.${PREFIX}big-scroll,
			.${PREFIX}big-scroll * {
				scrollbar-width: auto;
				scrollbar-color: ${this.scrollColor} transparent;
			}
			.${PREFIX}big-scroll:hover,
			.${PREFIX}big-scroll *:hover {
				scrollbar-color: ${this.scrollColorHover} transparent;
			}
		`;

		stylesServiceInstance.setStyle('scroll', styleScroll);
	}

	setScroll = (value: any): void => {
		stylesServiceInstance.removeStyle('scroll');
		let bigScroll: boolean;
		let btnState: BtnScrollStateType;
		if (value === DEFAULT_VALUE) {
			bigScroll = false;
			btnState = '';
		} else if (value.includes('bigScroll') || value.includes('veryBigScroll')) {
			this.scrollWidth = value.split('_')[0] === 'bigScroll' ? '2rem' : '3rem';
			this.scrollColor = value.split('_')[1];
			this.scrollColorHover = value.split('_')[2];
			this.setScrollClass();
			bigScroll = true;
			btnState = '';
		} else {
			this.setScrollClass();
			bigScroll = false;
			btnState = value;
		}
		const scrollSettingValues: ScrollSettingValues = { name: 'scroll', btnState: btnState, bigScrollActivated: bigScroll };
		this.setScrollParams(scrollSettingValues);
	}

	/* Allows a setting to enable or disable scroll functionality by listing the values for each setting */
	setScrollParams = (values: ScrollSettingValues): void => {
		const existingIndex = this.settingsValues.findIndex(item => item.name === values.name);
		if (existingIndex >= 0) {
			this.settingsValues[existingIndex] = values;
		} else {
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
		if (this.bigScrollActivated) {
			document.body.classList.add(`${PREFIX}big-scroll`);
		} else {
			document.body.classList.remove(`${PREFIX}big-scroll`);
		}
	}

	/* Activate or deactivate the scroll up/down buttons */
	setBtnScroll = (): void => {
		document.querySelector(`#${PREFIX}container-scroll-buttons`)?.remove();
		if (this.btnState) {
			let intervalUp: any;
			let intervalDown: any;
			const btnArray = [
				{ id: `${PREFIX}scroll-up`, label: i18nServiceInstance.getMessage('scrollUp'), element: this.btnScrollUp, interval: intervalUp },
				{ id: `${PREFIX}scroll-down`, label: i18nServiceInstance.getMessage('scrollDown'), element: this.btnScrollDown, interval: intervalDown }
			];

			let fragment = document.createDocumentFragment();
			const container = document.createElement('div');
			container.setAttribute('id', `${PREFIX}container-scroll-buttons`);

			btnArray.forEach((button) => {
				let btn = document.createElement('button');
				btn.setAttribute('id', button.id);
				btn.type = 'button';
				btn.innerHTML = button.label;
				container.appendChild(btn);
				fragment.appendChild(container);
				document.body.appendChild(fragment);

				button.element = document.querySelector(`#${button.id}`);

				let scrollDir = button.id.includes('up') ? -1 : button.id.includes('down') ? 1 : 0;
				let scrollBy = scrollDir * this.scrollSteps;

				if (this.btnState === 'scrollOnMouseover') {
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
