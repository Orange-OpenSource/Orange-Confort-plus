let stringServiceIsInstantiated: boolean;

class StringService {
	constructor() {
		if (stringServiceIsInstantiated) {
			throw new Error('Le StringService est déjà instancié.');
		}

		stringServiceIsInstantiated = true;
	}

	normalizeID(string: string): string {
		return string
			?.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f\s]/g, "")
			.split("-")
			.join("");
	}

	normalizeSettingName(string: string): string {
		return string
			?.replace(/([a-z])([A-Z])/g, "$1-$2")
			.toLowerCase()
			.replace("app-", "")
			.normalize("NFD")
			.replace(/[\u0300-\u036f\s]/g, "");
	}
}

