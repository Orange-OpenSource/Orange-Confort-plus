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

        if(accessibilitytoolbar.profileEnabled) {
          // profile name edit mode
          if(document.getElementById("previous_profil_name")) {
              oldName = document.getElementById("previous_profil_name").value;
              profilName = document.getElementById('uci_profile_name').value;
              accessibilitytoolbar.userPref.settings.profiles[profilName]=accessibilitytoolbar.userPref.settings.profiles[oldName];
              delete accessibilitytoolbar.userPref.settings.profiles[oldName]
              // if that was the curent also update his name
              if(accessibilitytoolbar.userPref.settings.current === oldName) {
                  accessibilitytoolbar.userPref.settings.current = profilName;
              }
              profilName = accessibilitytoolbar.userPref.settings.current;
              accessibilitytoolbar.saveUserPref();
          } else {
              // check if there's a profile named
              if(document.getElementById('uci-selectProfile').value === "") {
                  // if value == "" that's a new profile
                  profilName = document.getElementById('uci_profile_name').value;
              } else {
                  profilName = Object.keys(accessibilitytoolbar.userPref.settings.profiles)[document.getElementById('uci-selectProfile').value];
              }
              accessibilitytoolbar.saveUserPref(profilName);
          }
          UciProfile.refreshMenuDisplay();
        } else {
          accessibilitytoolbar.saveUserPref(accessibilitytoolbar.userPref.settings.current);
        }
        document.getElementById('uci_validation').className = "cdu_n";
        UciIhm.hide_more_confort();
        return false;
    },

    Annulation: function () {
        document.getElementById("uci-onoffswitch").focus();
        accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.getCurrentPref());
        // Keep the toolbar open
        accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
        accessibilitytoolbar.reloadToolbar();
        return false;
    }
}