let pauseServiceIsInstantiated: boolean;

interface SavedSettingsState {
	name: string;
	instanceService: any;
	value: any;
}

class PauseService {
	settingsServices: SavedSettingsState[] = [];

	constructor() {
		if (pauseServiceIsInstantiated) {
			throw new Error('PauseService is already instantiated.');
		}

		pauseServiceIsInstantiated = true;

		this.settingsServices = [
			{ name: 'capitalLetters', instanceService: capitalLettersServiceInstance.setCapitalLetters.bind(this), value: '' },
			{ name: 'clearlyLinks', instanceService: clearlyLinksServiceInstance.setClearlyLinks.bind(this), value: '' },
			{ name: 'clickFacilite', instanceService: clickFaciliteServiceInstance.setClickFacilite.bind(this), value: '' },
			{ name: 'colorContrast', instanceService: colorContrastServiceInstance.setColorsContrasts.bind(this), value: '' },
			{ name: 'colourTheme', instanceService: colourThemeServiceInstance.setColourTheme.bind(this), value: '' },
			{ name: 'cursorAspect', instanceService: cursorAspectServiceInstance.setCursor.bind(this), value: '' },
			{ name: 'deleteBackgroundImages', instanceService: deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this), value: '' },
			{ name: 'focusAspect', instanceService: focusAspectServiceInstance.setFocus.bind(this), value: '' },
			{ name: 'fontFamily', instanceService: fontFamilyServiceInstance.setFontFamily.bind(this), value: '' },
			{ name: 'linkStyle', instanceService: linkStyleServiceInstance.setLinkStyle.bind(this), value: '' },
			{ name: 'magnifier', instanceService: magnifierServiceInstance.setMagnifier.bind(this), value: '' },
			{ name: 'marginAlign', instanceService: marginAlignServiceInstance.setMargin.bind(this), value: '' },
			{ name: 'navigationButtons', instanceService: navigationButtonsServiceInstance.setNavigationButtons.bind(this), value: '' },
			{ name: 'readAloud', instanceService: readAloudServiceInstance.setReadAloud.bind(this), value: '' },
			{ name: 'readingGuide', instanceService: readingGuideServiceInstance.setReadingMaskGuide.bind(this), value: '' },
			{ name: 'scroll', instanceService: scrollServiceInstance.setScroll.bind(this), value: '' },
			{ name: 'skipToContent', instanceService: skipToContentServiceInstance.setSkipToContent.bind(this), value: '' },
			{ name: 'stopAnimations', instanceService: stopAnimationsServiceInstance.setStopAnimations.bind(this), value: '' },
			{ name: 'textSize', instanceService: textSizeServiceInstance.setFontSize.bind(this), value: '' },
			{ name: 'textSpacing', instanceService: textSpacingServiceInstance.setSpacingText.bind(this), value: '' }
		];
	}

	pauseSettings = (currentSettings: string): void => {
		const settings: any[] = JSON.parse(currentSettings);
		settings.forEach((setting: any) => {
			let settingValues: any = Object.values(setting)[0];
			this.settingsServices.forEach((settingsService: SavedSettingsState) => {
				if (settingsService.name === Object.keys(setting)[0]) {
					settingsService.value = this.getSelectedValue(settingValues);
				}
				settingsService.instanceService('noModifications');
			});
		});
	}

	getSelectedValue = (setting: any): string => {
		return setting.values.split(',')[setting.valueSelected];
	}

	playSettings = (): void => {
		this.settingsServices.forEach((settingsService: SavedSettingsState) => {
			settingsService.instanceService(settingsService.value);
		});
	}
}
