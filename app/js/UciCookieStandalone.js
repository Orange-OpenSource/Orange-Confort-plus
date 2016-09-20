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
    var namePref = 'UCI3SA';
    var nameBlacklist = 'UCI3-blSA';
    var defaultValuePref = '0000651000650650650000000000000000006500000000';
    
        /*****************************************************************************************************************/

    this.saveCookie = function(name, value,days) {
    	if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    };
    
    this.readCookies = function() {
        var namePrefEQ = namePref + "=";
        var valuePref = null;
        var nameBlacklistEQ = nameBlacklist + "=";
        var valueBlacklist = null;
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(namePrefEQ) == 0) {
            	valuePref = c.substring(namePrefEQ.length,c.length);
            }
            if (c.indexOf(nameBlacklistEQ) == 0) {
            	valueBlacklist = c.substring(nameBlacklistEQ.length,c.length);
            }
        }
        if(valuePref === null) {
        	valuePref = defaultValuePref;
        	this.saveCookie(namePref, defaultValuePref);
        }
        if(valueBlacklist === null) {
        	valueBlacklist = '0';
        	this.saveCookie(nameBlacklist, '0');
        }
        return {pref: valuePref, blacklist:valueBlacklist};
    };
    
    this.eraseCookie = function() {
    	this.createCookie("",-1);
    };
    
    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateUserPref = function() {
        // Update the cdu cookies with the stackv3 value
        var pref = this.encode();
        //document.getElementById('id_frame_cookie').src=hebergementFullPath+"saveCookie.php?UsageConfort="+pref+"&origin="+document.location.href;
        this.saveCookie(namePref, pref);
        var tempMatrix = this.convertMatrixv3.reverse();
        this.storedValue = ''+pref+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
    };

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateBlackList = function() {
        // Update the cdu cookies with the stackv3 value
        //document.getElementById('id_frame_cookie').src=hebergementFullPath+"saveCookieBlWebSite.php?hostname="+document.location.hostname;
    	var tempMatrix = this.convertMatrixv3.reverse();
        this.storedValue = this.storedValue.substr(0,this.storedValue.length-1)+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
        if(this.stackv3['a11ySiteWebEnabled'] == 'off') {
            this.saveCookie(nameBlacklist, '1');
        }
        else {
        	this.saveCookie(nameBlacklist, '0');
        }
        
    };
    
    this.init = function() {
    	var cookies = this.readCookies();
    	accessibilitytoolbar.storedValue = cookies['pref'] + cookies['blacklist'];
        this.setStoredValue(cookies['pref'] + cookies['blacklist']);
    }
   
    this.init();
}
UciStorage.prototype = new UciUserPref();