let colourThemeServiceIsInstantiated: boolean;

class ColourThemeService {

	constructor() {
		if (colourThemeServiceIsInstantiated) {
			throw new Error('ColourThemeService is already instantiated.');
		}

		colourThemeServiceIsInstantiated = true;
	}
}
