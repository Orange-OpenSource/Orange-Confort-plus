/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs

    Copyright (C) 2014 - 2023  Orange SA

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
 **/
/**
 * User pref stackv3 used by the toolbar stored in extension (simple-storage API).<br />


 *  Can retrieve data from PNS or cookie
 @class Collection of user preference
 */

function UciStorage() {
	"use strict";

	/**
	 * Update browser cookies in order to save each of user preference value.
	 */
	this.updateUserPref = function (profilName) {
		// Update the cdu cookies with the stackv3 value
		if (profilName) {
			this.setStoredValue(this.encode(), profilName);
		}
		var UsageConfortpref = this.encodeUsageConfort();
		this.postMessage("orangeconfort+userprefsave", UsageConfortpref);
		if (accessibilitytoolbar.needToReload) {
			accessibilitytoolbar.reloadToolbar();
		}
	};

	this.postMessage = function (message, value) {
		if (typeof chrome !== 'undefined') {
			// WebExtension
			if (value) {
				chrome.runtime.sendMessage({message: message, value: value});
			} else {
				chrome.runtime.sendMessage({message: message});
			}
		}
	};

	/**
	 * Update browser cookies in order to save each of user preference value.
	 */
	this.updateBlackList = function () {
		// Update the cdu cookies with the stackv3 value
		this.setStoredValue(this.encode());
		this.postMessage("orangeconfort+blacklistsave", document.location.hostname);
	};

	this.postMessage("orangeconfort+userprefget", null);
}

UciStorage.prototype = new UciUserPref();
