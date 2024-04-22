let deleteBackgroundImagesServiceIsInstantiated: boolean;

class DeleteBackgroundImagesService {

	constructor() {
		if (deleteBackgroundImagesServiceIsInstantiated) {
			throw new Error('DeleteBackgroundImagesService is already instantiated.');
		}

		deleteBackgroundImagesServiceIsInstantiated = true;
	}

	setDeleteBackgroundImages = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			stylesServiceInstance.removeStyle('delete-background-images');
		} else {
			let styleDeleteBackgroundImages = `
				*, *::before, *::after {
					background-image: none !important;
				}
			`;

			stylesServiceInstance.setStyle('delete-background-images', styleDeleteBackgroundImages);
		}
	}
}
