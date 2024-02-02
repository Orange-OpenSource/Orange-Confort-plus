let stylesServiceIsInstantiated: boolean;

class StylesService {
	//@ts-ignore
	prefixStyle = `${prefix}style-`;

	constructor() {
		if (stylesServiceIsInstantiated) {
			throw new Error('StylesService is already instantiated.');
		}

		stylesServiceIsInstantiated = true;
	}

	setStyle(name: string, style: string): void {
		if (document.querySelectorAll(`#${this.prefixStyle}${name}`).length === 0) {
			let styleElement: HTMLStyleElement = document.createElement('style');
			styleElement.setAttribute('id', `${this.prefixStyle}${name}`);
			styleElement.innerHTML = style;
			document.head.appendChild(styleElement);
		} else {
			document.querySelector(`#${this.prefixStyle}${name}`).innerHTML = style;
		}
	}

	removeStyle(name: string): void {
		document.querySelector(`#${this.prefixStyle}${name}`)?.remove();
	}
}

