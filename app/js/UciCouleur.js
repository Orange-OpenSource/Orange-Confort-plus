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
 * @class uci_couleur
 * @classdesc Cette classe permettra d'implémenter l'onglet couleur
 */
/*global window */
/*global document: false */
/* global alert */
UciCouleur = {

    /*
     * @constructor
     */
    InitUciCouleur: function () {
      return accessibilitytoolbar.make(["div", {id:"uci_contenu_onglet_couleur", "class":"uci_contenu_onglet cdu_c", role:"tabpanel"},
        ["div", {"class":"margin-left margin-right-lg margin-top-lg uci_w50-left"},
          ["input", {type:"radio", value:"predefined", name:"a11yVisualSettings", id:"a11yVisualSettings-predefined", checked:accessibilitytoolbar.userPref.get("a11yVisualSettings") === "predefined" ? "checked" : false}],
          ["label", {"for":"a11yVisualSettings-predefined", "class":"uci_couleur_left"}, accessibilitytoolbar.get('uci_color_titre')],
          accessibilitytoolbar.makePredefinedCouleurTpl(),
          ["div", {id:"uci_message_constraste", style:"display:none;", "class":"message_couleur"},
            ["p", {style:"color: black !important; background-color: #FFFFFF !important;"}, accessibilitytoolbar.get("uci_color_warning_title")],
            ["span", {style:"color: black !important; background-color: #FFFFFF !important;", id:"uci_message_contraste_lbl"}, accessibilitytoolbar.get('uci_color_warning_content')]
          ]
        ],
        ["div", {"class":"margin-left margin-top-lg uci_w50-left"},
          ["div", {"class":"cdu_c"},
            ["input", {type:"radio", value:"personnal", name:"a11yVisualSettings", id:"a11yVisualSettings-personnal", checked:accessibilitytoolbar.userPref.get("a11yVisualSettings") === "personnal" ? "checked" : false}],
            ["label", {"for":"a11yVisualSettings-personnal", "class":"uci_couleur_left"}, accessibilitytoolbar.get('uci_color_titre_use_personal')]              
          ],
          ["div", {id:"uci_couleur_police", "class":"padding-left-align cdu_c"},
            ["span", {id:"aria_label_texte"},accessibilitytoolbar.get('uci_color_txt_texte')],
            accessibilitytoolbar.makeCouleurTpl("uci_table_couleur margin-top cdu_c","uci_a11yFontColor_",accessibilitytoolbar.userPref.get("a11yFontColor"),"uci_reponses_couleurpolice","aria_label_texte")
          ],
          ["div", {id:"uci_couleur_fond", "class":"padding-left-align cdu_c"},
            ["span", {id:"uci_aria_label_fond", "class":"uci_couleur_clear"},accessibilitytoolbar.get('uci_color_txt_background')],
            accessibilitytoolbar.makeCouleurTpl("uci_table_couleur margin-top cdu_c","uci_a11yBackgroundColor_",accessibilitytoolbar.userPref.get("a11yBackgroundColor"),"uci_reponses_couleurbackground","uci_aria_label_fond")
          ]
        ]
      ]);
    }
}