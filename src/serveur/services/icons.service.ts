let iconsServiceIsInstantiated: boolean;

class IconsService {
	constructor() {
		if (iconsServiceIsInstantiated) {
			throw new Error('Le IconsService est déjà instancié.');
		}

		iconsServiceIsInstantiated = true;
	}

	get path(): string {
		return `${window.location.origin}/assets/icons/orange-icons-sprite.svg`;
	}

	loadSprite(root: ShadowRoot): void { return; }
}
