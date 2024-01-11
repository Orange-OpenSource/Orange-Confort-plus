const tmplCursorAspect: HTMLTemplateElement = document.createElement('template');
tmplCursorAspect.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="cursorAspect" data-icon="CursorSetting"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class CursorAspectComponent extends AbstractSetting {
	constructor() {
		super();

		this.appendChild(tmplCursorAspect.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setCursor((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setCursor = (value: string): void => {
		let label = value;
		if (value === 'default') {
			document.querySelector('#cplus-styles-cursor')?.remove();
		} else {
			let color = value.split('+')[1];
			// @todo adapter le cursor si c'est pointer ou texte
			let svgFile = value.split('+')[0] === 'big'
				? `<svg width="56" height="56" viewbox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M2.1875 3.93386C2.1875 3.07793 3.19283 2.61758 3.84083 3.17679L35.3653 30.3817C36.039 30.9631 35.6748 32.0687 34.7875 32.1359L22.9084 33.0354C22.2046 33.0887 21.776 33.8346 22.0844 34.4695L29.2853 49.2945C29.5344 49.8073 29.3051 50.4242 28.7816 50.6498L22.336 53.4272C21.8383 53.6416 21.2604 53.4206 21.0328 52.9288L14.1035 37.9578C13.8313 37.3697 13.0802 37.1919 12.5732 37.5955L3.81035 44.572C3.15521 45.0936 2.1875 44.6271 2.1875 43.7897V3.93386Z" fill="${color}" stroke="black" stroke-width="5"/></svg>`
				: `<svg width="128" height="128" viewbox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M5 6.18386C5 5.32793 6.00533 4.86758 6.65333 5.42679L83.1778 71.4657C83.8515 72.0471 83.4873 73.1527 82.6 73.2199L50.4764 75.6523C49.7726 75.7056 49.344 76.4515 49.6524 77.0864L67.5257 113.883C67.7748 114.396 67.5455 115.013 67.0219 115.238L49.904 122.615C49.4063 122.829 48.8284 122.608 48.6008 122.116L31.5493 85.2757C31.2771 84.6875 30.5259 84.5097 30.0189 84.9134L6.62285 103.54C5.96772 104.062 5 103.595 5 102.758V6.18386Z" fill="${color}" stroke="black" stroke-width="10"/></svg>`;
			let classCursor = `
							* {
								cursor: url('data:image/svg+xml;utf8,${svgFile}') 0 0, auto !important;
							}
						`;

			if (document.querySelectorAll('#cplus-styles-cursor').length === 0) {
				// @todo - trouver un moyen de ne pas dupliquer l'ajout de style dans le head dans chaque réglage
				let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
				// @todo - tester si on peut utiliser les adoptedStylesheet
				let stylesCursor: HTMLStyleElement = document.createElement('style');
				stylesCursor.setAttribute('id', 'cplus-styles-cursor');
				stylesCursor.innerHTML = classCursor;
				head.appendChild(stylesCursor);
			} else {
				document.querySelector('#cplus-styles-cursor').innerHTML = classCursor;
			}
		}
		this.modalBtn.setAttribute('data-value', label);
	}
}

customElements.define('app-cursor-aspect', CursorAspectComponent);
