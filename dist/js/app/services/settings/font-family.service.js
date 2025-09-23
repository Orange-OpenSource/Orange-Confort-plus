"use strict";
let fontFamilyServiceIsInstantiated;
class FontFamilyService {
    fontDictionnary = [
        {
            name: 'AccessibleDfA', size: '82.5%', folder: 'accessibleDfA', generic: 'serif', files: [
                { name: 'AccessibleDfA-VF.woff2', style: 'normal', weight: '700' },
                { name: 'AccessibleDfA-VF.woff2', style: 'italic', weight: '400' },
                { name: 'AccessibleDfA-VF.woff2', style: 'normal', weight: '400' }
            ]
        },
        {
            name: 'BelleAllure', size: '80%', folder: 'BelleAllure', generic: 'cursive', files: [
                { name: 'BelleAllureCM-Fin.woff2', style: 'normal', weight: '400' },
                { name: 'BelleAllureCM-Gros.woff2', style: 'normal', weight: '700' }
            ]
        },
        {
            name: 'HelveticaNeue', size: '100%', folder: 'HelveticaNeue', generic: 'sans-serif', files: [
                { name: 'HelvNeue55_W1G.woff2', style: 'normal', weight: '400' },
                { name: 'HelvNeue75_W1G.woff2', style: 'normal', weight: '700' },
            ]
        },
        {
            name: 'B612Mono', size: '75%', folder: 'B612', generic: 'monospace', files: [
                { name: 'B612Mono-Bold.woff2', style: 'normal', weight: '700' },
                { name: 'B612Mono-BoldItalic.woff2', style: 'italic', weight: '700' },
                { name: 'B612Mono-Italic.woff2', style: 'italic', weight: '400' },
                { name: 'B612Mono-Regular.woff2', style: 'normal', weight: '400' }
            ]
        },
        {
            name: 'LexendDeca', size: '92%', folder: 'lexendDeca', generic: 'sans-serif', files: [
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
            name: 'Luciole', size: '87.5%', folder: 'luciole', generic: 'sans-serif', files: [
                { name: 'Luciole-Bold-Italic.woff2', style: 'italic', weight: '700' },
                { name: 'Luciole-Bold.woff2', style: 'normal', weight: '700' },
                { name: 'Luciole-Regular-Italic.woff2', style: 'italic', weight: '400' },
                { name: 'Luciole-Regular.woff2', style: 'normal', weight: '400' }
            ]
        },
        {
            name: 'SylexiadSans', size: '122.5%', folder: 'sylexiadSans', generic: 'sans-serif', files: [
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
        }
    ];
    constructor() {
        if (fontFamilyServiceIsInstantiated) {
            throw new Error('FontFamilyService is already instantiated.');
        }
        fontFamilyServiceIsInstantiated = true;
    }
    setFontFamily = (value) => {
        stylesServiceInstance.removeStyle('font-family');
        if (value !== DEFAULT_VALUE) {
            let fontFaceStyle = [];
            this.fontDictionnary.forEach((font) => {
                for (const file of font.files) {
                    fontFaceStyle.push(`
						@font-face {
							font-family:"${font.name}";
							src: local("${font.name}"), url("${appPath}assets/fonts/${font.folder}/${file.name}");
							font-style: ${file.style};
							font-weight: ${file.weight};
							font-display: swap;
							size-adjust: ${font.size};
						}`);
                }
            });
            fontFaceStyle.push(`
				* { font-family: ${value} !important; }

				body {
					font-synthesis: none;
					font-variant-ligatures: normal;
					text-rendering: optimizeLegibility;
				}`);
            stylesServiceInstance.setStyle('font-family', fontFaceStyle.join(''));
        }
    };
    getFontInfo = (fontName) => {
        return this.fontDictionnary.find(font => font.name === fontName);
    };
    getFontList = () => {
        let fontList = this.fontDictionnary.map(font => font.name);
        fontList.unshift(DEFAULT_VALUE);
        return fontList;
    };
}
