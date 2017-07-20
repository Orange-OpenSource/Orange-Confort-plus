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
/**
 * @class uci_validation
 * @classdesc Cette classe permettra d'implémenter la validation
 * @property {string}  attr_aide_motrice : the string containt hinner html for aide motrice.
 */
/*global window */
/*global document: false */
/* global alert */
UciValidation = {
    

    Validation: function (/*event*/e) {
        var event = e || window.event;
        var profilName = "";
        if (event && event.stopPropagation) {
            event.stopPropagation();
            event.preventDefault();
        } else if (window.event) {
            window.event.cancelBubble = true;
            window.eventReturnValue = false;
        }
        document.getElementById("uci-onoffswitch").focus();
        
        accessibilitytoolbar.setCSS();
        accessibilitytoolbar.hasDoneSettings = true;
        // check if there's a profile named
        if(document.getElementById('uci-selectProfile').value === "") {
            // if value == "" that's a new profile
            profilName = document.getElementById('profile_name').value
        } else {
            profilName = Object.keys(accessibilitytoolbar.userPref.settings.profiles)[document.getElementById('uci-selectProfile').value];
        }
        
        accessibilitytoolbar.saveUserPref(profilName);
        document.getElementById('uci_validation').className = "cdu_n";
        // update profile list
        document.getElementById("uci_cdu_profile").replaceChild(UciProfile.InitUciProfile(),document.getElementById("uci_cdu_profile").firstChild);
        // add event to profile menu
        UciProfile.create_menu_events();
        UciIhm.hide_more_confort();
        return false;
    },

    Annulation: function () {
        document.getElementById("uci-onoffswitch").focus();
        accessibilitytoolbar.userPref.decode();
        // Keep the toolbar open
        accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
        accessibilitytoolbar.reloadToolbar();
        return false;
    }
}