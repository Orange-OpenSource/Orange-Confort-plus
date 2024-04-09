let marginAlignServiceIsInstantiated: boolean;

class MarginAlignService {

	constructor() {
		if (marginAlignServiceIsInstantiated) {
			throw new Error('MarginAlignService is already instantiated.');
		}

		marginAlignServiceIsInstantiated = true;
	}

	setMargin = (value: string): void => {
		const elements = value === 'margeList' ?
			document.querySelectorAll('ul, ol') :
			document.body.querySelectorAll('*');

		elements.forEach((elt) => {
			const element = elt as HTMLElement;
			switch (value) {
				case 'alignLeft': {
					element.style.textAlign = 'left';
					break;
				}
				case 'marginLeft': {
					element.style.textAlign = 'left';
					element.style.marginLeft = '40px';
					break;
				}
				case 'margeList': {
					element.style.listStylePosition = 'initial';
					element.style.listStyleImage = 'none';
					element.style.listStyleType = 'decimal';
					break;
				}
				default: {
					element.style.textAlign = null;
					element.style.marginLeft = null;
					element.style.listStylePosition = null;
					element.style.listStyleImage = null;
					element.style.listStyleType = null;
					break;
				}
			}
		});
	}
}
