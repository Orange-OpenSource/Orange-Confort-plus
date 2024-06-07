let modeOfUseServiceIsInstantiated: boolean;

class ModeOfUseService {

	constructor() {
		if (modeOfUseServiceIsInstantiated) {
			throw new Error('ModeOfUseService is already instantiated.');
		}

		modeOfUseServiceIsInstantiated = true;
	}

	setSelectedMode = (newSelectedMode: string): void => {
		localStorageServiceInstance.getItem(JSON_NAME).then((result: any) => {
			let json = result;
			json.selectedMode = newSelectedMode;
			localStorageServiceInstance.setItem(JSON_NAME, json);
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

	setSettingValue = (settingName: string, newIndex: number, removeCustom = false): Promise<boolean> => {
		let jsonIsEdited = false;
		return localStorageServiceInstance.getItem(JSON_NAME)
			.then((result: any) => {
				let json = result;
				json.modes.forEach((mode: any) => {
					if (Object.keys(mode)[0] === json.selectedMode) {
						let modeSettings: Object[] = Object.entries(mode)[0][1] as [];
						let setting: SettingModel = Object.entries(modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)))[0][1];
						let values = setting.values.split(',');

						if (setting) {
							if (removeCustom && values[3]) {
								values.pop();
								setting.values = values.toString();
							}

							setting.valueSelected = newIndex;
							localStorageServiceInstance.setItem(JSON_NAME, json);
							jsonIsEdited = true;
						}
					}
				});
				return jsonIsEdited;
			})
			.catch((error: any) => {
				console.error('Your setting could not be saved.');
				return jsonIsEdited;
			});
	}

	getSetting(settingName: string): Promise<SettingModel> {
		let setting: SettingModel;
		return localStorageServiceInstance.getItem(JSON_NAME)
			.then((result: any) => {
				let json = result;
				json.modes.forEach((mode: any) => {
					if (Object.keys(mode)[0] === json.selectedMode) {
						let modeSettings: Object[] = Object.entries(mode)[0][1] as [];
						setting = Object.entries(modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)))[0][1];
					}
				});
				return setting;
			})
			.catch((error: any) => {
				console.error('Values of this setting could not be return.');
				return setting;
			});
	}

	addSettingCustomValue = (settingName: string, newIndex: number, newValue: string): Promise<boolean> => {
		let jsonIsEdited = false;
		return localStorageServiceInstance.getItem(JSON_NAME)
			.then((result: any) => {
				let json = result;
				json.modes.forEach((mode: any) => {
					if (Object.keys(mode)[0] === json.selectedMode) {
						let modeSettings: Object[] = Object.entries(mode)[0][1] as [];
						let setting: SettingModel = Object.entries(modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)))[0][1];
						let values = setting.values.split(',');
						if (setting) {
							values[3] = newValue;
							setting.valueSelected = newIndex;
							setting.values = values.toString();
							localStorageServiceInstance.setItem(JSON_NAME, json);
							jsonIsEdited = true;
						}
					}
				});
				return jsonIsEdited;
			})
			.catch((error: any) => {
				console.error('The custom value of this setting could not be saved.');
				return jsonIsEdited;
			});
	}
}
