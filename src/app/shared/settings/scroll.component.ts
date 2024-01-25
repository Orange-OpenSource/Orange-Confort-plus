const tmplScroll: HTMLTemplateElement = document.createElement('template');
tmplScroll.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="lift" data-icon="Scroll"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ScrollComponent extends AbstractSetting {
	btnScrollUp: HTMLElement = null;
	btnScrollDown: HTMLElement = null;
	btnState: 'click' | 'mouseover' | '' = '';
	scrollSteps = 10;
	scrollTimer = 50;

	activesValues = {
		"values": "noModifications,bigScroll,scrollOnMouseover",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setScroll.bind(this));

		this.appendChild(tmplScroll.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.setScrollClass();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.btnScrollUp?.removeEventListener('click', () => { });
		this.btnScrollUp?.removeEventListener('mouseover', () => { });
		this.btnScrollUp?.removeEventListener('mouseleave', () => { });
		this.btnScrollDown?.removeEventListener('click', () => { });
		this.btnScrollDown?.removeEventListener('mouseover', () => { });
		this.btnScrollDown?.removeEventListener('mouseleave', () => { });
		stylesServiceInstance.removeStyle(this.name);
	}

	setScroll = (value: string): void => {
		switch (value) {
			case 'bigScroll': {
				this.resetScroll();
				this.setBigScroll();
				break;
			}
			case 'scrollOnClick': {
				this.resetScroll();
				this.btnState = 'click';
				this.setBtnScroll();
				break;
			}
			case 'scrollOnMouseover': {
				this.resetScroll();
				this.btnState = 'mouseover';
				this.setBtnScroll();
				break;
			}
			default: {
				this.resetScroll();
			}
		}
	}

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
		`;

		stylesServiceInstance.setStyle(this.name, styleScroll);
	}

	setBigScroll = (): void => {
		document.body.classList.add('cplus-big-scroll');
	}

	setBtnScroll = (): void => {
		let intervalUp: any;
		let intervalDown: any;
		const btnArray = [
			{ id: 'cplus-scroll-up', label: i18nServiceInstance.getMessage('scrollUp'), element: this.btnScrollUp, interval: intervalUp },
			{ id: 'cplus-scroll-down', label: i18nServiceInstance.getMessage('scrollDown'), element: this.btnScrollDown, interval: intervalDown }
		];
		const container = document.createElement('div');
		container.setAttribute('id', 'cplus-container-scroll-buttons');
		let fragment = document.createDocumentFragment();

		btnArray.forEach((button) => {
			let btn = document.createElement('button');
			btn.type = 'button';
			btn.setAttribute('id', button.id);
			btn.type = "button";
			btn.innerHTML = button.label;
			fragment.appendChild(btn);

			container.appendChild(fragment);
			document.body.appendChild(container);
			button.element = document.querySelector(`#${button.id}`);

			let scrollDir = button.id.includes('up') ? -1 : button.id.includes('down') ? 1 : 0;
			let scrollBy = scrollDir * this.scrollSteps;
			button.element?.addEventListener(this.btnState, (event: any) => {
				button.interval = setInterval(() => { window.scrollBy(0, scrollBy) }, this.scrollTimer)
			});

			if (this.btnState === 'mouseover') {
				button.element?.addEventListener('mouseover', (event: any) => {
					button.interval = setInterval(() => { window.scrollBy(0, scrollBy) }, this.scrollTimer)
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

	resetScroll = (): void => {
		this.btnState = '';
		document.body.classList.remove('cplus-big-scroll');
		document.querySelector('#cplus-container-scroll-buttons')?.remove();
	}

}

customElements.define('app-scroll', ScrollComponent);
