"use strict";
let pauseServiceIsInstantiated;
class PauseService {
    settingsServices = [];
    constructor() {
        if (pauseServiceIsInstantiated) {
            throw new Error('PauseService is already instantiated.');
        }
        pauseServiceIsInstantiated = true;
        this.settingsServices = [...globalSettingsServices];
    }
    pauseSettings = (currentSettings) => {
        const settings = JSON.parse(currentSettings);
        settings.forEach((setting) => {
            let settingValues = Object.values(setting)[0];
            this.settingsServices.forEach((settingsService) => {
                if (settingsService.name === Object.keys(setting)[0]) {
                    settingsService.value = this.getSelectedValue(settingValues);
                }
                settingsService.instanceService(DEFAULT_VALUE);
            });
        });
    };
    getSelectedValue = (setting) => {
        return setting.values.split(',')[setting.valueSelected];
    };
    playSettings = () => {
        this.settingsServices.forEach((settingsService) => {
            settingsService.instanceService(settingsService.value);
        });
    };
}
