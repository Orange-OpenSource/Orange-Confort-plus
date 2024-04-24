let colourThemeServiceIsInstantiated: boolean;

interface ColourThemeValues {
	name: string;
	cursor: string;
	focus: string;
	scroll: string;
	link: string;
};

class ColourThemeService {
	colourThemeDictionnary: ColourThemeValues[] = [
		{ name: DEFAULT_VALUE, cursor: DEFAULT_VALUE, focus: DEFAULT_VALUE, scroll: DEFAULT_VALUE, link: DEFAULT_VALUE },
		{ name: 'reinforcedContrasts', cursor: 'big_black', focus: 'big_black', scroll: 'big_black', link: 'darkblue_orange_darkgreen' },
		{ name: 'white_black', cursor: 'big_white', focus: 'big_white', scroll: 'big_white', link: 'yellow_orange_lightgreen' }
	];

	constructor() {
		if (colourThemeServiceIsInstantiated) {
			throw new Error('ColourThemeService is already instantiated.');
		}

		colourThemeServiceIsInstantiated = true;
	}

	setColourTheme = (value: string): void => {
		const colourThemeValues: ColourThemeValues = this.colourThemeDictionnary.find((o: ColourThemeValues) => o.name === value);
		this.setServices(colourThemeValues);
	}

	setServices = (colourThemeValues: ColourThemeValues): void => {
		cursorAspectServiceInstance.setCursor(colourThemeValues.cursor);
		focusAspectServiceInstance.setFocus(colourThemeValues.focus);
		scrollServiceInstance.setScroll(colourThemeValues.scroll);
		linkStyleServiceInstance.setLinkStyle(colourThemeValues.link);
	}
}
