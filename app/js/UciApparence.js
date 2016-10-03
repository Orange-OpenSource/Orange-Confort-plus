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
 * @classdesc Cette classe permettra d'implémenter l'onglet apparence
 * @property {string}  attr_apparence : the string containt hinner html for apparence.
 */
/*global window */
/*global document: false */
/* global alert */
UciApparence = {
    /**
     * @property
     * @private
     */
    attr_apparence: "",
    attr_onglet: "",
    attr_apparence: "",
    /*
     * @constructor init
     */

    mesCouleurs: [
        ["#330000","#331900","#333300","#193300","#003300","#003319","#003333","#001933","#000033","#190033","#330033","#330019","#000000"],
        ["#990000","#994C00","#999900","#4C9900","#009900","#00994C","#009999","#004C99","#000099","#4C0099","#990099","#99004C","#404040"],
        ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FF00","#00FF80","#00FFFF","#0080FF","#0000FF","#7F00FF","#FF00FF","#FF007F","#808080"],
        ["#FF6666","#FFB266","#FFFF66","#B2FF66","#66FF66","#66FFB2","#66FFFF","#66B2FF","#6666FF","#B266FF","#FF66FF","#FF66B2","#C0C0C0"],
        ["#FFCCCC","#FFE5CC","#FFFFCC","#E5FFCC","#CCFFCC","#CCFFE5","#CCFFFF","#CCE5FF","#CCCCFF","#E5CCFF","#FFCCFF","#FFCCE5","#FFFFFF"]
    ],

    InitUciApparence: function () {
        attr_apparence = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_apparence'>";
/************************************gestion de la partie gauche********************************************************/
        attr_apparence += "<div id='uci_apparence_div_left'>";

        //Gestion de la mise en page : supprimer la mise en page
        attr_apparence += "<div id='uci_div_supprimer_miseenpage'>";

        attr_apparence += "<input type='checkbox' value='true' name='a11yLinearize'  id='a11yLinearize'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yLinearize") === "true" ? "checked='checked'" : "";
        attr_apparence += "/>";
        attr_apparence += "<label for='a11yLinearize'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_listmode');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_listmode'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_listmode'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_listmode');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //Gestion de la mise en page : alignement a gauche
        attr_apparence += "<div id='uci_div_alignement_gauche'>";
        attr_apparence += "<input type='checkbox' value='left' name='a11yLeftText' id='alignement_gauche'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yLeftText") === "left" ? "checked='checked'" : "";
        attr_apparence += "/>";
        attr_apparence += "<label for='alignement_gauche'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_alignleft');
        attr_apparence += "</label>";
        attr_apparence += "</div>";


        //Gestion de la mise en page : numerotation des ligne
        attr_apparence += "<div id='uci_div_numero_ligne'>";
        attr_apparence += "<input type='checkbox' value='decimal'  name='a11yNumerotationList' id='putNumOnList'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yNumerotationList") === "decimal" ? "checked='checked'" : "";
        attr_apparence += "/>";
        attr_apparence += "<label for='putNumOnList'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_putnumonlist');
        attr_apparence += "</label>";
        attr_apparence += "</div>";

        //gestion de l'apparence des liens
        attr_apparence += "<div id='uci_div_apparence_liens'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11yNavLienEnabled' id='apparence_lien'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yNavLienEnabled") === "true" ? "checked='checked'" : "";
        attr_apparence += "/>";
        attr_apparence += "<label for='apparence_lien'>";
        attr_apparence += accessibilitytoolbar.get('uci_titre_links');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_links'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_links'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_links');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //gestion du lien actif : couleur
        if(accessibilitytoolbar.userPref.get("a11yNavLienEnabled")=== "true"){
            attr_apparence += "<div id='uci_gestion_lien' style='display:block'>";
        }else {
            attr_apparence += "<div id='uci_gestion_lien' style='display:none'>";
        }

        attr_apparence += "<div id='uci_div_lien_selectionne'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_active')+"</span>";
        
        //gestion du lien actif : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienSelStyle' title=\""+accessibilitytoolbar.get("uci_title_link_active_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "keepit" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "underline" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "border" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "bold" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        // end apparence mise en forme
        
        // start link color        
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienSel' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_active_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienSelColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_active_color')+"</span>";
        attr_apparence +="</a>";
        attr_apparence += "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_selectionne' style='display:none'>";
        //couleur de police
        var tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleur_lien_sel' role='radiogroup' aria-labelledby='uci_NavLienSel'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        var moreclass = "";
        var focus_li;
        for (index = 0; index < UciApparence.mesCouleurs.length; ++index) {
            if(UciApparence.mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = UciApparence.mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienSelColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li cdu_c "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienSelColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&#160;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";
        // end color
        
        attr_apparence += "</div>";
        // end link

        //gestion des liens non visite
        //gestion des liens non visite : couleur 
        attr_apparence += "<div id='uci_div_lien_notselectionne'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_notvisited')+"</span>";
        
        
        //gestion des liens non visite : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienNonVisStyle' title=\""+accessibilitytoolbar.get("uci_title_link_notvisited_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "keepit" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "underline" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "border" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "bold" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        // end mise en forme
        // start couleur
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienNonVis' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_notvisited_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_notvisited_color')+"</span>";
        attr_apparence +="</a>";
        attr_apparence+= "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_notselectionne' style='display:none'>";        
        //couleur de police
        tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleur_lien_notsel' role='radiogroup' aria-labelledby='uci_NavLienNonVis'>";
        index = 0;
        indexCouleur = 0;
        currentLine = "";
        moreclass = "";
        for (index = 0; index < UciApparence.mesCouleurs.length; ++index) {
            if(UciApparence.mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = UciApparence.mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienNonVisColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'"  : "' aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&#160;";

                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";
        
        // end link    
        attr_apparence += "</div>";

        //gestion des liens visités
        //gestion des liens visite : couleur
        
        
        attr_apparence += "<div id='uci_div_lien_visite'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_visited')+"</span>";
        
        //gestion des liens visité : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienVisStyle' title=\""+accessibilitytoolbar.get("uci_title_link_visited_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "keepit" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "underline" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "border" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "bold" ? " selected='selected'" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        // fin mise en forme
        // start couleur
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienVis' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_visited_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienVisColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_visited_color')+"</span>";
        attr_apparence +="</a>";


        attr_apparence+= "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_visite' style='display:none'>";
        //couleur de police
        tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleur_lien_visite' role='radiogroup' aria-labelledby='uci_NavLienVis'>";
        index = 0;
        indexCouleur = 0;
        currentLine = "";
        moreclass = "";
        for (index = 0; index < UciApparence.mesCouleurs.length; ++index) {
            if(UciApparence.mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = UciApparence.mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienVisColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienVisColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&#160;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";           
        // fin couleur
        
        
        attr_apparence += '</div>';
        attr_apparence += '</div>';

        
/*********************************************Fin de la partie gauche******************************************************/
        attr_apparence += "</div>"; //uci_apparence_div_left

/**********************************************Gestion de la partie de droite**********************************************/

        attr_apparence += "<div id='uci_apparence_div_right'>";
        //desactiver la transparence
        attr_apparence += "<div id='uci_div_desactiver_transparence'>";
        attr_apparence += "<input type='checkbox' value='1' name='a11ySupEffetTransp' id='uci_desactiver_transparence'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupEffetTransp") === "1" ? "checked='checked'" : "";
        attr_apparence += "/>";
        attr_apparence += "<label for='uci_desactiver_transparence'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disabletransp');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_disabletransp'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_disabletransp'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_disabletransp');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //debut gestion de la désactivation des images de fond
        attr_apparence += "<div id='uci_div_disabled_fond_picture'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11ySupImageFont' id='uci_label_disablebgpictures'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupImageFont") === "true" ? "checked='checked'" : "";
        attr_apparence += "/>";
        attr_apparence += "<label for='uci_label_disablebgpictures'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disablebgpictures');
        attr_apparence += "</label>";
        attr_apparence += "</div>";

        //debut gestion de la désactivation des images de premier plan
        attr_apparence += "<div id='uci_div_disabled_first_plan_picture'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11ySupImageFirstPlan' id='uci_label_disablepppictures' ";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") === "true" ? "checked='checked'" : "";
        attr_apparence += "/>";
        attr_apparence += "<label for='uci_label_disablepppictures'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disablepppictures');
        attr_apparence += "</label >";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_disablepppictures'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_disablepppictures'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_disablepppictures');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //debut gestion du masque
        attr_apparence += "<div id='uci_mask_enabled'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11yMaskEnabled' id='uci_check_mask' ";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yMaskEnabled") === "true" ? "checked='checked'" : "";
        attr_apparence += "/>";
        attr_apparence += "<label for='uci_check_mask'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_mask');
        attr_apparence += "</label >";
        attr_apparence += "<a href='#' class='uci_link_help_bulle' role='presentation' id='uci_link_help_mask'>";
        attr_apparence += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-help\"></span>";
        attr_apparence += "<span class='uci_span_help_bulle cdu_n' id='uci_help_mask'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_mask');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";
        if(accessibilitytoolbar.getCompatible('a11yMaskEnabled')) { 
        	if(accessibilitytoolbar.userPref.get("a11yMaskEnabled") === 'true'){
                attr_apparence += "<div id='uci_div_mask' style='display:block'>";
            }else {
                attr_apparence += "<div id='uci_div_mask' style='display:none'>";
            }
        	
        	attr_apparence += "<div id='uci_mask_epaisseur'>";
            
            attr_apparence += "<span id='uci_title_epaisseur_mask' class='cdu_left'>";
            attr_apparence += accessibilitytoolbar.get('uci_txt_mask_size');
            attr_apparence += "</span>";
            
            attr_apparence += "<ul class='uci_liste_bton' id='uci_reponses_epaisseurmask' role='radiogroup' aria-labelledby='uci_title_epaisseur_mask'>";
            attr_apparence += "<li id='uci_a11yMaskEpaisseur_thin' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thin" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence +=  accessibilitytoolbar.get('uci_title_mask_thin');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "<li id='uci_a11yMaskEpaisseur_medium' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "medium" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence += accessibilitytoolbar.get('uci_title_mask_medium');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "<li id='uci_a11yMaskEpaisseur_thick' role='radio' class='uci_choix uci_inline btn btn-sm btn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thick" ? "active' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence +=  accessibilitytoolbar.get('uci_title_mask_big');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "</ul>";
            
            attr_apparence += "</div>";
        	
        	
        	
        	attr_apparence += "</div>";
        }
/**********************************************Fin de la partie de droite*************************************************/
        attr_apparence += "</div>";
/*************************************************Fin de la partie apparence**********************************************/
        attr_apparence += "</div>";
        return attr_apparence;
    },

    displayLien: function (elementparent,id) {

            if (document.getElementById(elementparent).checked) {
                document.getElementById(id).style.display = "block";
            }else {
                document.getElementById(id).style.display = "none";
            }
    },

    displayLienCouleur: function (id) {
        if (document.getElementById(id).style.display === "none") {
            document.getElementById(id).style.display = "block";
            document.getElementById(id).focus();
        }else {
        	
            UciApparence.hideLienCouleur(id);
        }
    },

    hideLienCouleur: function (id) {
            document.getElementById(id).style.display = "none";
    },

    uciFermetureOverlay: function(_event_, id) {
    	var winObj="";
        if ( window.event )
            winObj = window.event;
        // --- Netscape and other explorers
        else
            winObj = _event_;

        var intKeyCode = winObj.keyCode;
        if (intKeyCode ===13 || intKeyCode ===27){
            document.getElementById(id).style.display = "none";
        }
    }
}