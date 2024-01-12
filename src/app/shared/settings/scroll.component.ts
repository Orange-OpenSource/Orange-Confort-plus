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
	bodyElt: HTMLElement = null;
	btnState: 'click' | 'mouseover' | '' = '';
	scrollSteps = 100;
	i18nService: any;

	constructor() {
		super();

		// @todo Utiliser singleton pour I18nService pour éviter plusieurs instances
		// @ts-ignore
		this.i18nService = new I18nService();

		this.appendChild(tmplScroll.content.cloneNode(true));

		this.bodyElt = document.body;
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.setScrollClass();

		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			switch ((event as CustomEvent).detail.value) {
				case 'bigScroll': {
					this.resetScroll();
					this.setBigScroll();
					this.modalBtn.setAttribute('data-value', this.i18nService.getMessage('bigScroll'));
					break;
				}
				case 'btnScroll+click': {
					this.resetScroll();
					this.btnState = 'click';
					this.setBtnScroll();
					this.modalBtn.setAttribute('data-value', this.i18nService.getMessage('scrollOnClick'));
					break;
				}
				case 'btnScroll+mouseover': {
					this.resetScroll();
					this.btnState = 'mouseover';
					this.setBtnScroll();
					this.modalBtn.setAttribute('data-value', this.i18nService.getMessage('scrollOnMouseover'));
					break;
				}
				default: {
					this.resetScroll();
					this.modalBtn.setAttribute('data-value', 'default');
				}
			}
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn?.removeEventListener('changeSettingEvent', () => { });
		this.btnScrollUp?.removeEventListener('click', () => { });
		this.btnScrollUp?.removeEventListener('mouseover', () => { });
		this.btnScrollDown?.removeEventListener('click', () => { });
		this.btnScrollDown?.removeEventListener('mouseover', () => { });
	}

	setScrollClass = (): void => {
		let classScroll = `
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
		`;

		if (document.querySelectorAll('#cplus-scroll').length === 0) {
			// @todo - trouver un moyen de ne pas dupliquer l'ajout de style dans le head dans chaque réglage
			let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
			// @todo - tester si on peut utiliser les adoptedStylesheet
			let stylesScroll: HTMLStyleElement = document.createElement('style');
			stylesScroll.setAttribute('id', 'cplus-scroll');
			stylesScroll.innerHTML = classScroll;
			head.appendChild(stylesScroll);
		}
	}

	setBigScroll = (): void => {
		this.bodyElt.classList.add('cplus-big-scroll');
	}

	setBtnScroll = (): void => {
		const bodyElt: HTMLElement = document.body;
		const container = document.createElement('div');
		container.setAttribute('id', 'cplus-container-scroll-buttons')
		let btnArray: any[] = [];

		// @todo tester documentFragment pour ce cas
		let btnUp = `<button id="cplus-scroll-up" class="btn btn-primary">Monter</button>`;
		let btnDown = `<button id="cplus-scroll-down" class="btn btn-primary">Descendre</button>`;

		btnArray.push(btnUp, btnDown);
		container.innerHTML = btnArray.join('');
		bodyElt.appendChild(container);

		this.btnScrollUp = document.querySelector('#cplus-scroll-up');
		this.btnScrollDown = document.querySelector('#cplus-scroll-down');

		this.btnScrollUp.addEventListener(this.btnState, (event: any) => {
			window.scrollBy(0, -this.scrollSteps);
		});
		this.btnScrollDown.addEventListener(this.btnState, (event: any) => {
			window.scrollBy(0, this.scrollSteps);
		});
	}

	resetScroll = (): void => {
		this.btnState = '';
		this.bodyElt.classList.remove('cplus-big-scroll');
		document.querySelector('#cplus-container-scroll-buttons')?.remove();
	}

}

customElements.define('app-scroll', ScrollComponent);
