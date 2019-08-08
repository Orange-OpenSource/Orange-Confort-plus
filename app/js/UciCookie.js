/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014 - 2019  Orange SA

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
 * User pref stackv3 used by the toolbar stored in client cookie.<br />


 *  Can retrieve data from PNS or cookie
 @class Collection of user preference
 */

function UciStorage() {
    "use strict";
    var oNewNode = document.createElement("iframe");
    if(document.location.port) {
      oNewNode.setAttribute("src", hebergementFullPath + 'cookie.html?hostname='+document.location.hostname+'&origin=' + document.location.protocol + '//' + document.location.hostname + ':' + document.location.port + document.location.pathname);
    } else {
      oNewNode.setAttribute("src", hebergementFullPath + 'cookie.html?hostname='+document.location.hostname+'&origin=' + document.location.protocol + '//' + document.location.hostname + document.location.pathname);
    }
    oNewNode.setAttribute("id", 'id_frame_cookie');
    oNewNode.setAttribute("name", 'frame_cookie');
    oNewNode.setAttribute("width", '0');
    oNewNode.setAttribute("height", '0');
    oNewNode.setAttribute("style", 'width:0;height:0;border:0;display:block;');
    oNewNode.setAttribute("aria-hidden", 'true');
    oNewNode.setAttribute("title", accessibilitytoolbar.get('uci_iframe_cookie'));

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateUserPref = function(profilName) {
        // Update the cdu cookies with the stackv3 value
        if(profilName) {
          this.setStoredValue(this.encode(),profilName);
        }
        var UsageConfortpref = this.encodeUsageConfort();
        if(document.location.port) {
          document.getElementById('id_frame_cookie').src=hebergementFullPath+"cookie.html?UsageConfort="+UsageConfortpref+"&origin="+document.location.protocol + "//" + document.location.hostname + ':' + document.location.port + document.location.pathname;
        } else {
          document.getElementById('id_frame_cookie').src=hebergementFullPath+"cookie.html?UsageConfort="+UsageConfortpref+"&origin="+document.location.protocol + "//" + document.location.hostname + document.location.pathname;
        }
        
        
    };

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateBlackList = function() {
        // Update the cdu cookies with the stackv3 value
        document.getElementById('id_frame_cookie').src=hebergementFullPath+"cookie.html?hostname="+document.location.hostname;
    };
    
    /**
     * Receive message from the iframe
     */
    this.receiveMessage = function (event) {
        // Do we trust the sender of this message?
        if ( event.origin.replace('https:', '') !== hebergementDomaine.replace('https:', '') && event.origin.replace('http:', '') !== hebergementDomaine.replace('http:', '') || typeof event.data === 'object')
            return;
        
        // back from cookie Save
        if (event.data == "saveDone") {
            if(accessibilitytoolbar.needToReload)
            {
                accessibilitytoolbar.reloadToolbar();
            }
        }
        //cookieData
        else
        {   
            // new version with profiles
            accessibilitytoolbar.userPref.decodeUsageConfort(event.data);
        }
    };
    
        /*****************************************************************************************************************/

    if (window.addEventListener) {
        window.addEventListener("message", this.receiveMessage, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onmessage", this.receiveMessage);
    }
    
    document.getElementsByTagName('body')[0].appendChild(oNewNode);
}
UciStorage.prototype = new UciUserPref();