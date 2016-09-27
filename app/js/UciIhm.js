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
 * @class IHM
 * @classdesc Cette classe permettra de gérer les appels des onglets de la toolbar
 */
/*global window */
/*global document: false */
/* global alert */
/**
 * @class Entry point for the accessibility tool-bar
 */
UciIhm = {
    /*
     * @public
     * @constructor
     * 	constructor uci_ihm() : Constructeur de la class uciIhm
     *
     */
    InitUciIHM: function () {
        var attr_ihm = "<div class='cdu_c'>";
        attr_ihm += "<div id='uci_toolbar-quick' class='cdu_c'>";
        /****************************Integration dans la toolbar du menu de gauche********************************************
         * Mise en place du lien "masquer la barre", qui permettra de masquer la barre du confort d'utilisateur
         * Mise en place du logo " + de confort" pour donner identité graphique à la barre de confort
         * *********************************************************************************************************************/

        attr_ihm += "<div class='uci_logo_plus_de_confort cdu_c'>";
        attr_ihm += "<h1 class='uci_alt_logo'>";
        attr_ihm += accessibilitytoolbar.get('uci_serv_name')+'<span class="uci-plus-orange">+</span>';
        attr_ihm += "</h1>"+        
            "<div class='cdu_c uci-onoffswitch'>"+
                "<a class='"+(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?"uci-onoffswitch-label-on' title=\""+accessibilitytoolbar.get('uci_title_disable_cdu')+"\"":"uci-onoffswitch-label' title=\""+accessibilitytoolbar.get('uci_title_enable_cdu')+"\"")+" id='uci-onoffswitch' href='#'>"+
                    "<span class='uci-onoffswitch-inner-before'>On</span>"+
                    "<span class='uci-onoffswitch-inner-after'>Off</span>"+
                "</a>"+
            "</div>";
    
        attr_ihm += "</div>";
        attr_ihm += "<div class='uci_right'>";
        
        attr_ihm += "<!--[if IE 7 ]>";
            attr_ihm += "<div id='uci_left_toolbar' class='cdu_c uci_notmask ie7'";
            if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on") {            
                attr_ihm += " style='display:none'";
            }
            attr_ihm += ">";
        attr_ihm += "<![endif]-->";
        attr_ihm += "<!--[if (gte IE 8) | (!IE)]><!-->";
            attr_ihm += "<div id='uci_left_toolbar' class='cdu_c uci_notmask'";
            if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on") {            
                attr_ihm += " style='display:none'";
            }
            attr_ihm += ">";    
        attr_ihm += "<!--<![endif]-->";
        
        /***************************************Fin menu de gauche*************************************************************/

        /**********************************************Menu central de la toolbar**********************************************
         * Mise en place des choix rapides concernant les tailles de police : 3 choix possibles
         * Mise en place des choix rapides concernant les contraste de couleur de police et d'arriere plan : 2 choix possibles
         * Mise en place du lien " + plus de confort" pour permettre l'ouverture complète aux options du CDU
         ***********************************************************************************************************************/
        /*
         * gestion de la police
         */
        attr_ihm += "<ul class='uci_liste_bton cdu_c' id='uci_reponses_bigger_quick_set' role='radiogroup'>";
        attr_ihm += "<li id='uci_quick_a11yBigger_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_normal')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "A";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_normal');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yBigger_150' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_medium')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "A";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_medium');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yBigger_200' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_large')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "A";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_large');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "</ul>";
        /**
         * Gestion des couleurs
         */
        attr_ihm += "<ul class='uci_liste_bton cdu_c' id='uci_reponses_couleurpredefinie_quick_set' role='radiogroup'>";
        attr_ihm += "<li id='uci_quick_a11yVisualPredefinedSettings_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_color_default')+"\">";
        attr_ihm += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_color_default')+"</span>";
        attr_ihm += "<span class='cdu-icon-test'>"+
                "<span class='path1'></span>"+
                "<span class='path2'></span>"+
                "<span class='path3'></span>"+
                "<span class='path4'></span>"+
                "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yVisualPredefinedSettings_blackonwhite' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_color_blackandwhite')+"\">";
        attr_ihm += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_color_blackandwhite')+"</span>";
        attr_ihm += "<span class='cdu-icon-couleurs2'></span>";
        attr_ihm += "</li>";
        attr_ihm += "</ul>";
        attr_ihm += "</div>";
        /***************************************** Fin bloc uci_left_toolbar de la toolbar *****************************************/
        
        
        attr_ihm += "<!--[if IE 7 ]>";
            attr_ihm += "<div id='uci_middle_toolbar' class='cdu_c uci_notmask ie7'";
            if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on") {        
                attr_ihm += " style='display:none'";
            }
            attr_ihm += ">";
        attr_ihm += "<![endif]-->";
        attr_ihm += "<!--[if (gte IE 8) | (!IE)]><!-->";
            attr_ihm += "<div id='uci_middle_toolbar' class='cdu_c uci_notmask'";
            if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on") {        
                attr_ihm += " style='display:none'";
            }
            attr_ihm += ">";    
        attr_ihm += "<!--<![endif]-->";

        //  gestion du lien "+ de confort"          
        attr_ihm += "<a class='uci_lien_plus_reglage cdu_c' href=\"#\" id='uci_moreconfort'>";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-plus2\" id=\"uci_icon_moreconfort\">"+""+"</span>";
        attr_ihm += "<span id='uci_moreconfort_content'>"+accessibilitytoolbar.get('uci_txt_more_settings')+"</span>";
        attr_ihm += "</a>";
        attr_ihm += "</div>";

        attr_ihm += "<!--[if IE 7 ]>";
            attr_ihm += "<div id='uci_right_toolbar' class='cdu_c uci_notmask ie7'>";
        attr_ihm += "<![endif]-->";
        attr_ihm += "<!--[if (gte IE 8) | (!IE)]><!-->";
            attr_ihm += "<div id='uci_right_toolbar' class='cdu_c uci_notmask'>";  
        attr_ihm += "<!--<![endif]-->";
        
        /************************************************Menu de droite de la toolbar*******************************************         
         * Mise en place du menu facebook tout a droite, permettant d'un menu comprenant :
         * le choix de langues
         * la consultation de l'aide générale
         * la reinitialisation de tout mes réglages
         * le masquage de la barre "+ de confort"
         **********************************************************************************************************************/
        
        attr_ihm += "<ul>"+
                        "<li class='uci_inline uci_menu_help'>"+
                                "<button class='uci_bton_menu cdu_c' id='uci_activer_menu'>"+
        							accessibilitytoolbar.get('uci_txt_link_menu') +
                                "</button>";
        //gestion du menu deroulant du menu
        attr_ihm += "<div>";
        attr_ihm += "<div id='uci_cdu_menu' style='display:none;'>";        
        attr_ihm += "<ul>";
        attr_ihm += "<li>";
        attr_ihm += "<div id='uci_language'>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "fr"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_fr' value='fr' id='uci_fr' title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_fr')+"\"/>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "en"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_en' value='en' id='uci_en' title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_en')+"\"/>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "es"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_sp' value='sp' id='uci_sp' title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_es')+"\"/>";
        attr_ihm += "</div>";
        
        attr_ihm += "</li>";
        attr_ihm += "<li><a id='uci_menu_ouverture_aide' href=\""+helpPath[accessibilitytoolbar.strings.getLocale()]+"\" title=\""+(accessibilitytoolbar.get('uci_menu_help')+" ("+accessibilitytoolbar.get('uci_new_window'))+")\" target=\"_BLANK\">";
        attr_ihm += '<span aria-hidden=\"true\" class="cdu-icon cdu-icon-help"></span><span>' + accessibilitytoolbar.get('uci_menu_help') + '</span>';
        attr_ihm += "</a></li>";
        
        attr_ihm += "</ul>";
        attr_ihm += "</div></div></li>"; // fin menu     
        
        attr_ihm += "<li class='uci_inline'><button id='uci_menu_activer_menu' class='uci_bton_menu cdu_c' title='"+accessibilitytoolbar.get('uci_link_hide_toolbar')+"' type='button'>";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-croix\"></span>"
        attr_ihm += "<span class=\"cdu_n\">"+accessibilitytoolbar.get('uci_link_hide_toolbar')+"</span>"
        attr_ihm += "</button></li></ul>";
        
        attr_ihm += "</div>"; // fin div uci_right_toolbar
        attr_ihm += "</div>"; // fin div uci_right
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
        
        attr_ihm += "<div id=\"uci_activateOnglet\" style='display:none;'>"; // uci_activateOnglet        
        attr_ihm += "<div id='uci_menu_remove_all' class='uci_choix'>"+
        "<span class='cdu-icon-reload2' aria-hidden='true'></span>"+
        accessibilitytoolbar.get('uci_menu_remove_all')+
        "</div>";
        attr_ihm += "<!--[if IE 7]><div class='uci_onglets uci_ongletsie7'><![endif]-->";
        attr_ihm += "<!--[if (IE) & (!IE 7)]><div class='uci_onglets'><![endif]-->";        
        attr_ihm += "<!--[if (!IE)]>--><div class='uci_onglets'><!--<![endif]-->"; // uci_onglets
        attr_ihm += "<div>"; // 2
        attr_ihm += "<div class='uci_container_onglets'>";  // 1

        attr_ihm += "<ul id='uci_onglet_confort' role='tablist' class='cdu_c'>";
        attr_ihm += "<li role='tab' aria-selected='true' aria-controls='uci_contenu_onglet_typographie' tabindex='0' class='uci_inline'> <span class=\"onglet_1 onglet\" id=\"onglet_typographie\">";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-typographie icon\"></span>";
        attr_ihm += accessibilitytoolbar.get('uci_txt_onglet_typo');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_apparence' tabindex='-1' class='uci_inline'> <span class=\"onglet_0 onglet\" id=\"onglet_apparence\">";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-agencement icon\"></span>";
        attr_ihm +=  accessibilitytoolbar.get('uci_txt_onglet_apparence');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_couleur' tabindex='-1' class='uci_inline'> <span  class=\"onglet_0 onglet\" id=\"onglet_couleur\">";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-couleurs2 icon\"></span>";
        attr_ihm +=  accessibilitytoolbar.get('uci_txt_onglet_color');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_aidemotrice' tabindex='-1' class='uci_inline'> <span class=\"onglet_0 onglet\" id=\"onglet_aidemotrice\">";
        attr_ihm += "<span aria-hidden=\"true\" class=\"cdu-icon cdu-icon-comportement icon\"></span>";
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
        attr_ihm += UciTypographie.InitUciTypographie();
        attr_ihm += UciApparence.InitUciApparence();
        var couleur = new UciCouleur();
        attr_ihm += couleur.InitUciCouleur();
        attr_ihm += UciAideMotrice.InitUciAideMotrice();
        attr_ihm += "</div>"; // fin contenu onglets
        attr_ihm += "</div>"; // fin clear
        attr_ihm += "</div>"; // fin uci_activateOnglet


        //var validation =  new UciValidation();
        var strValidation = UciValidation.InitUciValidation();
        attr_ihm += "<div id='uci_validation' class='cdu_n'>"+strValidation+"</div>";

        attr_ihm += "</div>"; // fin uci_zone_form
        attr_ihm += "</div>"; // fin container
		
		attr_ihm += "<div id='uci_confirm_validation'><span>" + accessibilitytoolbar.get('uci_confirm_validation') + "</span></div>";
        return attr_ihm;
    },
    

    /* Permet de désactiver l’affichage du menu facebook.
       @param nofocus boolean true if focus don't need to be pushed
    */


    close_menu: function (nofocus) {
      // if cookie can't be retrieve for security reason, uci_cdu_menu doesn't exist and throw an error
      // fix issue #11 https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/11
      if(document.getElementById('uci_cdu_menu'))
      {
		    document.getElementById('uci_cdu_menu').style.display = "none";
        var button = document.getElementById("uci_activer_menu");
        if(button.nodeName === 'BUTTON') {
          button.title = accessibilitytoolbar.get('uci_txt_link_menu_open');
			    var li = button.parentNode;
			    li.className = 'uci_inline uci_menu_help';
        }
        if(nofocus) return false;
        document.getElementById("uci_activer_menu").focus();
      }
    },
    /*Permet d’activer le menu facebook du confort d’utilisation*/
    uci_activate_menu: function (e) {
        // when more settings is open, disable quick settings buttons
        if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
        var menu = document.getElementById('uci_cdu_menu');
		if (document.getElementById('uci_cdu_menu').style.display === "none") {
            document.getElementById('uci_cdu_menu').style.display = "block";
            var button = document.getElementById("uci_activer_menu");
            if(button.nodeName === 'BUTTON') {
                button.title = accessibilitytoolbar.get('uci_txt_link_menu_close');
                var li = button.parentNode;
			    li.className = 'uci_inline uci_menu_help active';
            }
            document.getElementById("uci_activer_menu").focus();
        } else {
            UciIhm.close_menu();
        }
        accessibilitytoolbar.stopEvt(e);
		return false;
    },
    /*Permet d’ouvrir les onglets de plus de confort de la toolbar de CDU.*/
    more_confort: function () {
    	if (document.getElementById('uci_activateOnglet').style.display === "none") {
            UciIhm.close_menu();
            document.getElementById("uci_icon_moreconfort").className= "cdu-icon cdu-icon-moins2";
            document.getElementById('uci_activateOnglet').style.display = "block";
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
            document.getElementById('uci_menu_activer_menu').setAttribute('tabindex','-2');                        
            document.getElementById('uci_activer_menu').setAttribute('tabindex','-2');
            if(document.getElementById('uci_zone_form'))
            {
                document.getElementById('uci_zone_form').style.display = "block";
				UciIhm.hide_confirm_validation();
            }
            //document.getElementById('uci_fermeture_more_confort').style.display = "block";            
            document.getElementById('uci_left_toolbar').className = document.getElementById('uci_left_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");         
            document.getElementById('uci_middle_toolbar').className = document.getElementById('uci_middle_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");         
            document.getElementById('uci_right_toolbar').className = document.getElementById('uci_right_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");
            document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','true');
            document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','true');         
            document.getElementById('uci_moreconfort').title=accessibilitytoolbar.get('uci_txt_low_settings');
            document.getElementById('uci_moreconfort_content').innerHTML=accessibilitytoolbar.get('uci_txt_low_settings_display');
            // disable hide the toolbar
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
            UciIhm.hide_more_confort();
        }
        return false;
    },
    hide_more_confort: function () {
		UciIhm.hide_confirm_validation();
    	document.getElementById("uci-onoffswitch").focus();
        document.getElementById("uci_icon_moreconfort").className= "cdu-icon cdu-icon-plus2";
        document.getElementById('uci_activateOnglet').style.display = "none";
        if(document.getElementById('uci_zone_form'))
        {
            document.getElementById('uci_zone_form').style.display = "none";
        }
        document.getElementById('uci_left_toolbar').className = document.getElementById('uci_left_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");
        document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','false');              
            document.getElementById('uci_middle_toolbar').className = document.getElementById('uci_middle_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");      
            document.getElementById('uci_right_toolbar').className = document.getElementById('uci_right_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");
        document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','false');
        
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
        document.getElementById('uci_activer_menu').removeAttribute('tabindex');
        document.getElementById('uci_menu_activer_menu').removeAttribute('tabindex');
        document.getElementById('uci_moreconfort').removeAttribute('title');  
        document.getElementById('uci_moreconfort_content').innerHTML=accessibilitytoolbar.get('uci_txt_more_settings');
        return false;
    },
	confirm_validation: function() {
		document.getElementById('uci_confirm_validation').style.display = "block";
	},
	
	hide_confirm_validation: function() {
		document.getElementById('uci_confirm_validation').style.display = "none";
	},

    activate_liens: function (id_liens) {
        if (document.getElementById(id_liens).style.display === "none") {
            document.getElementById(id_liens).style.display = "block";
            document.getElementById(checked_apparence).checked = "true";
        } else {
            document.getElementById(id_liens).style.display = "none";
            document.getElementById(checked_apparence).checked = "false";
        }
        return false;
    },

    changement_langue: function (/* String*/langue) {
        // if stack value not equal to storedValue then display a confirm message to inform the user
        var tempMatrix = accessibilitytoolbar.userPref.convertMatrixv3.reverse();
        if ((accessibilitytoolbar.userPref.encode()+tempMatrix['a11ySiteWebEnabled' + "-" + accessibilitytoolbar.userPref.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "") === accessibilitytoolbar.userPref.storedValue) 
                || confirm(accessibilitytoolbar.get('uci_modif_not_saved'))){
            accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.storedValue);
            accessibilitytoolbar.userPref.set("a11yLanguage", langue);
            accessibilitytoolbar.needToReload = true;
            accessibilitytoolbar.userPref.updateUserPref();
            // when the user change the lang of the interface, wee need to reload after save is done
            accessibilitytoolbar.reloadToolbar();
        }
        return false;
    },
    remove_all: function () {
        // when more settings is open, disable quick settings buttons
        if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
        if(confirm(accessibilitytoolbar.get('uci_remove_all_settings'))) {
            var defaultstoredValue = "0000651000650650650000000000000000006500000010"+(accessibilitytoolbar.userPref.get('a11ySiteWebEnabled')==='on'?'0':'1');
            accessibilitytoolbar.userPref.setStoredValue(defaultstoredValue);
            accessibilitytoolbar.userPref.updateUserPref();
            accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
            accessibilitytoolbar.reloadToolbar();
        }
        return false;
    },


    desactiveCDUForWebSite: function () {
        if (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") !== "on") {
            document.getElementById('uci_left_toolbar').style.display='';
            document.getElementById('uci_middle_toolbar').style.display='';
            document.getElementById('uci-onoffswitch').title = accessibilitytoolbar.get('uci_title_disable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "on");
            document.getElementById("uci-onoffswitch").className="uci-onoffswitch-label-on";
            document.getElementById("uci-onoffswitch").focus();
        } else {
            UciIhm.hide_more_confort();
            document.getElementById('uci_left_toolbar').style.display='none';
            document.getElementById('uci_middle_toolbar').style.display='none';
            document.getElementById('uci-onoffswitch').title = accessibilitytoolbar.get('uci_title_enable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "off");
            document.getElementById("uci-onoffswitch").className="uci-onoffswitch-label";
            document.getElementById("uci-onoffswitch").focus();
        }    
        accessibilitytoolbar.userPref.updateBlackList();
        
        accessibilitytoolbar.cleanImgDisabled();
        accessibilitytoolbar.setCSS();
        UciIhm.close_menu(true);
        return false;
    },

    ToolbarHide: function () {
        // when more settings is open, disable quick settings buttons
        if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
        accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.storedValue);
        accessibilitytoolbar.userPref.set("a11yToolbarEnable", "off");
        accessibilitytoolbar.userPref.updateUserPref();

        accessibilitytoolbar.hide();
        if(accessibilitytoolbar.idLinkModeContainer){
            document.getElementById(accessibilitytoolbar.idLinkModeContainer).focus();
        }else{
            document.getElementById('cdu_close').getElementsByTagName("button")[0].focus();
        }
        return false;
    }
};