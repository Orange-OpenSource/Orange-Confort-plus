const tmplFocusAspect: HTMLTemplateElement = document.createElement('template');
tmplFocusAspect.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="focusAspect" data-icon="Focus"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class FocusAspectComponent extends AbstractSetting {
	constructor() {
		super();

		this.appendChild(tmplFocusAspect.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setFocus((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setFocus = (value: string): void => {
		const bodyElt = document.getElementsByTagName('body')[0];
		let label = value;
		if (value === 'default') {
			bodyElt.classList.remove('cplus-focus-aspect');
		} else {
			let size = value.split('+')[0] === 'big' ? '4px' : '10px';
			let color = value.split('+')[1];
			label = `${size} / ${color}`;

			let classFocus = `
				.cplus-focus-aspect *:focus, .cplus-focus-aspect *:focus-visible {
					outline: none !important;
					border: ${size} solid ${color} !important;
				}
			`;

			if (document.querySelectorAll('#cplus-styles-focus').length === 0) {
				let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
				let stylesFocus: HTMLStyleElement = document.createElement('style');
				stylesFocus.setAttribute('id', 'cplus-styles-focus');
				stylesFocus.innerHTML = classFocus;
				head.appendChild(stylesFocus);
			} else {
				document.querySelector('#cplus-styles-focus').innerHTML = classFocus;
			}

			bodyElt.classList.add('cplus-focus-aspect');
			this.modalBtn.setAttribute('data-value', label);
		}
	}
}

customElements.define('app-focus-aspect', FocusAspectComponent);
