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
var block = false;


function startCDU() {
	var toolbarServer = document.querySelector("script[src*='crossdom/js']");
	var head = document.querySelector("head");
	var body = document.querySelector("body");
	var toolbarDiv = document.querySelector("accessibilitytoolbarGraphic");
	if((toolbarServer == null) && (head != null) && (body != null) && (window.location.href != 'about:blank')) {
		if(toolbarDiv == null) {
			accessibilitytoolbar.start();
		}
	} else {
		block = true;
	}
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	switch(request.message) {
		case 'orangeconfort+closecdu' :
			if(block == false) {
				accessibilitytoolbar.userPref.setStoredValue();
				accessibilitytoolbar.reloadToolbar();
				accessibilitytoolbar.close();
			}
			break;
		case 'orangeconfort+loadcdu' :
			if(block == false) {
				startCDU();
			}
			break;
		case 'orangeconfort+userprefgetresponse' :
			if(block == false) {
				accessibilitytoolbar.userPref.setStoredValue(request.value);
			}
			break;
		case 'orangeconfort+doyouexist' :
			sendResponse({message: "yes"});
			break;
		
	  }
});
chrome.runtime.sendMessage({message: "orangeconfort+getIsCduEnabled"}, function(response) {
	if((response.value == 'true') && (block == false)) {
		startCDU();
	}
});