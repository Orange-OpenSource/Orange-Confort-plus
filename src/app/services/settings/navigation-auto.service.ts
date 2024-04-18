let navigationAutoServiceIsInstantiated: boolean;

class NavigationAutoService {

	constructor() {
		if (navigationAutoServiceIsInstantiated) {
			throw new Error('NavigationAutoService is already instantiated.');
		}

		navigationAutoServiceIsInstantiated = true;
	}
}
