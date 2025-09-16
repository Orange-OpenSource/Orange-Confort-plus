let modeOfUseServiceIsInstantiated: boolean;

class ModeOfUseService {

	constructor() {
		if (modeOfUseServiceIsInstantiated) {
			throw new Error('ModeOfUseService is already instantiated.');
		}

		modeOfUseServiceIsInstantiated = true;
	}

	setSelectedMode = (newSelectedModeName: string): void => {
		localStorageServiceInstance.getItem(JSON_NAME).then((result: any) => {
			let json = result;

			/* Check if have to reset mode or not */
			if (json.selectedMode !== undefined && json.selectedMode === newSelectedModeName) {
				filesServiceInstance.getJSONFile('modes-of-use').then((result: any) => {
					const defaultJson = result;
					let resetMode: any;
					defaultJson.modes.forEach((mode: any) => {
						if (Object.keys(mode)[0] === json.selectedMode) {
							resetMode = mode;
						}
					});

					json.modes.forEach((mode: any, index: number) => {
						if (Object.keys(mode)[0] === json.selectedMode) {
							json.modes[index] = resetMode;
						}
					});

					json.selectedMode = newSelectedModeName;
					localStorageServiceInstance.setItem(JSON_NAME, json);
					localStorageServiceInstance.setItem('selectedModeName', newSelectedModeName);
				});
			} else {
				json.selectedMode = newSelectedModeName;
				localStorageServiceInstance.setItem(JSON_NAME, json);
				localStorageServiceInstance.setItem('selectedModeName', newSelectedModeName);
			}
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
						let setting = modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName));
						let settingValues: SettingModel = Object.entries(setting)[0][1];
						let values = settingValues.values.split(',');
						let indexSetting = modeSettings.indexOf(setting);
						modeSettings.splice(indexSetting, 1);

						if (removeCustom && values[3]) {
							values.pop();
							settingValues.values = values.toString();
						}
						settingValues.valueSelected = newIndex;
						/* Places the setting at the end to ensure that its parameters are applied */
						modeSettings.push(setting);
						localStorageServiceInstance.setItem(JSON_NAME, json);
						jsonIsEdited = true;
					}
				});
				return jsonIsEdited;
			})
			.catch((error: any) => {
				console.log(error);
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
