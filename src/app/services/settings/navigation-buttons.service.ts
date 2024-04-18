let navigationButtonsServiceIsInstantiated: boolean;

class NavigationButtonsService {

	constructor() {
		if (navigationButtonsServiceIsInstantiated) {
			throw new Error('NavigationButtonsService is already instantiated.');
		}

		navigationButtonsServiceIsInstantiated = true;
	}
}
