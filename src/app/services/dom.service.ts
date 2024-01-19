let stylesServiceIsInstantiated: boolean;

class StylesService {
	//@ts-ignore
	prefixStyle = `${prefix}style-`;

	constructor() {
		if (stylesServiceIsInstantiated) {
			throw new Error('Le domService est déjà instancié.');
		}

		stylesServiceIsInstantiated = true;
	}

	setStyle(name: string, style: string): void {
		if (document.querySelectorAll(`#${this.prefixStyle}${name}`).length === 0) {
			let stylesContrast: HTMLStyleElement = document.createElement('style');
			stylesContrast.setAttribute('id', `${this.prefixStyle}${name}`);
			stylesContrast.innerHTML = style;
			document.head.appendChild(stylesContrast);
		} else {
			document.querySelector(`#${this.prefixStyle}${name}`).innerHTML = style;
		}
	}

	removeStyle(name: string): void {
		document.querySelector(`#${this.prefixStyle}${name}`)?.remove();
	}
}

