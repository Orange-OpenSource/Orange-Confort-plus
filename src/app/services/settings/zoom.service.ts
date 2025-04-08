let zoomServiceIsInstantiated: boolean;

class ZoomService {

	constructor() {
		if (zoomServiceIsInstantiated) {
			throw new Error('ZoomService is already instantiated.');
		}
		zoomServiceIsInstantiated = true;
	}

	setZoom= (value: string): void => {
		const nbValue = Number(value);
		const zoomValue = value === DEFAULT_VALUE ? null : (nbValue / 100).toString();

		// Compute the inverse of the zoom value to apply it to the C+ app-root element
		const noZoomValue = value === DEFAULT_VALUE ? null : (100 / nbValue).toString();

		const zoomStyle = `
		body {
			zoom: ${zoomValue};
		}
		cplus-app-root, body > [id^=${PREFIX}]{
			zoom: ${noZoomValue} !important;
		}
		`;

		stylesServiceInstance.setStyle('zoom', zoomStyle);

		const layoutState = (nbValue >= 300) ? 'active' : DEFAULT_VALUE;
		deleteLayoutServiceInstance.setDeleteLayout(layoutState);

	}

}
