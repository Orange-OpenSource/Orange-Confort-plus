const tmplFontFamily: HTMLTemplateElement = document.createElement('template');
tmplFontFamily.innerHTML = `
<style>
    app-font-family {
        margin-bottom: 1rem;
    }
</style>
<!-- @todo Loop through predefined values -->
<!-- @note To translate, or not? -->
<button id="normal-font" data-i18n="default"></button>
<button id="arial-font">Arial</button>
<button id="open-font-font">Open Sans</button>
<button id="accessible-dfa-font">Accessible-DFA</button>
<button id="open-dyslexic-font">Open Dyslexic</button>
<button id="luciole-font">Luciole</button>
`;

class FontFamilyComponent extends HTMLElement {
	// @todo Loop through predefined values
	normalBtn: HTMLElement | null = null;
	arialBtn: HTMLElement | null = null;
	openSansBtn: HTMLElement | null = null;
	accessibleDFABtn: HTMLElement | null = null;
	openDyslexicBtn: HTMLElement | null = null;
	lucioleBtn: HTMLElement | null = null;
	pathService: any;

	constructor() {
		super();
		this.appendChild(tmplFontFamily.content.cloneNode(true));
		this.pathService = new pathService();
		const path = this.pathService.path;

		let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
		let styles: HTMLStyleElement = document.createElement('style');
		head.appendChild(styles);
		// @todo Loop through predefined values
		// @todo Try to handle font-size-adjust to reduce CLS?
		styles.innerHTML = `
			@font-face { font-family:"Accessible-DFA"; src: url("${path}fonts/accessibleDFA/AccessibleDfA-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }
			@font-face { font-family:"Accessible-DFA"; src: url("${path}fonts/accessibleDFA/AccessibleDfA-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }
			@font-face { font-family:"Accessible-DFA"; src: url("${path}fonts/accessibleDFA/AccessibleDfA-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }

			@font-face { font-family:"Open-Dyslexic"; src: url("${path}fonts/open-dyslexic/OpenDyslexic-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }
			@font-face { font-family:"Open-Dyslexic"; src: url("${path}fonts/open-dyslexic/OpenDyslexic-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }
			@font-face { font-family:"Open-Dyslexic"; src: url("${path}fonts/open-dyslexic/OpenDyslexic-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }
			@font-face { font-family:"Open-Dyslexic"; src: url("${path}fonts/open-dyslexic/OpenDyslexic-Bold-Italic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }

			@font-face { font-family:"Luciole"; src: url("${path}fonts/luciole/Luciole-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }
			@font-face { font-family:"Luciole"; src: url("${path}fonts/luciole/Luciole-Regular-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }
			@font-face { font-family:"Luciole"; src: url("${path}fonts/luciole/Luciole-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }
			@font-face { font-family:"Luciole"; src: url("${path}fonts/luciole/Luciole-Bold-Italic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }

			@font-face { font-family:"Open-Sans"; src: url("${path}fonts/open-sans/OpenSans-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }
			@font-face { font-family:"Open-Sans"; src: url("${path}fonts/open-sans/OpenSans-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }
			@font-face { font-family:"Open-Sans"; src: url("${path}fonts/open-sans/OpenSans-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }
			@font-face { font-family:"Open-Sans"; src: url("${path}fonts/open-sans/OpenSans-BoldItalic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }`;

		// @todo Loop through predefined values, could be radio buttons
		this.normalBtn = this.querySelector('#normal-font');
		this.arialBtn = this.querySelector('#arial-font');
		this.openSansBtn = this.querySelector('#open-font-font');
		this.accessibleDFABtn = this.querySelector('#accessible-dfa-font');
		this.openDyslexicBtn = this.querySelector('#open-dyslexic-font');
		this.lucioleBtn = this.querySelector('#luciole-font');
	}

	connectedCallback(): void {
		const bodyElt = document.getElementsByTagName('body')[0];

		// @todo Loop through predefined values, could be radio buttons
		this.normalBtn?.addEventListener('click', () => {
			bodyElt.style.fontFamily = ``;
		});
		this.arialBtn?.addEventListener('click', () => {
			bodyElt.style.fontFamily = `"Liberation Sans", Arial, sans-serif`;
		});
		this.openSansBtn?.addEventListener('click', () => {
			bodyElt.style.fontFamily = `Open-Sans`;
		});
		this.accessibleDFABtn?.addEventListener('click', () => {
			bodyElt.style.fontFamily = `Accessible-DFA`;
		});
		this.openDyslexicBtn?.addEventListener('click', () => {
			bodyElt.style.fontFamily = `Open-Dyslexic`;
		});
		this.lucioleBtn?.addEventListener('click', () => {
			bodyElt.style.fontFamily = `Luciole`;
		});
	}

	disconnectedCallback(): void {
		// @todo Loop through predefined values, could be radio buttons
		this.normalBtn?.removeEventListener('click', () => {
		});
		this.arialBtn?.removeEventListener('click', () => {
		});
		this.openSansBtn?.removeEventListener('click', () => {
		});
		this.accessibleDFABtn?.removeEventListener('click', () => {
		});
		this.openDyslexicBtn?.removeEventListener('click', () => {
		});
		this.lucioleBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-font-family', FontFamilyComponent);
