let deleteLayoutServiceIsInstantiated: boolean;

interface StoredStyle {
	stylesheet: Node;
	parent: Element;
};

class DeleteLayoutService {
	storedStyles: StoredStyle[] = [];

	constructor() {
		if (deleteLayoutServiceIsInstantiated) {
			throw new Error('DeleteLayoutService is already instantiated.');
		}

		deleteLayoutServiceIsInstantiated = true;
	}

	setDeleteLayout = (value: string): void => {
		this.storedStyles?.forEach((style: StoredStyle) => {
			style.parent.appendChild(style.stylesheet);
		});

		if (value !== DEFAULT_VALUE) {
			const stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
			Array.from(stylesheets).filter((style: Element) => {
				if (!style.id.startsWith(PREFIX)) {
					const storedStyle: StoredStyle = { stylesheet: style, parent: style.parentElement };
					this.storedStyles.push(storedStyle);
					style.remove();
				}
			});
		}
	}
}
