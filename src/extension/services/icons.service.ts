let iconsServiceIsInstantiated: boolean;

class IconsService {
	constructor() {
		if (iconsServiceIsInstantiated) {
			throw new Error('Le IconsService est déjà instancié.');
		}

		iconsServiceIsInstantiated = true;
	}

	get path(): string {
		return '';
	}

	loadSprite(root: ShadowRoot): void {
		fetch(chrome.runtime.getURL('assets/icons/orange-icons-sprite.svg'))
			.then(response => response.text())
			.then(svg => {
				const wrapper = document.createElement('div');
				wrapper.innerHTML = svg;
				wrapper.hidden = true;
				root.insertBefore(wrapper, root.firstChild);
			});
	}
}

