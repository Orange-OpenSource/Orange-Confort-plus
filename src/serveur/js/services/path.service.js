class pathService {
	path = '';

	constructor() {
		this.path = window.location.origin + '/';
	}

	get path() {
		return this.path;
	}
}

