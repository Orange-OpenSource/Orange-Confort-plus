let categoriesServiceIsInstantiated: boolean;

interface AccordionState {
	name: string;
	open: boolean;
}

class CategoriesService {
	selectedMode: string;
	settingAccordions: AccordionState[] = [
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

	openCategory = (category: string, open: boolean): void => {
		const mainIndex = this.settingAccordions.findIndex(o => o.name === category.toLowerCase());
		this.settingAccordions.forEach((accordion: AccordionState, index) => {
			accordion.open = index === mainIndex ? !accordion.open : false;
		});
	}

	openMainCategory = (selectedMode: string): void => {
		let mainAccordion: string;

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

			this.settingAccordions.forEach((accordion: AccordionState, index) => {
				accordion.open = accordion.name === mainAccordion ? true : false;
			});
		}
	}
}

