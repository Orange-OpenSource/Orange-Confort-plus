const tmplFontFamily: HTMLTemplateElement = document.createElement('template');
tmplFontFamily.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="textFont" data-icon="Police"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class FontFamilyComponent extends AbstractSetting {
	pathService: any;
	path: string;

	activesValues = {
		"values": "noModifications,Accessible-DFA,Luciole",
		"activeValue": 0
	};

	fontDictionnary: any[] = [
		{
			name: 'Accessible-DFA', folder: 'accessibleDFA', files: [
				{ name: 'AccessibleDFA-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'AccessibleDFA-Italic.woff2', style: 'italic', weight: '400' },
				{ name: 'AccessibleDFA-Regular.woff2', style: 'normal', weight: '400' }
			]
		},
		{
			name: 'B612 Mono', folder: 'B612', files: [
				{ name: 'B612Mono-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'B612Mono-BoldItalic.woff2', style: 'italic', weight: '700' },
				{ name: 'B612Mono-Italic.woff2', style: 'italic', weight: '400' },
				{ name: 'B612Mono-Regular.woff2', style: 'normal', weight: '400' }
			]
		},
		{
			name: 'Comic Sans MS', folder: 'comic', files: [
				{ name: 'comic-Sans-MS.woff2', style: 'normal', weight: '400' }
			]
		},
		{
			name: 'Lexand Deca', folder: 'lexendDeca', files: [
				{ name: 'LexendDeca-Black.woff2', style: 'normal', weight: '900' },
				{ name: 'LexendDeca-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'LexendDeca-ExtraBold.woff2', style: 'normal', weight: '800' },
				{ name: 'LexendDeca-ExtraLight.woff2', style: 'normal', weight: '200' },
				{ name: 'LexendDeca-Light.woff2', style: 'normal', weight: '300' },
				{ name: 'LexendDeca-Medium.woff2', style: 'normal', weight: '500' },
				{ name: 'LexendDeca-Regular.woff2', style: 'normal', weight: '400' },
				{ name: 'LexendDeca-SemiBold.woff2', style: 'normal', weight: '600' },
				{ name: 'LexendDeca-Thin.woff2', style: 'normal', weight: '100' }
			]
		},
		{
			name: 'Luciole', folder: 'luciole', files: [
				{ name: 'Luciole-Bold-Italic.woff2', style: 'italic', weight: '700' },
				{ name: 'Luciole-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'Luciole-Regular-Italic.woff2', style: 'italic', weight: '400' },
				{ name: 'Luciole-Regular.woff2', style: 'normal', weight: '400' }
			]
		},
		{
			name: 'Sylexiad Sans', folder: 'sylexiadSans', files: [
				{ name: 'SylexiadSansMedium-BoldItalic.woff2', style: 'italic', weight: '700' },
				{ name: 'SylexiadSansMedium-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'SylexiadSansMedium-Italic.woff2', style: 'italic', weight: '400' },
				{ name: 'SylexiadSansMedium.woff2', style: 'normal', weight: '400' },
				{ name: 'SylexiadSansSpacedMed-BoldItalic.woff2', style: 'italic', weight: '700' },
				{ name: 'SylexiadSansSpacedMed-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'SylexiadSansSpacedMed-Italic.woff2', style: 'italic', weight: '400' },
				{ name: 'SylexiadSansSpacedMed.woff2', style: 'normal', weight: '400' },
				{ name: 'SylexiadSansSpacedThin-BoldItalic.woff2', style: 'italic', weight: '700' },
				{ name: 'SylexiadSansSpacedThin-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'SylexiadSansSpacedThin-Italic.woff2', style: 'italic', weight: '400' },
				{ name: 'SylexiadSansSpacedThin.woff2', style: 'normal', weight: '400' },
				{ name: 'SylexiadSansThin-BoldItalic.woff2', style: 'italic', weight: '700' },
				{ name: 'SylexiadSansThin-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'SylexiadSansThin-Italic.woff2', style: 'italic', weight: '400' },
				{ name: 'SylexiadSansThin.woff2', style: 'normal', weight: '400' }
			]
		},
		{
			name: 'Verdana', folder: 'verdana', files: [
				{ name: 'Verdana-Bold-Italic.woff2', style: 'italic', weight: '700' },
				{ name: 'Verdana-Bold.woff2', style: 'normal', weight: '700' },
				{ name: 'Verdana-Italic.woff2', style: 'italic', weight: '400' },
				{ name: 'Verdana.woff2', style: 'normal', weight: '400' }
			]
		}
	];

	constructor() {
		super();

		// @ts-ignore
		this.pathService = new PathService();
		this.path = this.pathService.path;

		this.appendChild(tmplFontFamily.content.cloneNode(true));

		let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];

		if (document.querySelectorAll('#cplus-styles-fonts').length === 0) {
			// @todo - tester si on peut utiliser les adoptedStylesheet
			let stylesFonts: HTMLStyleElement = document.createElement('style');
			stylesFonts.setAttribute('id', 'cplus-styles-fonts');
			head.appendChild(stylesFonts);

			// @todo Try to handle font-size-adjust to reduce CLS?
			const fontFaceList: string[] = [];
			this.fontDictionnary.forEach((font) => {
				for (const file of font.files) {
					fontFaceList.push(`
						@font-face {
							font-family:"${font.name}";
							src: local("${font.name}"), url("${this.path}assets/fonts/${font.folder}/${file.name}");
							font-style: ${file.style}; font-weight: ${file.weight};
							font-display: swap; }`
					);
				}
			});
			stylesFonts.innerHTML = fontFaceList.join('');
		}
	}

	connectedCallback(): void {
		super.connectedCallback('textFont');
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setFontFamily((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setFontFamily = (value: string): void => {
		if (value === 'noModifications') {
			document.body.style.fontFamily = null;
		} else {
			document.body.style.fontFamily = value;
		}
	}
}

customElements.define('app-font-family', FontFamilyComponent);
