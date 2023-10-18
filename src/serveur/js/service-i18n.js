class i18nService {
	locale = 'en';
	path = '';

	constructor(path) {
		this.path = path;

		if(['en', 'fr'].some(language => navigator.language.startsWith(language))) {
			this.locale = navigator.language.slice(0,2);
		}
	}

	get locale() {
		return this.locale;
	}

	// @fixme fetch() is shitty since it's Promise-based
	// @todo Need to append locales as a massive json file in Server build…
	async getMessage(message) {
	 try {
		 const response = await fetch(`${this.path}_locales/${this.locale}/messages.json`);
		 const data = await response.json();

		 return data[message]?.message;
	 } catch (error) {
		 throw new Error(`Couldn’t find ${message} in ${this.locale}`);
	 }
	}
}
