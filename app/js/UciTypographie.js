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
 * @classdesc Cette classe permettra d'implémenter l'onglet typographie
 */
/*global window */
/*global document: false */
/* global alert */
UciTypographie = {
    /*
    * @property
    * @private
     */
    attr_typography: "",
    /*
     * @constructor
     */
    InitUciTypographie: function () {
        attr_typography = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_typographie' style='display: block'>";

/************************************gestion de la partie gauche********************************************************/
        attr_typography += "<div id='uci_typo_div_left' class='cdu_c'>";
        /*gestion de la taille de police*/
        attr_typography += "<div class='uci_aria_button_group cdu_c'>";
        attr_typography += "<span class='cdu_left uci_label'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_fontsize');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_bigger' role='radiogroup'>";
        attr_typography += "<li id='uci_a11yBigger_keepit' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_normal')+"\">";
        attr_typography += "<span>";
        attr_typography += "A";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_normal');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yBigger_150' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_medium')+"\">";
        attr_typography += "<span>";
        attr_typography += "A";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_medium');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yBigger_200' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_large')+"\">";
        attr_typography += "<span>";
        attr_typography += "A";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_large');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        //gestion de l'espacement entre les mots            
        attr_typography += "<div id='uci_typo_espacement_mot' class='uci_aria_button_group cdu_c uci_clear'>";
        attr_typography += "<span id='uci_espacement_word_aria_label' class='cdu_left uci_label'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_wordspacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_wordspacing' role='radiogroup' aria-labelledby='uci_espacement_word_aria_label'>";
        attr_typography += "<li id='uci_a11ySpacement_keepit' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_normal')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11ySpacement_0.5' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_medium')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');     
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11ySpacement_1' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_large')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
/******************************************************Fin partie de gauche**************************************************/
        attr_typography += "</div>";
/************************************gestion de la partie centrale********************************************************/
        attr_typography += "<div id='uci_typo_div_centre' class='cdu_c'>";

        // Gestion de la police à utiliser pour les dysléxique
        attr_typography += "<div id='uci_typo_dyslexy_font' class='uci_aria_button_group cdu_c'>";
        attr_typography += "<span id='uci_title_typographie' class='cdu_left uci_label'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_fontfamily');
        attr_typography += "</span>";
        attr_typography += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_fontfamily'>";
        attr_typography += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_typography += "<span class='uci_span_help_bulle cdu_n' id='uci_typo_help_fontfamily'><p>";
        attr_typography += accessibilitytoolbar.get('uci_typo_help_fontfamily');
        attr_typography += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        
        
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_fontfamily' role='radiogroup' aria-labelledby='uci_title_typographie'>";
        attr_typography += "<li id='uci_a11yDyslexyFont_keepit' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "keepit" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_normal')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";        
        attr_typography += "<li id='uci_a11yDyslexyFont_arial' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "arial" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_arial')+"\">";
        attr_typography += "Arial";
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yDyslexyFont_opendyslexic' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "opendyslexic" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_opendys')+"\">";
        attr_typography += "Open Dyslexic";
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        
        
        
        /*
        attr_typography += "<div id='uci_typo_dyslexy_font' class='uci_aria_button_group cdu_c'>";
        attr_typography += "<div id='box-a11yDyslexyFontEnabled_off'>" ;
        
        if(accessibilitytoolbar.getCompatible('a11yDyslexyFontEnabled')) {
            attr_typography += "<input type='checkbox' value='on' name='a11yDyslexyFontEnabled' id='uci_chekbox_dyslexy_font' "+(accessibilitytoolbar.userPref.get("a11yDyslexyFontEnabled") === "on" ? " checked='checked'" : "")+" />";
            attr_typography += "<label for='uci_chekbox_dyslexy_font' id='uci_title_typographie'>";
        } else {
            attr_typography += "<input type='checkbox' value='on' name='a11yDyslexyFontEnabled' id='uci_chekbox_dyslexy_font' disabled />";
            attr_typography += "<label for='uci_chekbox_dyslexy_font' id='uci_title_typographie' class='uci_disable_label'>";
        }                
        attr_typography +=  accessibilitytoolbar.get('uci_typo_titre_fontfamily');
        attr_typography += "</label>";
        attr_typography += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_fontfamily'>";
        attr_typography += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_typography += "<span class='uci_span_help_bulle cdu_n' id='uci_typo_help_fontfamily'><p>";
        attr_typography += accessibilitytoolbar.get('uci_typo_help_fontfamily');
        attr_typography += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_typography += "</div>";
        
        // only if compatible
        if(accessibilitytoolbar.getCompatible('a11yDyslexyFontEnabled')) {
            if (accessibilitytoolbar.userPref.get("a11yDyslexyFontEnabled") === "on"){
                attr_typography += "<div id='uci_fieldset_fontfamily' style='display:block'>";
            }else {
                attr_typography += "<div id='uci_fieldset_fontfamily' style='display:none'>";
            }
    
            attr_typography += "<span class='cdu_n'>";
            attr_typography += accessibilitytoolbar.get('uci_typo_titre_fontfamily');
            attr_typography += "</span>";
            
            attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_fontfamily' role='radiogroup' aria-labelledby='uci_title_typographie'>";
            attr_typography += "<li id='uci_a11yDyslexyFont_arial' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "arial" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_arial')+"\">";
            attr_typography += "Arial";
            attr_typography += "</li>";
            attr_typography += "<li id='uci_a11yDyslexyFont_opendyslexic' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "opendyslexic" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_opendys')+"\">";
            attr_typography += "Open Dyslexic";
            attr_typography += "</li>";
            attr_typography += "</ul>";
            attr_typography += "</div>"; //uci_fieldset_fontfamily
        }
        attr_typography += "</div>";
        */
        // gestion espacement entre les lignes
        attr_typography += "<div id='uci_typo_spacement_line' class='uci_aria_button_group cdu_c uci_clear'>";        
        attr_typography += "<span id='uci_typo_spacement_line_aria_label' class='cdu_left uci_label'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_linespacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_linespacement' role='radiogroup' aria-labelledby='uci_typo_spacement_line_aria_label'>";
        attr_typography += "<li id='uci_a11yLineSpacement_keepit' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_normal')+"\">";       
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yLineSpacement_2' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_medium')+"\">";         
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yLineSpacement_3' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_large')+"\">";    
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
/************************************Fin de la partie centrale*************************************************************/
        attr_typography += "</div>";
