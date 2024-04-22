let linkStyleServiceIsInstantiated: boolean;

class LinkStyleService {

	constructor() {
		if (linkStyleServiceIsInstantiated) {
			throw new Error('LinkStyleService is already instantiated.');
		}

		linkStyleServiceIsInstantiated = true;
	}

	setLinkStyle = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			stylesServiceInstance.removeStyle('link');
		} else {
			let linkColor = value.split('_')[0];
			let linkPointedColor = value.split('_')[1];
			let linkVisitedColor = value.split('_')[2];

			let styleLink = `
				a:link {
					color: ${linkColor} !important;
				}
				a:visited {
					color: ${linkVisitedColor} !important;
				}
				a:active, a:hover, a:focus {
					color: ${linkPointedColor} !important;
				}
			`;

			stylesServiceInstance.setStyle('link', styleLink);
		}
	}
}
