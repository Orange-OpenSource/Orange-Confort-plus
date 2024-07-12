let cursorAspectServiceIsInstantiated: boolean;

interface ColorCursorValues {
	fill: string;
	stroke: string;
}

class CursorAspectService {
	colorCursorValues: ColorCursorValues[] = [
		{ fill: 'white', stroke: 'black' },
		{ fill: 'ivory', stroke: 'black' },
		{ fill: 'blue', stroke: 'white' },
		{ fill: 'red', stroke: 'black' },
		{ fill: 'yellow', stroke: 'black' },
		{ fill: 'green', stroke: 'white' },
		{ fill: 'black', stroke: 'white' },
	];

	constructor() {
		if (cursorAspectServiceIsInstantiated) {
			throw new Error('CursorAspectService is already instantiated.');
		}

		cursorAspectServiceIsInstantiated = true;
	}

	drawCursor = (type: string, size: number, color: string, strokeWidth: number): string => {
		let stroke: string = (this.colorCursorValues.find((o: ColorCursorValues) => o.fill === color)).stroke;
		let path = '';
		switch (type) {
			case 'pointer':
				path = 'M43.074 4C52.2 4 52.2 13.064 52.2 13.064v52.368-21.653s1.014-9.063 10.14-9.063c9.127 0 10.141 8.56 10.141 8.56v23.666-15.106s2.535-8.056 9.633-8.056c7.099 0 9.126 8.056 9.126 8.056v19.638-9.064s2.029-8.56 10.141-8.56S110 62.41 110 62.41V99.17c-1.014 9.567-11.661 19.806-21.802 23.162-6.084 2.015-31.434 2.015-39.547 1.008-8.112-1.008-19.342-9.463-24.843-20.142C13.967 84.095 6.779 70.803 4.54 64.425c-2.12-6.043 2.535-10.575 4.563-11.582 2.028-1.007 7.099-2.743 13.69 4.028 5.152 5.293 10.647 17.12 10.647 17.12V13.065S33.948 4 43.074 4Z';
				break;
			case 'text':
				path = 'M14.857 69.158h7.857v39.053c0 4.053-3.442 7.473-7.857 7.473H8.286c-2.844 0-5.286 2.235-5.286 5.158C3 123.765 5.442 126 8.286 126h6.571c5.134 0 9.793-2.029 13.143-5.319 3.35 3.29 8.009 5.319 13.143 5.319h6.571c2.844 0 5.286-2.235 5.286-5.158 0-2.923-2.442-5.158-5.286-5.158h-6.571c-4.415 0-7.857-3.42-7.857-7.473V69.158h7.857c2.843 0 5.286-2.235 5.286-5.158 0-2.923-2.443-5.158-5.286-5.158h-7.857V19.79c0-4.054 3.442-7.474 7.857-7.474h6.571c2.844 0 5.286-2.235 5.286-5.158C53 4.235 50.558 2 47.714 2h-6.571C36.009 2 31.35 4.03 28 7.319 24.65 4.029 19.991 2 14.857 2H8.286C5.442 2 3 4.235 3 7.158c0 2.923 2.442 5.158 5.286 5.158h6.571c4.415 0 7.857 3.42 7.857 7.473v39.053h-7.857c-2.843 0-5.286 2.235-5.286 5.158 0 2.923 2.443 5.158 5.286 5.158Z';
				break;
			case 'default':
			default:
				path = 'M5 6.2a1 1 0 0 1 1.7-.8l76.5 66a1 1 0 0 1-.6 1.8l-32.1 2.5a1 1 0 0 0-.8 1.4l17.8 36.8a1 1 0 0 1-.5 1.3l-17 7.4c-.5.2-1 0-1.3-.5l-17-36.8a1 1 0 0 0-1.6-.4L6.6 103.5a1 1 0 0 1-1.6-.7V6.2Z'; break;
		}

		return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="${color}" d="${path}" stroke="${stroke}" stroke-width="${strokeWidth}"/></svg>`;
	}

	setCursor = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			stylesServiceInstance.removeStyle('cursor-aspect');
		} else {
			let color = value.split('_')[1];
			let size = value.split('_')[0] === 'big' ? 56 : 128;
			let styleCursor = `
				* {
					cursor: url('data:image/svg+xml;utf8,${this.drawCursor('default', size, color, 6)}') 0 0, default !important;
				}

				a:link,
				a:visited,
				button {
					cursor: url('data:image/svg+xml;utf8,${this.drawCursor('pointer', size, color, 6)}') ${size / 3} 0, pointer !important;
				}

				h1, h2, h3, h4, h5, h6,
				p, ul, ol, dl, blockquote,
				pre, td, th,
				input, textarea, legend {
					cursor: url('data:image/svg+xml;utf8,${this.drawCursor('text', size, color, 4)}') ${size / 4} ${size / 4}, text !important;
				}
			`;

			stylesServiceInstance.setStyle('cursor-aspect', styleCursor);
		}
	}
}
