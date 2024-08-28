let stringServiceIsInstantiated: boolean;

class StringService {
	constructor() {
		if (stringServiceIsInstantiated) {
			throw new Error('StringService is already instantiated.');
		}

		stringServiceIsInstantiated = true;
	}

	normalizeID(string: string): string {
		return string
			?.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f\s]/g, '')
			.split('-')
			.join('');
	}

	normalizeSettingName(string: string): string {
		return string
			?.replace(/([a-z])([A-Z])/g, '$1-$2')
			.toLowerCase()
			.replace('app-', '')
			.normalize('NFD')
			.replace(/[\u0300-\u036f\s]/g, '');
	}

	normalizeSettingCamelCase(string: string): string {
		return string
			?.replace('app-', '')
			.normalize('NFD')
			.replace(/[\u0300-\u036f\s]/g, '')
			.replace(/-./g, x => x[1].toUpperCase());
	}

	capitalizeFirstLetter = (string: string): string => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

