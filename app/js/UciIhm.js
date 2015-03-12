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
 * @class IHM
 * @classdesc Cette classe permettra de gérer les appels des onglets de la toolbar
 */
/*global window */
/*global document: false */
/* global alert */
function UciIhm() {
    "use strict";
    /*
     *@private
     *@proporty
     * variable permettant de regrouper l’ensemble du code html de l’ihm générale.
     */
    var attr_ihm;
    var anc_onglet = "typographie";

    /*
     * @public
     * @constructor
     * 	constructor uci_ihm() : Constructeur de la class uciIhm
     *
     */
    UciIhm.prototype.InitUciIHM = function () {
        attr_ihm = "<div class='cdu_c'>";
        attr_ihm += "<div id='uci_toolbar-quick' class='cdu_left'>";
        /****************************Integration dans la toolbar du menu de gauche********************************************
         * Mise en place du lien "masquer la barre", qui permettra de masquer la barre du confort d'utilisateur
         * Mise en place du logo " + de confort" pour donner identité graphique à la barre de confort
         * *********************************************************************************************************************/

        attr_ihm += "<div class='uci_logo_plus_de_confort cdu_c'>";
        attr_ihm += "<h1 class='uci_alt_logo'>";
        attr_ihm += accessibilitytoolbar.get('uci_serv_name')+'<span class="uci-plus-orange">+</span>';
        attr_ihm += "</h1>";
        if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') === "on") {
            attr_ihm += "<span id='uci_span_disabled' style='display:none'>";
        } else {
            attr_ihm += "<span id='uci_span_disabled' style='display:block'>";
        }
        attr_ihm += accessibilitytoolbar.get('uci_service_disabled');
        attr_ihm += "</span>";
        attr_ihm += "</div>";
        attr_ihm += "<div class='uci_right'>";
        if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') === "on") {
            attr_ihm += "<div id='uci_left_toolbar' class='cdu_c' style='display:block'>";
        } else {
            attr_ihm += "<div id='uci_left_toolbar' class='cdu_c' style='display:none'>";
        }
        /***************************************Fin menu de gauche*************************************************************/

        /**********************************************Menu central de la toolbar**********************************************
         * Mise en place des choix rapides concernant les tailles de police : 3 choix possibles
         * Mise en place des choix rapides concernant les contraste de couleur de police et d'arriere plan : 2 choix possibles
         * Mise en place du lien " + plus de confort" pour permettre l'ouverture complète aux options du CDU
         ***********************************************************************************************************************/
        /*
         * gestion de la police
         */
        attr_ihm += "<ul class='uci_liste_bton cdu_c' id='uci_reponses_bigger_quick_set' role='radiogroup' aria-labelledby='uci_typo_size'>";
        attr_ihm += "<li id='uci_quick_a11yBigger_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_normal')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "a";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_normal');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yBigger_150' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_medium')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "a";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_medium');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yBigger_200' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_large')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "a";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_large');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "</ul>";
        /**
         * Gestion des couleurs
         */
        attr_ihm += "<ul class='uci_liste_bton cdu_c' id='uci_reponses_couleurpredefinie_quick_set' role='radiogroup' aria-labelledby='question'>";
        attr_ihm += "<li id='uci_quick_a11yVisualPredefinedSettings_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_color_default')+"\">";
        attr_ihm += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_color_default')+"</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yVisualPredefinedSettings_blackonwhite' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_color_blackandwhite')+"\">";
        attr_ihm += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_color_blackandwhite')+"</span>";
        attr_ihm += "</li>";
        attr_ihm += "</ul>";
        attr_ihm += "</div>";
        /***************************************** Fin bloc uci_left_toolbar de la toolbar *****************************************/
        if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') === "on") {
            attr_ihm += "<div id='uci_middle_toolbar' class='cdu_c' style='display:block'>";
        } else {
            attr_ihm += "<div id='uci_middle_toolbar' class='cdu_c' style='display:none'>";
        }

        //  gestion du lien "+ de confort"          
        attr_ihm += "<a class='uci_lien_plus_reglage cdu_c' href=\"#\" id='uci_moreconfort' onclick=\"UciIhm.more_confort('uci_activateOnglet','uci_moreconfort_content');return false;\">";
        attr_ihm += "<span id='uci_moreconfort_content'>"+accessibilitytoolbar.get('uci_txt_more_settings')+"</span>";
        attr_ihm += "</a>";
        attr_ihm += "</div>";


        attr_ihm += "<div id='uci_right_toolbar' class='cdu_c'>";
        /************************************************Menu de droite de la toolbar*******************************************
         * Mise en place du bouton poussoir sous forme d'image pour activer ou desactiver cdu sur le site
         * Mise en place du menu facebook tout a droite, permettant d'un menu comprenant :
         * le choix de langues
         * la consultation de l'aide générale
         * la reinitialisation de tout mes réglages
         * le masquage de la barre "+ de confort"
         **********************************************************************************************************************/
        attr_ihm += "<a class='cdu_c' href='javascript:UciIhm.desactiveCDUForWebSite();' id='uci_active_cdu_img' style='display:"+(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?'block':'none')+"' title=\""+accessibilitytoolbar.get('uci_title_disable_cdu')+"\"><img alt=\""+ accessibilitytoolbar.get('uci_title_disable_cdu') + "\" src='" + hebergementFullPath + "/images/btn_on_bar.png'></a>";
        attr_ihm += "<a class='cdu_c' href='javascript:UciIhm.desactiveCDUForWebSite();' id='uci_inactive_cdu_img' style='display:"+(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?'none':'block')+"' title=\""+accessibilitytoolbar.get('uci_title_enable_cdu')+"\"><img alt=\""+ accessibilitytoolbar.get('uci_title_enable_cdu') + "\" src='" + hebergementFullPath + "/images/btn_off_bar.png'></a>";



        // hide the toolbar
        /*
        attr_ihm += "<a class='cdu_c' href=\"#\" id=\"uci_moreconfortleft\" onclick=\"UciIhm.ToolbarHide();return false;\">";
        attr_ihm += accessibilitytoolbar.get('uci_link_hide_toolbar');
        attr_ihm += "</a>";
        */


        attr_ihm += "<div id='uci_activate_menu' class='cdu_c'>";
        attr_ihm += "<a href='javascript:UciIhm.uci_activate_menu();' id='uci_activer_menu' title=\""+accessibilitytoolbar.get('uci_txt_link_menu_open')+"\"><img alt=\""+accessibilitytoolbar.get('uci_txt_link_menu_open')+"\" src='"+ hebergementFullPath + "/images/btn_menu.png'></a>";
        attr_ihm += "<a href='javascript:UciIhm.uci_activate_menu();' id='uci_fermer_menu' style='display:none;' title=\""+accessibilitytoolbar.get('uci_txt_link_menu_close')+"\"><img alt=\""+accessibilitytoolbar.get('uci_txt_link_menu_close')+"\" src='"+ hebergementFullPath +"/images/btn_menu_active.png'></a>";



        //gestion du menu deroulant du menu
        attr_ihm += "<div id='uci_cdu_menu' style='display:none;'>";
        attr_ihm += "<ul>";
        attr_ihm += "<li>";
        attr_ihm += "<div id='uci_language'>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "fr"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_fr' value='fr' id='uci_fr' onClick=\"UciIhm.changement_langue('fr');\" title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_fr')+"\"/>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "en"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_en' value='en' id='uci_en' onClick=\"UciIhm.changement_langue('en');\" title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_en')+"\"/>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "es"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_sp' value='sp' id='uci_sp' onClick=\"UciIhm.changement_langue('es');\" title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_es')+"\"/>";
        attr_ihm += "</div>";
        attr_ihm += "</li>";
        attr_ihm += "<li><a id='uci_menu_ouverture_aide' href=\""+hebergementFullPath+"help/help_"+accessibilitytoolbar.strings.getLocale()+".html"+"\" target='_blank'>";
        attr_ihm += accessibilitytoolbar.get('uci_menu_help');
        attr_ihm += "</a></li>";
        attr_ihm += "<li><a id='uci_menu_toolbar' value='on' name='a11yToolbarEnabled' href='#' onclick='UciIhm.ToolbarHide();return false;'>";
        attr_ihm += accessibilitytoolbar.get('uci_link_hide_toolbar');
        attr_ihm += "</a>";
        attr_ihm +=  "</li>";
        attr_ihm += " <li><a id='uci_menu_remoce_all' href='#' onclick='UciIhm.remove_all();return false;'>";
        attr_ihm += accessibilitytoolbar.get('uci_menu_remove_all');
        attr_ihm += "</a></li>";
        attr_ihm += "<li><a href='#' id='uci_menu_activate_cdu_for_site' onclick=\"UciIhm.desactiveCDUForWebSite();return false;\">";
        attr_ihm += (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?accessibilitytoolbar.get('uci_txt_disable_cdu'):accessibilitytoolbar.get('uci_txt_enable_cdu'));
        attr_ihm += "</a></li>";
        attr_ihm += "<li><a href='#' id='uci_menu_activer_menu'  onclick='UciIhm.uci_activate_menu();return false;'>";
        attr_ihm += accessibilitytoolbar.get('uci_txt_link_menu_close');
        attr_ihm += "</a></li>";
        attr_ihm += "</ul>";
        attr_ihm += "</div>"; // fin menu     
        attr_ihm += "</div>"; // fin menu        
        attr_ihm += "</div>"; // fin div activate
        attr_ihm += "</div>"; // fin div right
        attr_ihm += "</div>"; // fin div toolbar quick
        /*********************************************Gestion du menu d'onglet*****************************************************
         Mise en place d'un système d'onglet, pour la gestion des différents onglets composant le CDU :
         - Onglet typographie : reprenant les différents éléments en rapport
         * à la police d'écriture
         * aux tailles des texte
         * aux tailles des espacements des mots,des lignes, des caractères
         * à la casse du texte.
         - Onglet agencement : reprenant les différents éléments en rapport :
         * à la gestion de la mise en page
         * à l'alignement des texte
         * à l'apparence des liens de navigations
         * à la supression des effet de transparence, aux images de fond, à la suppréssion des images de premier plan
         - Onglet couleurs : reprenant les différents éléments suivant :
         * Utilisation prédéfinis de couleurs de fond et d'écriture
         * Ou utilisation de couleurs prédéfinies
         * Gestion du contraste entre les couleurs
         - Onglet aide motrices : reprenant les différents comportement d'aide à la motricité :
         * Sauter le contenu
         * Gestion de la navigation par pointage
         * Gestion de la sélection automatique des éléments
         ***************************************************************************************************************************/

        attr_ihm += "<div class='uci_systeme_onglets cdu_c' id=\"uci_zone_form\" style='display:none;'>";
        attr_ihm += "<a id='uci_fermeture_more_comfort' href=\"#\" onclick=\"UciIhm.hide_more_confort('uci_activateOnglet', 'uci_moreconfort_content');return false;\" style='display:none;' title='"+ accessibilitytoolbar.get('uci_txt_low_settings')+"'>";
        attr_ihm += "<img src=\"" + hebergementFullPath + "images/btn_close_cross.png\" alt='"+ accessibilitytoolbar.get('uci_txt_low_settings')+"'>";
        attr_ihm += "</a>";
        attr_ihm += "<div id=\"uci_activateOnglet\" style='display:none;'>"; // uci_activateOnglet        
        attr_ihm += "<!--[if IE 7]><div class='uci_onglets uci_ongletsie7'><![endif]-->";
        attr_ihm += "<!--[if (IE) & (!IE 7)]><div class='uci_onglets'><![endif]-->";        
        attr_ihm += "<!--[if (!IE)]>--><div class='uci_onglets'><!--<![endif]-->"; // uci_onglets
        attr_ihm += "<div>"; // 2
        attr_ihm += "<div class='uci_container_onglets'>";  // 1

        attr_ihm += "<ul id='uci_onglet_confort' role='tablist' class='cdu_c'>";
        attr_ihm += "<li role='tab' aria-selected='true' aria-controls='uci_contenu_onglet_typographie' tabindex='0' class='uci_inline'> <span class=\"onglet_1 onglet\" id=\"onglet_typographie\">";
        attr_ihm += accessibilitytoolbar.get('uci_txt_onglet_typo');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_apparence' tabindex='-1' class='uci_inline'> <span class=\"onglet_0 onglet\" id=\"onglet_apparence\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_txt_onglet_apparence');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_couleur' tabindex='-1' class='uci_inline'> <span  class=\"onglet_0 onglet\" id=\"onglet_couleur\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_txt_onglet_color');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_aidemotrice' tabindex='-1' class='uci_inline'> <span class=\"onglet_0 onglet\" id=\"onglet_aidemotrice\">";
        attr_ihm += accessibilitytoolbar.get('uci_txt_onglet_motor_help');
        attr_ihm += "</span></li>";
        attr_ihm += "</ul>";

        attr_ihm += "</div>"; // fin 1
        attr_ihm += "</div>"; // fin 2
        attr_ihm += "</div>"; // fin uci_onglets

        attr_ihm += "<div class='uci_div_conteneur_contenu_onglets'>";
        attr_ihm += "<!--[if IE 7]><div class='uci_contenu_onglets uci_contenu_ongletsie7'><![endif]-->";
        attr_ihm += "<!--[if (IE) & (!IE 7)]><div class='uci_contenu_onglets'><![endif]-->";        
        attr_ihm += "<!--[if (!IE)]>--><div class='uci_contenu_onglets'><!--<![endif]-->"; // uci_contenu_onglets
        var typo = new UciTypographie();
        attr_ihm += typo.InitUciTypographie();
        var apparence = new UciApparence();
        attr_ihm += apparence.InitUciApparence();
        var couleur = new UciCouleur();
        attr_ihm += couleur.InitUciCouleur();
        var aide_motrice = new UciAideMotrice();
        attr_ihm += aide_motrice.InitUciAideMotrice();
        attr_ihm += "</div>"; // fin contenu onglets
        attr_ihm += "</div>"; // fin clear
        attr_ihm += "</div>"; // fin uci_activateOnglet


        var validation =  new UciValidation();
        var strValidation = validation.InitUciValidation();
        attr_ihm += "<div id='uci_validation' class='cdu_n'>"+strValidation+"</div></form>";

        attr_ihm += "</div>"; // fin uci_zone_form
        attr_ihm += "</div>"; // fin container
        return attr_ihm;
    };
    /*Permet d’activer le menu facebook du confort d’utilisation*/
    UciIhm.uci_activate_menu = function () {
        if (document.getElementById('uci_cdu_menu').style.display === "none") {
            document.getElementById('uci_cdu_menu').style.display = "block";
            document.getElementById("uci_activer_menu").style.display = "none";
            document.getElementById("uci_fermer_menu").style.display = "block";
            document.getElementById("uci_fermer_menu").focus();
        } else {
            UciIhm.close_menu();
        }
    };

    /* Permet de désactiver l’affichage du menu facebook.
       @param nofocus boolean true if focus don't need to be pushed
    */


    UciIhm.close_menu = function (nofocus) {
        document.getElementById('uci_cdu_menu').style.display = "none";
        document.getElementById("uci_activer_menu").style.display = "block";
        document.getElementById("uci_fermer_menu").style.display = "none";
        if(nofocus) return false;
        document.getElementById("uci_activer_menu").focus();
    };
    /*Permet d’ouvrir les onglets de plus de confort de la toolbar de CDU.*/
    UciIhm.more_confort = function (id_confort, id_more) {
        if (document.getElementById(id_confort).style.display === "none") {
            UciIhm.close_menu();
            document.getElementById("uci_middle_toolbar").style.backgroundImage= "url("+ hebergementFullPath + "/images/btn_minus.png)";
            document.getElementById(id_confort).style.display = "block";
            if(document.getElementById('uci_quick_a11yBigger_keepit').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_keepit').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yBigger_150').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_150').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yBigger_200').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_200').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').setAttribute('tabindex','-2');
            document.getElementById('uci_active_cdu_img').setAttribute('tabindex','-2');
            document.getElementById('uci_activer_menu').setAttribute('tabindex','-2');
            if(document.getElementById('uci_zone_form'))
            {
                document.getElementById('uci_zone_form').style.display = "block";
            }
            document.getElementById('uci_fermeture_more_comfort').style.display = "block";
            document.getElementById('uci_left_toolbar').className = "cdu_c uci_mask";
            document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','true');
            document.getElementById('uci_middle_toolbar').className = "cdu_c uci_mask";
            document.getElementById('uci_right_toolbar').className = "cdu_c uci_mask";
            document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','true');
            document.getElementById('uci_toolbar-quick').className = "cdu_c uci_mask";            
            document.getElementById('uci_moreconfort').title=accessibilitytoolbar.get('uci_txt_low_settings');
            document.getElementById('uci_moreconfort_content').innerHTML=accessibilitytoolbar.get('uci_txt_low_settings_display');
            // disable hide the toolbar
            //document.getElementById('uci_moreconfortleft').setAttribute('onclick','return false;');
            //document.getElementById('uci_moreconfortleft').setAttribute('tabindex','-1');
            document.getElementById('uci_activer_menu').setAttribute('href','#');
            document.getElementById('uci_active_cdu_img').setAttribute('href','#');
            // disable hide fontsize buttons
            // disable color button
            var elmt = document.getElementById('uci_onglet_confort');
            for(var i=0;i<elmt.children.length;i++){
                var elmt_enfant = elmt.children[i];
                if (elmt_enfant.getAttribute('tabindex') === '0' && elmt_enfant.getElementsByTagName('li')){
                   elmt_enfant.focus();
                }
            }

        } else {
            UciIhm.hide_more_confort(id_confort, id_more);
        }
    };
    UciIhm.hide_more_confort = function (id_confort, id_more) {

        //document.getElementById('uci_moreconfortleft').focus();
        if(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on") {
            document.getElementById("uci_active_cdu_img").focus();
        }
        else {
            document.getElementById("uci_inactive_cdu_img").focus();
        }
        document.getElementById("uci_middle_toolbar").style.backgroundImage= "url("+ hebergementFullPath + "/images/btn_plus.png)";
        document.getElementById(id_confort).style.display = "none";
        if(document.getElementById('uci_zone_form'))
        {
            document.getElementById('uci_zone_form').style.display = "none";
        }
        document.getElementById('uci_fermeture_more_comfort').style.display = "none";
        document.getElementById('uci_left_toolbar').className = "cdu_c";
        document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','false');
        document.getElementById('uci_middle_toolbar').className = "cdu_c";
        document.getElementById('uci_right_toolbar').className = "cdu_c";
        document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','false');
        document.getElementById('uci_toolbar-quick').className = "cdu_c";
        document.getElementById('uci_activer_menu').setAttribute('href',"javascript:UciIhm.uci_activate_menu();");
        document.getElementById('uci_active_cdu_img').setAttribute('href',"javascript:UciIhm.desactiveCDUForWebSite();");
        if(document.getElementById('uci_quick_a11yBigger_keepit').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_keepit').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yBigger_150').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_150').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yBigger_200').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_200').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').setAttribute('tabindex','0');
        document.getElementById('uci_active_cdu_img').removeAttribute('tabindex');
        //document.getElementById('uci_moreconfortleft').removeAttribute('tabindex');
        document.getElementById('uci_activer_menu').removeAttribute('tabindex');
        document.getElementById('uci_moreconfort').removeAttribute('title');  
        document.getElementById('uci_moreconfort_content').innerHTML=accessibilitytoolbar.get('uci_txt_more_settings');
        // enable hide the toolbar    
        //document.getElementById('uci_moreconfortleft').setAttribute('onclick','UciIhm.ToolbarHide();return false;');

        //document.getElementById('uci_moreconfortleft').setAttribute('tabindex','0');
    };

    UciIhm.activate_liens = function (id_liens) {
        if (document.getElementById(id_liens).style.display === "none") {
            document.getElementById(id_liens).style.display = "block";
            document.getElementById(checked_apparence).checked = "true";
        } else {
            document.getElementById(id_liens).style.display = "none";
            document.getElementById(checked_apparence).checked = "false";
        }
    };

    UciIhm.changement_langue = function (/* String*/langue) {
        // if stack value not equal to cookievalue then display a confirm message to inform the user
        var tempMatrix = accessibilitytoolbar.userPref.convertMatrixv3.reverse();
        if ((accessibilitytoolbar.userPref.encode()+tempMatrix['a11ySiteWebEnabled' + "-" + accessibilitytoolbar.userPref.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "") === accessibilitytoolbar.userPref.cookieValue) 
                || confirm(accessibilitytoolbar.get('uci_modif_not_saved'))){
            accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.cookieValue);
            accessibilitytoolbar.userPref.set("a11yLanguage", langue);
            accessibilitytoolbar.userPref.updateUserPref();
            // when the user change the lang of the interface, wee need to reload after save is done
            accessibilitytoolbar.needToReload = true;
        }
    };

    UciIhm.remove_all = function () {
        var defaultcookieValue = "0000651000650650650000000000000000006500000010"+(accessibilitytoolbar.userPref.get('a11ySiteWebEnabled')==='on'?'0':'1');
        accessibilitytoolbar.userPref.InitUciCookie(defaultcookieValue);
        accessibilitytoolbar.userPref.updateUserPref();
        accessibilitytoolbar.reloadToolbar();
    };


    UciIhm.desactiveCDUForWebSite = function () {
        if (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") !== "on") {
            document.getElementById('uci_active_cdu_img').style.display='block';
            document.getElementById('uci_inactive_cdu_img').style.display='none';
            document.getElementById('uci_left_toolbar').style.display='block';
            document.getElementById('uci_middle_toolbar').style.display='block';
            document.getElementById('uci_span_disabled').style.display='none';
            document.getElementById('uci_menu_activate_cdu_for_site').innerHTML = accessibilitytoolbar.get('uci_txt_disable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "on");
            document.getElementById("uci_active_cdu_img").focus();
        } else {
            document.getElementById('uci_active_cdu_img').style.display='none';
            document.getElementById('uci_inactive_cdu_img').style.display='block';
            document.getElementById('uci_span_disabled').style.display='block';
            document.getElementById('uci_left_toolbar').style.display='none';
            document.getElementById('uci_middle_toolbar').style.display='none';
            document.getElementById('uci_menu_activate_cdu_for_site').innerHTML = accessibilitytoolbar.get('uci_txt_enable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "off");
            document.getElementById("uci_inactive_cdu_img").focus();
        }    
        accessibilitytoolbar.userPref.updateBlackList();
        accessibilitytoolbar.setCSS();
        UciIhm.close_menu(true);
    };

    UciIhm.ToolbarHide = function () {
        accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.cookieValue);
        accessibilitytoolbar.userPref.set("a11yToolbarEnable", "off");
        accessibilitytoolbar.userPref.updateUserPref();

        accessibilitytoolbar.hide();
        if(accessibilitytoolbar.idLinkModeContainer){
            document.getElementById(accessibilitytoolbar.idLinkModeContainer).focus();
        }else{
            document.getElementById('cdu_close').getElementsByTagName("button")[0].focus();
        }
        return false;
    };
}