/***************************************Debut de la partie droite*************************************************************/
        attr_typography += "<div id='uci_typo_div_right' class='cdu_c'>";


        
        // Gestion de la casse du texte
        attr_typography += "<div id='uci_typo_modif_casse' class='uci_aria_button_group cdu_c'>";
        attr_typography += "<span id='uci_fieldset_changecasse' class='cdu_left uci_label'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_changecase');
        attr_typography += "</span>";
        attr_typography += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_changecase'>";
        attr_typography += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_typography += "<span class='uci_span_help_bulle cdu_n' id='uci_typo_help_changecase'><p>";
        attr_typography += accessibilitytoolbar.get('uci_typo_help_changecase');
        attr_typography += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        
        
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_changecasse' role='radiogroup' aria-labelledby='uci_fieldset_changecasse'>";
        attr_typography += "<li id='uci_a11yModifCasse_keepit' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "keepit" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_changecase_normal')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";        
        
        attr_typography += "<li id='uci_a11yModifCasse_capitalize' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "capitalize" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography +=  accessibilitytoolbar.get('uci_changecase_firstlettre');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yModifCasse_lowercase' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "lowercase" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography += accessibilitytoolbar.get('uci_changecase_tolower');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        
        /*
        attr_typography += "<div id='uci_typo_modif_casse' class='uci_aria_button_group cdu_c'>";
        attr_typography += "<div id='box-a11yModifCasseEnabled_off'>";
        attr_typography += "<input type='checkbox' name='a11yModifCasseEnabled' id='uci_chekbox_casse'"+(accessibilitytoolbar.userPref.get("a11yModifCasseEnabled") === "on" ? " checked='checked'" : "")+" />";
        attr_typography += "<label for='uci_chekbox_casse'>";
        attr_typography += "<span>";
        attr_typography +=  accessibilitytoolbar.get('uci_typo_titre_changecase');
        attr_typography += "</span>";
        attr_typography += "</label>";
        attr_typography += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_changecase'>";
        attr_typography += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_typography += "<span class='uci_span_help_bulle cdu_n' id='uci_typo_help_changecase'><p>";
        attr_typography += accessibilitytoolbar.get('uci_typo_help_changecase');
        attr_typography += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_typography += "</div>";
        if (accessibilitytoolbar.userPref.get("a11yModifCasseEnabled") === "on"){
            attr_typography += "<div id='uci_fieldset_changecasse' style='display:block'>";
        }else {
            attr_typography += "<div id='uci_fieldset_changecasse' style='display:none'>";
        }
        attr_typography += "<span class='cdu_n'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_changecase');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_changecasse' role='radiogroup' aria-labelledby='uci_fieldset_changecasse'>";
        attr_typography += "<li id='uci_a11yModifCasse_capitalize' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "capitalize" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography +=  accessibilitytoolbar.get('uci_changecase_firstlettre');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yModifCasse_uppercase' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "uppercase" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography += accessibilitytoolbar.get('uci_changecase_toupper');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yModifCasse_lowercase' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "lowercase" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography += accessibilitytoolbar.get('uci_changecase_tolower');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";        
        attr_typography += "</div>";
        */
        // gestion de l'espacement entre les caractère
        attr_typography += "<div class='uci_aria_button_group cdu_c uci_clear'>";
        attr_typography += "<span id='uci_typo_font_caractere' class='cdu_left uci_label'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_charspacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_charspacing' role='radiogroup' aria-labelledby='uci_typo_font_caractere'>";
        attr_typography += "<li id='uci_a11yCharSpacement_keepit' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "keepit" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_normal')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yCharSpacement_0.2' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "0.2" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_medium')+"\">";  
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');     
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yCharSpacement_0.5' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "0.5" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_large')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        
/***************************************Fin de la partie droite*************************************************************/
        attr_typography += "</div>";
/***************************************Fin de la partie Typographie********************************************************/
        attr_typography += "</div>";
        return attr_typography;
    },

    displayFieldset: function (id) {
        if (document.getElementById(id).style.display === "none") {
            document.getElementById(id).style.display = "block";
        } else {
            document.getElementById(id).style.display = "none";
        }
    }
    
    


}