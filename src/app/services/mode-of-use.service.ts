let modeOfUseServiceIsInstantiated: boolean;

class ModeOfUseService {

	constructor() {
		if (modeOfUseServiceIsInstantiated) {
			throw new Error('ModeOfUseService is already instantiated.');
		}

		modeOfUseServiceIsInstantiated = true;
	}

	setSelectedMode = (newSelectedMode: string): void => {
		localStorageServiceInstance.getItem(jsonName).then((result: any) => {
			let json = result;
			json.selectedMode = newSelectedMode;
			localStorageServiceInstance.setItem(jsonName, json);
		});
	}

	getSelectedMode(json: ModeOfUseModel): string {
		let selectedMode: string;
		json.modes.forEach((mode: any) => {
			if (Object.entries(mode)[0][0] === json.selectedMode) {
				selectedMode = mode;
			}
		});
		return JSON.stringify(selectedMode);
	}

	setSettingValue(key: string, newIndex: number, newValue?: string): Promise<boolean> {
		let jsonIsEdited = false;
		return localStorageServiceInstance.getItem(jsonName)
			.then((result: any) => {
				let json = result;
				json.modes.forEach((mode: any) => {
					if (Object.keys(mode)[0] === json.selectedMode) {
						let modeSettings: Object[] = Object.entries(mode)[0][1] as [];
						let setting = modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(key));
						if (setting) {
							let settingValues: SettingModel = Object.entries(setting)[0][1];
							if (newValue) {
								let newValues: string[] = settingValues.values.split(',');
								newValues.length === 4 ? newValues[3] = newValue : newValues.push(newValue);
								settingValues.values = newValues.toString();
							}
							settingValues.activeValue = newIndex;
							localStorageServiceInstance.setItem(jsonName, json);
							jsonIsEdited = true;
						}
					}
				});
				return jsonIsEdited;
			})
			.catch((error: any) => {
				console.error("Your settings could not be saved.");
				return jsonIsEdited;
			});
	}

	getCustomValue(settingName: string): Promise<string> {
		let customValue: string = '';
		return localStorageServiceInstance.getItem(jsonName)
			.then((result: any) => {
				let json = result;
				json.modes.forEach((mode: any) => {
					if (Object.keys(mode)[0] === json.selectedMode) {
						let modeSettings: Object[] = Object.entries(mode)[0][1] as [];
						let setting = modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName));
						customValue = (Object.entries(setting)[0][1] as SettingModel).values.split(',')[3];
					}
				});
				return customValue;
			})
			.catch((error: any) => {
				console.error("The custom value of this setting could not be return.");
				return customValue;
			});
	}
}
