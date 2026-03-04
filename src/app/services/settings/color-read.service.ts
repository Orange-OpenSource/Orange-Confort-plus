let colorReadServiceIsInstantiated: boolean;

class ColorReadService {
	enabled: boolean = false;

	constructor() {
		if (colorReadServiceIsInstantiated) {
			throw new Error('ColorReadService is already instantiated.');
		}

		colorReadServiceIsInstantiated = true;
	}

	setColorRead = (value: string): void => {
		this.enabled = value !== DEFAULT_VALUE;
		console.log(value);
	}
}
