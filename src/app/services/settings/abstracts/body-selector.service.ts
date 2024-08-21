abstract class BodySelectorService {
	getBodyElements(): NodeListOf<Element> {
		return document.body.querySelectorAll(':not(script):not(app-root)');
	}
}
