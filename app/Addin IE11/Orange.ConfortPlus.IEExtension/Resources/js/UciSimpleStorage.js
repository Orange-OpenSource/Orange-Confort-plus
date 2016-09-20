/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014 - 2016  Orange SA

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
    
        /*****************************************************************************************************************/

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateUserPref = function() {
        // Update the cdu cookies with the stackv3 value
        var pref = this.encode();
        var tempMatrix = this.convertMatrixv3.reverse();
        this.storedValue = ''+pref+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
        this.postMessage("orangeconfort+userprefsave", pref, document.location.href);
        if(accessibilitytoolbar.needToReload)
        {
            accessibilitytoolbar.reloadToolbar();
        }
    };
    
    this.postMessage = function(message, value, targetOrigin) {
    	if(typeof chrome === 'undefined') {
        	// extension firefox
			if(value) {
				message = message + "_" + value;
			}
        	window.postMessage(message, targetOrigin);
        }
        else {
        	// extension chrome
			if(value) {
				chrome.runtime.sendMessage({message: message, value:value});
			} 
			else {
				chrome.runtime.sendMessage({message: message});
			}
        }
    };

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateBlackList = function() {
        // Update the cdu cookies with the stackv3 value
        var tempMatrix = this.convertMatrixv3.reverse();
        this.storedValue = this.storedValue.substr(0,this.storedValue.length-1)+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
        this.postMessage("orangeconfort+blacklistsave", document.location.hostname, document.location.href);
    };

    this.postMessage("orangeconfort+userprefget", null, document.location.href);
}

UciStorage.prototype = new UciUserPref();
