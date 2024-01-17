let iconsServiceIsInstantiated: boolean;

class iconsService {
	constructor() {
		if (iconsServiceIsInstantiated) {
			throw new Error('Le iconsService est déjà instancié.');
		}

		iconsServiceIsInstantiated = true;
	}

	get path(): string {
		return `${window.location.origin}/assets/icons/orange-icons-sprite.svg`;
	}

	loadSprite(root: ShadowRoot): void { return; }
}
