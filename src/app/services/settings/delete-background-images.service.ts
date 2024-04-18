let deleteBackgroundImagesServiceIsInstantiated: boolean;

class DeleteBackgroundImagesService {

	constructor() {
		if (deleteBackgroundImagesServiceIsInstantiated) {
			throw new Error('DeleteBackgroundImagesService is already instantiated.');
		}

		deleteBackgroundImagesServiceIsInstantiated = true;
	}
}
