const tmplCursorAspect: HTMLTemplateElement = document.createElement('template');
tmplCursorAspect.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="cursorAspect" data-icon="CursorSetting"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class CursorAspectComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,big+black,huge+green",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setCursor.bind(this));

		this.appendChild(tmplCursorAspect.content.cloneNode(true));
	}

	drawCursor = (type: string, size: string, color: string): string => {
		let path = '';
		switch (type) {
			case 'pointer':
				// @todo Chemin pour cursor: pointer ?
				path = 'M5 6.2a1 1 0 0 1 1.7-.8l76.5 66a1 1 0 0 1-.6 1.8l-32.1 2.5a1 1 0 0 0-.8 1.4l17.8 36.8a1 1 0 0 1-.5 1.3l-17 7.4c-.5.2-1 0-1.3-.5l-17-36.8a1 1 0 0 0-1.6-.4L6.6 103.5a1 1 0 0 1-1.6-.7V6.2Z';
				break;
			case 'text':
				// @todo Chemin pour cursor: text ?
				path = 'M5 6.2a1 1 0 0 1 1.7-.8l76.5 66a1 1 0 0 1-.6 1.8l-32.1 2.5a1 1 0 0 0-.8 1.4l17.8 36.8a1 1 0 0 1-.5 1.3l-17 7.4c-.5.2-1 0-1.3-.5l-17-36.8a1 1 0 0 0-1.6-.4L6.6 103.5a1 1 0 0 1-1.6-.7V6.2Z';
				break;
			case 'default':
			default:
				path = 'M5 6.2a1 1 0 0 1 1.7-.8l76.5 66a1 1 0 0 1-.6 1.8l-32.1 2.5a1 1 0 0 0-.8 1.4l17.8 36.8a1 1 0 0 1-.5 1.3l-17 7.4c-.5.2-1 0-1.3-.5l-17-36.8a1 1 0 0 0-1.6-.4L6.6 103.5a1 1 0 0 1-1.6-.7V6.2Z';
				break;
		}

		return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="${color}" d="${path}" stroke="black" stroke-width="10"/></svg>`;
	}

	setCursor = (value: string): void => {
		if (value === 'noModifications') {
			stylesServiceInstance.removeStyle(this.name);
		} else {
			let color = value.split('+')[1];
			let size = value.split('+')[0] === 'big' ? '128' : '56';
			let styleCursor = `
				* {
					cursor: url('data:image/svg+xml;utf8,${this.drawCursor('default', size, color)}') 0 0, default !important;
				}

				a:link,
				a:visited {
					cursor: url('data:image/svg+xml;utf8,${this.drawCursor('pointer', size, color)}') 25% 0, pointer !important;
				}

				h1, h2, h3, h4, h5, h6,
				p, ul, ol, dl, blockquote,
				pre, td, th,
				input, textarea, legend {
					cursor: url('data:image/svg+xml;utf8,${this.drawCursor('text', size, color)}') 0 50%, text !important;
				}
			`;

			stylesServiceInstance.setStyle(this.name, styleCursor);
		}
	}
}

customElements.define('app-cursor-aspect', CursorAspectComponent);
