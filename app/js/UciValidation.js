/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

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
function UciValidation() {
    "use strict";
    /**
     * @property
     * @private
     */
    var attr_validation;
    attr_validation = "";
    /*
     * @constructor init
     */
    UciValidation.prototype.InitUciValidation = function () {
        attr_validation += "<div class='uci_squaredOne'>";
        attr_validation += "<input type='checkbox' value='off' name='a11yApercuAuto' id='a11yApercuAuto' "+(accessibilitytoolbar.userPref.get("a11yApercuAuto") === "off" ? " checked=\"checked\"" : "")+"/>";
        attr_validation += "<label for='a11yApercuAuto'>";
        attr_validation += "<span class='uci_ui'></span>";
        attr_validation += accessibilitytoolbar.get('uci_checkbox_disable_apercuauto');
        attr_validation += "</label>";
        attr_validation += "</div>";
        attr_validation += "<div id='uci_validation_button'>";
        attr_validation += "<input type='submit' class='uci_button_valider' id='uci_valider' value=\""+accessibilitytoolbar.get('uci_button_valid')+"\" />";
        attr_validation += "<input type='reset' class='uci_button_reset' id='uci_annuler' value=\""+accessibilitytoolbar.get('uci_button_cancel')+"\" />";
        attr_validation += "</div>";
        return attr_validation;
    };

    UciValidation.Validation = function (/*event*/e) {
        var event = e || window.event;
        if (event && event.stopPropagation) {
            event.stopPropagation();
            event.preventDefault();
        } else if (window.event) {
            window.event.cancelBubble = true;
            window.eventReturnValue = false;
        }
        //document.getElementById('uci_moreconfortleft').focus();
        if(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on") {
            document.getElementById("uci_active_cdu_img").focus();
        }
        else {
            document.getElementById("uci_inactive_cdu_img").focus();
        }
        accessibilitytoolbar.setCSS();
        accessibilitytoolbar.hasDoneSettings = true;
        accessibilitytoolbar.saveUserPref();
        document.getElementById('uci_validation').className = "cdu_n";
        UciIhm.hide_more_confort('uci_activateOnglet','uci_moreconfort_content');
    };

    UciValidation.Annulation = function () {
        //document.getElementById('uci_moreconfortleft').focus();
        if(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on") {
            document.getElementById("uci_active_cdu_img").focus();
        }
        else {
            document.getElementById("uci_inactive_cdu_img").focus();
        }
        accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.cookieValue);
        accessibilitytoolbar.reloadToolbar();
    };
}