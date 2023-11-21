class iconsService {
	constructor() {}

	get path(): string {
		return `${window.location.origin}/assets/icons/orange-icons-sprite.svg`;
	}

	loadSprite(root: ShadowRoot): void { return; }
}
