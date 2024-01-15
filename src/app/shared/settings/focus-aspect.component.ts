const tmplFocusAspect: HTMLTemplateElement = document.createElement('template');
tmplFocusAspect.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="focusAspect" data-icon="Focus"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class FocusAspectComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,big+blue,veryBig+red",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setFocus.bind(this));

		this.appendChild(tmplFocusAspect.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback('focusAspect');
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setFocus((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setFocus = (value: string): void => {
		if (value === 'noModifications') {
			document.querySelector('#cplus-styles-focus')?.remove();
		} else {
			let size = value.split('+')[0] === 'big' ? '4px' : '10px';
			let color = value.split('+')[1];

			let classFocus = `
				*:focus, *:focus-visible {
					outline: ${color} solid ${size} !important;
				}
			`;

			if (document.querySelectorAll('#cplus-styles-focus').length === 0) {
				// @todo - trouver un moyen de ne pas dupliquer l'ajout de style dans le head dans chaque réglage
				let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
				// @todo - tester si on peut utiliser les adoptedStylesheet
				let stylesFocus: HTMLStyleElement = document.createElement('style');
				stylesFocus.setAttribute('id', 'cplus-styles-focus');
				stylesFocus.innerHTML = classFocus;
				head.appendChild(stylesFocus);
			} else {
				document.querySelector('#cplus-styles-focus').innerHTML = classFocus;
			}
		}
	}
}

customElements.define('app-focus-aspect', FocusAspectComponent);
