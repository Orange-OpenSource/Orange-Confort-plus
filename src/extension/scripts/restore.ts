// @ts-ignore
let restore = () => {
	const appRootElt = document.createElement('app-root');
	appRootElt.setAttribute('data-state', 'restored');
	document.body.prepend(appRootElt);
}

restore();

"EOF"
