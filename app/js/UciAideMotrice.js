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
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet aide motrice
 * @property {string}  attr_aide_motrice : the string containt hinner html for aide motrice.
 */
/*global window */
/*global document: false */
/* global alert */
UciAideMotrice = {
    /**
     * @property
     * @private
     */
    attr_aide_motrice: "",
    attr_onglet: "",
    attr_aide_motrice: "",
    /*
     * @constructor
     */
    InitUciAideMotrice: function () {
        attr_aide_motrice = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_aidemotrice'>"; //uci_contenu_onglet_aidemotrice
        attr_aide_motrice += "<div id='setting-bloc-content'>";
        attr_aide_motrice += "<input type='checkbox' value='true' name='a11yJumpToContent' id='a11yJumpToContent'"+(accessibilitytoolbar.userPref.get("a11yJumpToContent") === "true" ? " checked='checked'" : "") + " />";
        attr_aide_motrice += "<label for='a11yJumpToContent'>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_jumptocontent');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_jumptocontent'>";
        attr_aide_motrice += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_aide_motrice += "<span class='uci_span_help_bulle cdu_n' id='uci_help_jumptocontent'><p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_jumptocontent');
        attr_aide_motrice += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_aide_motrice += "</div>"; //setting-bloc-content
/**********************************************Gestion réglage motor*********************************************************/
        attr_aide_motrice += "<div id='uci_div_motor'>";
        attr_aide_motrice += "<input type='checkbox' value='true' name='a11yMotorModeEnabled'  id='a11yMotorModeEnabled' "+(accessibilitytoolbar.userPref.get("a11yMotorModeEnabled") === "true" ? " checked='checked'" : "") + " />";
        attr_aide_motrice += "<label for='a11yMotorModeEnabled'>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_enableMotorMode');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "</div>"; //uci_div_motor
        if (accessibilitytoolbar.userPref.get("a11yMotorModeEnabled") === "true") {
            attr_aide_motrice += "<div id='uci_motor_general' style='display:block'>";
        } else {
            attr_aide_motrice += "<div id='uci_motor_general' style='display:none'>";
        }
/******************************************************Navigation par pointage ******************************************************************/
        attr_aide_motrice += "<div id='uci_motor_div_left'>";
        attr_aide_motrice += "<input type='radio' name='a11yMotorMode' id='a11yMotorMode-remote' value='remote' ";
        attr_aide_motrice += accessibilitytoolbar.userPref.get("a11yMotorMode") === "remote" ? "checked='checked'" : "";
        attr_aide_motrice += "/>";
        attr_aide_motrice += "<label for='a11yMotorMode-remote'>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_label_telecomande');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_telecomande');
        attr_aide_motrice += '</p>';
        
        attr_aide_motrice += "<div id='uci_motor_mode' class='setting-sub-container'>";
        attr_aide_motrice += "<p id='a11yDelayBeforeLoop0'>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_delai_clic');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_DelayBeforeLoop' role='radiogroup' aria-labelledby='a11yDelayBeforeLoop0'>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_1' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "1" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_1sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_3' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "3" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_3sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_6' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "6" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_6sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";
        attr_aide_motrice += "</div>"; //uci_motor_mode
        
        attr_aide_motrice += "</div>"; //uci_motor_div_left
/******************************************************Fin Navigation par pointage ******************************************************************/

/******************************************************Parcours automatique des elements cliquable ******************************************************************/
        attr_aide_motrice += "<div id='uci_motor_div_right'>";
        
        attr_aide_motrice += "<div class='btn-check btn-check-large'>";
        attr_aide_motrice += "<input type='radio' value='looping' id='a11yMotorMode-looping' name='a11yMotorMode'";
        attr_aide_motrice += accessibilitytoolbar.userPref.get("a11yMotorMode") === "looping" ? "checked='checked'" : "";
        attr_aide_motrice += "/>";
        attr_aide_motrice += "<label for='a11yMotorMode-looping'>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_label_automove');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_automove');
        attr_aide_motrice += '</p>';
        attr_aide_motrice += "</div>"; //btn-check btn-check-large

        //gestion de la position du menu
        attr_aide_motrice += "<div>";
        attr_aide_motrice += "<p class='uci_clear' id='a11yMenuPositionning'><br />";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_menupos');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_a11yMenuPositionning' role='radiogroup' aria-labelledby='a11yMenuPositionning'>";
        attr_aide_motrice += "<li id='uci_a11yMenuPositionning_center' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "center" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_centeredmenu');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yMenuPositionning_nextto' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "nextto" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_nearelemtmenu');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";

        //gestion du clic automatique
        attr_aide_motrice += "<p class='uci_clear' id='a11yDelayBeforeClick'><br />";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_time_before_sel');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_DelayBeforeLoop_auto' role='radiogroup' aria-labelledby='a11yDelayBeforeClick'>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_1' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "1" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_1sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick-2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_3' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "3" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_3sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_6' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "6" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_6sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";

        //gestion pas du mode rapide
        attr_aide_motrice += "<p class='uci_clear' id='a11yQuickMode'><br />";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_pasquickmode');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_help_quickmode');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_a11yQuickMode' role='radiogroup' aria-labelledby='a11yQuickMode'>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2par2');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_5' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "5" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_5par5');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_10' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "10" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_10par10');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";
        
        attr_aide_motrice += "</div>";
        attr_aide_motrice += "</div>"; //uci_motor_div_right
/******************************************************Fin parcours automatique des éléments cliquables******************************************************************/
        attr_aide_motrice += "</div>"; //uci_motor_general
        attr_aide_motrice += "</div>"; //uci_contenu_onglet_aidemotrice
        return attr_aide_motrice;
    },

    activate_aide_motrice: function () {
        if (document.getElementById('a11yMotorModeEnabled').checked) {
            document.getElementById('uci_motor_general').style.display = "block";
        } else {
            document.getElementById('uci_motor_general').style.display = "none";
        }
    }

}