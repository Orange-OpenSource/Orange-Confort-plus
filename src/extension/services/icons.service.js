class iconsService {
	constructor() {}

	get path() {
		return '';
	}

	loadSprite(root) {
		fetch(chrome.runtime.getURL('assets/icons/orange-icons-sprite.svg'))
			.then(response => response.text())
			.then(svg => {
				const wrapper = document.createElement('div');
				wrapper.innerHTML = svg;
				wrapper.hidden = true;
				root.insertBefore(wrapper, root.firstChild);
			});
	}
}

