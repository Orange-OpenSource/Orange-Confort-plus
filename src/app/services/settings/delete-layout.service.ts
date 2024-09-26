let deleteLayoutServiceIsInstantiated: boolean;

class DeleteLayoutService {
	storedStyles: any[];

	constructor() {
		if (deleteLayoutServiceIsInstantiated) {
			throw new Error('DeleteLayoutService is already instantiated.');
		}

		deleteLayoutServiceIsInstantiated = true;
	}

	setDeleteLayout = (value: string): void => {
		this.storedStyles?.forEach(style => document.head.appendChild(style));
		if (value !== DEFAULT_VALUE) {
			const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
			this.storedStyles = Array.from(stylesheets).filter(style => {
				if (style.id && style.id.startsWith(PREFIX)) {
					return false;
				} else {
					style.remove();
					return true;
				}
			});
		}
	}
}
