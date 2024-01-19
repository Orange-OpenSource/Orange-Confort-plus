let modeOfUseServiceIsInstantiated: boolean;

class ModeOfUseService {

	constructor() {
		if (modeOfUseServiceIsInstantiated) {
			throw new Error('Le routeur est déjà instancié.');
		}

		modeOfUseServiceIsInstantiated = true;
	}

	setSelectedMode(newSelectedMode: string): void {
		localStorageServiceInstance.getItem('modeOfUse').then((result: any) => {
			let json = result;
			json.selectedMode = newSelectedMode;
			localStorageServiceInstance.setItem('modeOfUse', json);
		});
	}

	setSettingValue(key: string, newIndex: number): Promise<boolean> {
		let jsonIsEdited = false;
		return localStorageServiceInstance.getItem('modeOfUse')
			.then((result: any) => {
				let json = result;
				json.modes.forEach((mode: any) => {
					if (Object.keys(mode)[0] === json.selectedMode) {
						let modeSettings: Object[] = Object.entries(mode)[0][1] as [];
						let setting = modeSettings.find(o => Object.keys(o)[0] === key);
						if (setting) {
							let settingValues: any = Object.entries(setting)[0][1];
							settingValues.activeValue = newIndex;
							localStorageServiceInstance.setItem('modeOfUse', json);
							jsonIsEdited = true;
						}
					}
				});
				return jsonIsEdited;
			})
			.catch((error: any) => {
				console.error("Vos paramètres n'ont pas pu être sauvegardés.");
				return jsonIsEdited;
			});
	}
}
