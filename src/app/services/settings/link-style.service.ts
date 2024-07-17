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
			const [linkColor, linkPointedColor, linkVisitedColor] = value.split('_');

			const styleColorLink = linkColor !== DEFAULT_VALUE ? `a:link { color: ${linkColor} !important; }` : '';
			const styleColorActiveLink = linkPointedColor !== DEFAULT_VALUE ? `a:active, a:hover, a:focus { color: ${linkPointedColor} !important; }` : '';
			const styleColorVisitedLink = linkVisitedColor !== DEFAULT_VALUE ? `a:visited { color: ${linkVisitedColor} !important; }` : '';

			let styleLink = `${styleColorLink} ${styleColorVisitedLink} ${styleColorActiveLink}`;
			stylesServiceInstance.setStyle('link', styleLink);
		}
	}
}
