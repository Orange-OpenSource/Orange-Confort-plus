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
			{ name: 'capitalLetters', instanceService: capitalLettersServiceInstance.setCapitalLetters.bind(this), value: DEFAULT_VALUE },
			{ name: 'clearlyLinks', instanceService: clearlyLinksServiceInstance.setClearlyLinks.bind(this), value: DEFAULT_VALUE },
			{ name: 'clickFacilite', instanceService: clickFaciliteServiceInstance.setClickFacilite.bind(this), value: DEFAULT_VALUE },
			{ name: 'colorContrast', instanceService: colorContrastServiceInstance.setColorsContrasts.bind(this), value: DEFAULT_VALUE },
			{ name: 'cursorAspect', instanceService: cursorAspectServiceInstance.setCursor.bind(this), value: DEFAULT_VALUE },
			{ name: 'deleteBackgroundImages', instanceService: deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this), value: DEFAULT_VALUE },
			{ name: 'focusAspect', instanceService: focusAspectServiceInstance.setFocus.bind(this), value: DEFAULT_VALUE },
			{ name: 'fontFamily', instanceService: fontFamilyServiceInstance.setFontFamily.bind(this), value: DEFAULT_VALUE },
			{ name: 'linkStyle', instanceService: linkStyleServiceInstance.setLinkStyle.bind(this), value: DEFAULT_VALUE },
			{ name: 'magnifier', instanceService: magnifierServiceInstance.setMagnifier.bind(this), value: DEFAULT_VALUE },
			{ name: 'marginAlign', instanceService: marginAlignServiceInstance.setMargin.bind(this), value: DEFAULT_VALUE },
			{ name: 'navigationAuto', instanceService: navigationAutoServiceInstance.setNavigationAuto.bind(this), value: DEFAULT_VALUE },
			{ name: 'navigationButtons', instanceService: navigationButtonsServiceInstance.setNavigationButtons.bind(this), value: DEFAULT_VALUE },
			{ name: 'readAloud', instanceService: readAloudServiceInstance.setReadAloud.bind(this), value: DEFAULT_VALUE },
			{ name: 'readingGuide', instanceService: readingGuideServiceInstance.setReadingMaskGuide.bind(this), value: DEFAULT_VALUE },
			{ name: 'restartTopLeft', instanceService: restartTopLeftServiceInstance.setRestartTopLeft.bind(this), value: DEFAULT_VALUE },
			{ name: 'scroll', instanceService: scrollAspectServiceInstance.setScrollAspect.bind(this), value: DEFAULT_VALUE },
			{ name: 'skipToContent', instanceService: skipToContentServiceInstance.setSkipToContent.bind(this), value: DEFAULT_VALUE },
			{ name: 'stopAnimations', instanceService: stopAnimationsServiceInstance.setStopAnimations.bind(this), value: DEFAULT_VALUE },
			{ name: 'textSize', instanceService: textSizeServiceInstance.setFontSize.bind(this), value: DEFAULT_VALUE },
			{ name: 'textSpacing', instanceService: textSpacingServiceInstance.setSpacingText.bind(this), value: DEFAULT_VALUE },
			{ name: 'zoom', instanceService: zoomServiceInstance.setZoom.bind(this), value: DEFAULT_VALUE }
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
				settingsService.instanceService(DEFAULT_VALUE);
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
