"use strict";
let modeOfUseServiceIsInstantiated;
class ModeOfUseService {
    constructor() {
        if (modeOfUseServiceIsInstantiated) {
            throw new Error('ModeOfUseService is already instantiated.');
        }
        modeOfUseServiceIsInstantiated = true;
    }
    setSelectedMode = (newSelectedModeName) => {
        localStorageServiceInstance.getItem(JSON_NAME).then((result) => {
            let json = result;
            /* Check if have to reset mode or not */
            if (json.selectedMode !== undefined && json.selectedMode === newSelectedModeName) {
                filesServiceInstance.getJSONFile('modes-of-use').then((result) => {
                    const defaultJson = result;
                    let resetMode;
                    defaultJson.modes.forEach((mode) => {
                        if (Object.keys(mode)[0] === json.selectedMode) {
                            resetMode = mode;
                        }
                    });
                    json.modes.forEach((mode, index) => {
                        if (Object.keys(mode)[0] === json.selectedMode) {
                            json.modes[index] = resetMode;
                        }
                    });
                    json.selectedMode = newSelectedModeName;
                    localStorageServiceInstance.setItem(JSON_NAME, json);
                    localStorageServiceInstance.setItem('selectedModeName', newSelectedModeName);
                });
            }
            else {
                json.selectedMode = newSelectedModeName;
                localStorageServiceInstance.setItem(JSON_NAME, json);
                localStorageServiceInstance.setItem('selectedModeName', newSelectedModeName);
            }
        });
    };
    getSelectedMode(json) {
        let selectedMode;
        json.modes.forEach((mode) => {
            if (Object.entries(mode)[0][0] === json.selectedMode) {
                selectedMode = mode;
            }
        });
        return JSON.stringify(selectedMode);
    }
    setSettingValue = (settingName, newIndex, removeCustom = false) => {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(JSON_NAME)
            .then((result) => {
            let json = result;
            json.modes.forEach((mode) => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName));
                    let settingValues = Object.entries(setting)[0][1];
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
            .catch((error) => {
            console.log(error);
            console.error('Your setting could not be saved.');
            return jsonIsEdited;
        });
    };
    getSetting(settingName) {
        let setting;
        return localStorageServiceInstance.getItem(JSON_NAME)
            .then((result) => {
            let json = result;
            json.modes.forEach((mode) => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    setting = Object.entries(modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)))[0][1];
                }
            });
            return setting;
        })
            .catch((error) => {
            console.error('Values of this setting could not be return.');
            return setting;
        });
    }
    addSettingCustomValue = (settingName, newIndex, newValue) => {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(JSON_NAME)
            .then((result) => {
            let json = result;
            json.modes.forEach((mode) => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = Object.entries(modeSettings.find(o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)))[0][1];
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
            .catch((error) => {
            console.error('The custom value of this setting could not be saved.');
            return jsonIsEdited;
        });
    };
}
