"use strict";
let categoriesServiceIsInstantiated;
class CategoriesService {
    selectedMode;
    settingAccordions = [
        { name: 'app-text', open: false },
        { name: 'app-layout', open: false },
        { name: 'app-picture-video', open: false },
        { name: 'app-sound', open: false },
        { name: 'app-navigation', open: false }
    ];
    constructor() {
        if (categoriesServiceIsInstantiated) {
            throw new Error('CategoriesService is already instantiated.');
        }
        categoriesServiceIsInstantiated = true;
    }
    openCategory = (category) => {
        let currentCategory = 'allClosed';
        const mainIndex = this.settingAccordions.findIndex(o => o.name === category.toLowerCase());
        this.settingAccordions.forEach((accordion, index) => {
            accordion.open = index === mainIndex ? !accordion.open : false;
            if (accordion.open) {
                currentCategory = accordion.name;
            }
        });
        localStorageServiceInstance.setItem('current-category', currentCategory);
    };
    openMainCategory = (selectedMode) => {
        let mainAccordion;
        return localStorageServiceInstance.getItem('current-category').then((result) => {
            if (result) {
                mainAccordion = result;
            }
            else {
                if (this.selectedMode !== selectedMode) {
                    this.selectedMode = selectedMode;
                    switch (selectedMode) {
                        case 'visionPlus':
                            mainAccordion = 'app-layout';
                            break;
                        case 'facilePlus':
                        default:
                            mainAccordion = 'app-text';
                            break;
                    }
                }
            }
            this.settingAccordions.forEach((accordion, index) => {
                accordion.open = accordion.name === mainAccordion;
            });
            return this.settingAccordions;
        });
    };
}
