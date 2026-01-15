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

		this.settingsServices = [...globalSettingsServices]; 
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
