let clearlyLinksServiceIsInstantiated: boolean;

class ClearlyLinksService {

	constructor() {
		if (clearlyLinksServiceIsInstantiated) {
			throw new Error('ClearlyLinksService is already instantiated.');
		}

		clearlyLinksServiceIsInstantiated = true;
	}

	setClearlyLinks = (value: string): void => {
		let styleClearlyLinks = "";
		switch (value) {
			case "bold_underline":
				styleClearlyLinks = `
					a:any-link {
						font-weight: bold !important;
						text-decoration: underline !important;
					}`;
				stylesServiceInstance.setStyle("clearly-links", styleClearlyLinks);
				this.resetInverseBorder();
				break;
			case "bold_boxed":
				styleClearlyLinks = `
					a:any-link {
						font-weight: bold !important;
						border: 2px solid black !important;
					}`;
				stylesServiceInstance.setStyle("clearly-links", styleClearlyLinks);
				this.applyInverseBorder();
				break;
			default:
				stylesServiceInstance.removeStyle("clearly-links");
				this.resetInverseBorder();
				break;
		}
	}

	/* Adds reverse colour to link borders */
	applyInverseBorder = (): void => {
		const elements = document.querySelectorAll('a');
		elements.forEach((element: Element) => {
			const bgColor = this.getEffectiveBackgroundColor(element);
			const rgb = bgColor.match(/\d+/g);

			if (rgb) {
				const hex = rgb.map(x => ('0' + parseInt(x).toString(16)).slice(-2)).join('');
				const invertedColor = this.invertedColor(hex);
				(element as HTMLElement).style.setProperty('border-color', invertedColor, 'important');
			}
		});
	}

	getEffectiveBackgroundColor = (element: Element): string => {
		let currentElement: Element = element;
		while (currentElement) {
			const bgColor = window.getComputedStyle(currentElement).backgroundColor;
			const rgba = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+)?\)/);

			if (rgba) {
				const alpha = rgba[4] ? parseFloat(rgba[4]) : 1;
				if (alpha !== 0) {
					return bgColor;
				}
			}
			currentElement = currentElement.parentElement;
		}

		return 'rgb(255, 255, 255)';
	}

	invertedColor = (hex: string): string => {
		hex = hex.replace('#', '');

		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);

		const invertedR = 255 - r;
		const invertedG = 255 - g;
		const invertedB = 255 - b;

		const invertedHex = ((1 << 24) + (invertedR << 16) + (invertedG << 8) + invertedB)
			.toString(16)
			.slice(1)
			.toUpperCase();

		return `#${invertedHex}`;
	}

	resetInverseBorder = (): void => {
		const elements = document.querySelectorAll('a');
		elements.forEach((element: Element) => {
			(element as HTMLElement).style.removeProperty('borderColor');
		});
	}
}
