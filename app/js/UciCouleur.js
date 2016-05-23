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
 * @class uci_couleur
 * @classdesc Cette classe permettra d'implémenter l'onglet couleur
 * @property {string}  attr_couleur : the string containt hinner html for couleur.
 */
/*global window */
/*global document: false */
/* global alert */
function UciCouleur() {

    "use strict";
    /*
     * @property
     * @private
     */
    var attr_onglet, attr_couleur;
    attr_couleur = "";

    var mesCouleurs=[
        ["#330000","#331900","#333300","#193300","#003300","#003319","#003333","#001933","#000033","#190033","#330033","#330019","#000000"],
        ["#990000","#994C00","#999900","#4C9900","#009900","#00994C","#009999","#004C99","#000099","#4C0099","#990099","#99004C","#404040"],
        ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FF00","#00FF80","#00FFFF","#0080FF","#0000FF","#7F00FF","#FF00FF","#FF007F","#808080"],
        ["#FF6666","#FFB266","#FFFF66","#B2FF66","#66FF66","#66FFB2","#66FFFF","#66B2FF","#6666FF","#B266FF","#FF66FF","#FF66B2","#C0C0C0"],
        ["#FFCCCC","#FFE5CC","#FFFFCC","#E5FFCC","#CCFFCC","#CCFFE5","#CCFFFF","#CCE5FF","#CCCCFF","#E5CCFF","#FFCCFF","#FFCCE5","#FFFFFF"]
    ];
    /*
     * @constructor
     */
    UciCouleur.prototype.InitUciCouleur = function () {
        attr_couleur = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_couleur'>";
/*****************************************Creation de la partie gauche des couleurs*****************************************
 * Gestion de la partie des couleurs prédéfinies
*****************************************************************************************************************************/
        //couleur predefinie
        attr_couleur += "<div id='uci_div_couleur_predefinie'>";
        attr_couleur += "<input type='radio' name='a11yVisualSettings' value='predefined' id='uci_couleur_predefenie_input' "+(accessibilitytoolbar.userPref.get("a11yVisualSettings") === "predefined" ? " checked='checked'" : '')+"><label for='uci_couleur_predefenie_input'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_titre');
        attr_couleur += "</label>";
       
        attr_couleur += "<ul class='uci_liste_bton' id='uci_reponses_couleurpredefinie' role='radiogroup' aria-labelledby='uci_couleur_predefenie_input'>";
        attr_couleur += "<!--[if IE 8 ]>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_keepit' role='radio' class=' uci_choix ie8_uci_inline  "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_default');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_blackonwhite' role='radio' class=' uci_choix ie8_uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_blackandwhite');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_whiteonblack' role='radio' class=' uci_choix ie8_uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "whiteonblack" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_whiteandblack');
        attr_couleur += "</li>";
        attr_couleur += "<![endif]-->";
        attr_couleur += "<!--[if (!IE 8) | (!IE)]><!-->";        
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_keepit' role='radio' class='uci_choix uci_inline  "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_default');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_blackonwhite' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_blackandwhite');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_whiteonblack' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "whiteonblack" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_whiteandblack');
        attr_couleur += "</li>";
        attr_couleur += "<!--<![endif]-->";
        attr_couleur += "</ul>";
        //gestion des message d'erreur de contraste et de luminosite
        attr_couleur += "<div id='uci_message_constraste' style='display:none;' class='message_couleur'>";
        attr_couleur += "<p style='color: black !important; background-color: #FFFFFF !important;'>";
        attr_couleur += accessibilitytoolbar.get("uci_color_warning_title");
        attr_couleur += "</p>";
        attr_couleur += "<span style='color: black !important; background-color: #FFFFFF !important;' id='uci_message_contraste_lbl'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_warning_content');
        attr_couleur += "</span>";
        attr_couleur += "</div>";

        /*gestion message luminosite
        attr_couleur += "<div id='uci_message_luminosite' class='message_couleur' style='display:none'>";
        attr_couleur += "<h4>";
        attr_couleur += accessibilitytoolbar.get("uci_color_warning_title");
        attr_couleur += "</h4>";
        attr_couleur += "<label id='uci_message_luminosite_lbl'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_warning_title');
        attr_couleur += "</label>";
        attr_couleur += "</div>";*/
        attr_couleur += "</div>";



        /*****************************************Creation de la partie gauche des couleurs*****************************************
 * Gestion de la partie des couleurs personnalisées
 *****************************************************************************************************************************/
        attr_couleur += "<div id='uci_div_right_couleur'>";
        attr_couleur += "<div><input type='radio' name='a11yVisualSettings' value='personnal' id='uci_couleur_personnalisees_input' "+(accessibilitytoolbar.userPref.get("a11yVisualSettings") === "personnal" ? " checked='checked'" : "")+"><label for='uci_couleur_personnalisees_input'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_titre_use_personal');
        attr_couleur += "</label></div>";
        attr_couleur += "<div id='uci_couleur_police' class='cdu_c'>";
        attr_couleur += "<span id='aria_label_texte' >"+accessibilitytoolbar.get('uci_color_txt_texte')+"</span>";
        //couleur de police                
        var tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleurpolice' role='radiogroup' aria-labelledby='aria_label_texte'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        var moreclass = "";
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yFontColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yFontColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';        
        attr_couleur += tableauCouleurPolice;
        attr_couleur += "</div>";
        
        //Couleur de fond
        attr_couleur += "<div id='uci_couleur_fond' class='cdu_c'>";
        attr_couleur += "<span id='uci_aria_label_fond' class='uci_couleur_clear'>"+accessibilitytoolbar.get('uci_color_txt_background')+"</span>";
        var tableauCouleurFond = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleurbackground' role='radiogroup' aria-labelledby='uci_aria_label_fond'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurFond += "<li id='uci_a11yBackgroundColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yBackgroundColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";                    
                    tableauCouleurFond += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurFond += '</ul>';
        
        attr_couleur += tableauCouleurFond;
        attr_couleur += "</div>";
        attr_couleur += "</div>";
        attr_couleur += "</div>";
        return attr_couleur;
    };
}