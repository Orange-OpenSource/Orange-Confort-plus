/*
	import { Readability } from "@mozilla/readability";
	let variable_qui_a_un_nom = new Readability(document);
	console.log("ELT", variable_qui_a_un_nom);
*/

let readingModeServiceIsInstanciated: boolean;

class ReadingModeService {
	constructor() {
		if (readingModeServiceIsInstanciated) {
			throw new Error('ReadingModeService is already instantiated.');
		}
		readingModeServiceIsInstanciated = true;
	}

	setReadingMode = (value: string): void => {
		// TODO : Implement the logic to set the reading mode
		console.log(`Setting reading mode to ${value}`);
	}

}
