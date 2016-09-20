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
 * User pref stackv3 used by the toolbar stored in client cookie.<br />


 *  Can retrieve data from PNS or cookie
 @class Collection of user preference
 */

function UciStorage() {
    "use strict";
    var oNewNode = document.createElement("iframe");
                    oNewNode.setAttribute("src", hebergementFullPath + 'cookie.php?hostname='+document.location.hostname+'&origin=' + document.location.href);
                    oNewNode.setAttribute("id", 'id_frame_cookie');
                    oNewNode.setAttribute("name", 'frame_cookie');
                    oNewNode.setAttribute("width", '0');
                    oNewNode.setAttribute("height", '0');
                    oNewNode.setAttribute("style", 'width:0;height:0;border:0;display:block;');
                    oNewNode.setAttribute("aria-hidden", 'true');
                    oNewNode.setAttribute("title", accessibilitytoolbar.get('uci_iframe_cookie'));
                    
    
        /*****************************************************************************************************************/

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateUserPref = function() {
        // Update the cdu cookies with the stackv3 value
        var pref = this.encode();
        document.getElementById('id_frame_cookie').src=hebergementFullPath+"saveCookie.php?UsageConfort="+pref+"&origin="+document.location.href;
        var tempMatrix = this.convertMatrixv3.reverse();
        this.storedValue = ''+pref+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
    };

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateBlackList = function() {
        // Update the cdu cookies with the stackv3 value
        document.getElementById('id_frame_cookie').src=hebergementFullPath+"saveCookieBlWebSite.php?hostname="+document.location.hostname;
        var tempMatrix = this.convertMatrixv3.reverse();
        this.storedValue = this.storedValue.substr(0,this.storedValue.length-1)+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
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
            if (event.data == "NOCOOKIE") {
                // Put the information message into cdu_intro area
                accessibilitytoolbar.secCookie = true;
                // default value
                accessibilitytoolbar.storedValue = false;
                accessibilitytoolbar.userPref.setStoredValue(false);
            }
            else {
                accessibilitytoolbar.storedValue = event.data;
                accessibilitytoolbar.userPref.setStoredValue( event.data);
            }
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