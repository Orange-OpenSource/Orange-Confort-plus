let iconsServiceIsInstantiated: boolean;

class IconsService {
	constructor() {
		if (iconsServiceIsInstantiated) {
			throw new Error('IconsService is already instantiated.');
		}

		iconsServiceIsInstantiated = true;
	}

	get path(): string {
		return `${window.location.origin}/assets/icons/orange-icons-sprite.svg`;
	}

	loadSprite(root: ShadowRoot): void { return; }
}
