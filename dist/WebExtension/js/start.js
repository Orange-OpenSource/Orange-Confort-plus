/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs

    Copyright (C) 2014 - 2017  Orange SA

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
 **/
function startCDU() {
	let toolbarServer = document.querySelector("script[src*='crossdom/js']");
	let head = document.querySelector("head");
	let body = document.querySelector("body");
	let toolbarDiv = document.querySelector("accessibilitytoolbarGraphic");
	let toolbarOnOff = document.getElementById("uci-onoffswitch");
	if ((toolbarServer === null) && (head !== null) && (body !== null) && (window.location.href !== 'about:blank')) {
		if (toolbarDiv === null && !toolbarOnOff) {
			accessibilitytoolbar.strings.setForceDefaultLocale(chrome.i18n.getUILanguage().toUpperCase());
			accessibilitytoolbar.start();
		}
	}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.message) {
		case 'orangeconfort+closecdu':
			if (!document.getElementById("uci-onoffswitch")) {
				if (accessibilitytoolbar.userPref) {
					accessibilitytoolbar.userPref.setStoredValue();
				}
				accessibilitytoolbar.reloadToolbar();
				accessibilitytoolbar.close();
			}
			break;
		case 'orangeconfort+loadcdu':
			if (!document.getElementById("uci-onoffswitch")) {
				startCDU();
			}
			break;
		case 'orangeconfort+userprefgetresponse':
			if (!document.getElementById("uci-onoffswitch") && accessibilitytoolbar.userPref) {
				accessibilitytoolbar.userPref.decodeUsageConfort(request.value);
			}
			break;
		case 'orangeconfort+doyouexist':
			sendResponse({message: "yes"});
			break;
		default:
			break;
	}
});

chrome.runtime.sendMessage({message: "orangeconfort+getIsCduEnabled"}).then(response => {
	if (response && (response.value === true) && (!document.getElementById("uci-onoffswitch"))) {
		startCDU();
	}
});

"starts.js EOF"
