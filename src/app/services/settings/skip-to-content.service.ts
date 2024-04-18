let skipToContentServiceIsInstantiated: boolean;

class SkipToContentService {

	constructor() {
		if (skipToContentServiceIsInstantiated) {
			throw new Error('SkipToContentService is already instantiated.');
		}

		skipToContentServiceIsInstantiated = true;
	}
}
