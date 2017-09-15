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
        ["div", {"class":"margin-left margin-right-xlg margin-top-lg uci_w50-left"},
          ["div",
            ["input", {type:"checkbox", value:"true", name:"a11yVisualSettings", id:"a11yVisualSettings", checked:accessibilitytoolbar.userPref.get("a11yVisualSettings") === "true" ? true : false}],
            ["label", {"for":"a11yVisualSettings"}, accessibilitytoolbar.get('uci_color_titre')],
            accessibilitytoolbar.makePredefinedCouleurSelect(),
          ]
        ],
        ["div", {"class":"margin-left margin-right-xlg margin-top-lg uci_w50-left"},
          ["input", {type:"checkbox", value:"true", name:"a11yNavLienEnabled", id:"a11yNavLienEnabled", checked:accessibilitytoolbar.userPref.get("a11yNavLienEnabled") === "true" ? "checked" : false}],
          ["label", {"for":"a11yNavLienEnabled"}, accessibilitytoolbar.get('uci_titre_links')],
          accessibilitytoolbar.makeHelpTpl("uci_link_help_links","uci_help_links",accessibilitytoolbar.get('uci_help_links')),
          ["div", {id:"uci_gestion_lien"},
            ["div", {id:"uci_div_lien_selectionne"},
              ["span", {"class":"uci_span_lien cdu_c"}, accessibilitytoolbar.get('uci_txt_active')],
              ["div", {"class":"cdu_left"},
                ["button", {type:"button", id:"uci_NavLienSel", "class":"uci_inline uci_couleur_li uci_color_btn", title:accessibilitytoolbar.get('uci_title_link_active_color'), style:"background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienSelColor")+"!important"}],
                ["div", {"class":"uci_span_help_bulle", id:"uci_palette_couleur_lien_selectionne", style:"display:none"},
                  accessibilitytoolbar.makeCouleurTpl("uci_table_couleur cdu_c","uci_a11yNavLienSelColor_",accessibilitytoolbar.userPref.get("a11yNavLienSelColor"),"uci_reponses_couleur_lien_sel","uci_NavLienSel")
                ]
              ]
            ],
            ["div", {id:"uci_div_lien_notselectionne"},
              ["span", {"class":"uci_span_lien cdu_c"}, accessibilitytoolbar.get('uci_txt_notvisited')],
              ["div", {"class":"cdu_left"},
                ["button", {type:"button", id:"uci_NavLienNonVis", "class":"uci_inline uci_couleur_li uci_color_btn", title:accessibilitytoolbar.get('uci_title_link_notvisited_color'), style:"background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor")+"!important"}],
                ["div", {"class":"uci_span_help_bulle", id:"uci_palette_couleur_lien_notselectionne", style:"display:none"},
                  accessibilitytoolbar.makeCouleurTpl("uci_table_couleur cdu_c","uci_a11yNavLienNonVisColor_",accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor"),"uci_reponses_couleur_lien_notsel","uci_NavLienNonVis")
                ]
              ]
            ],
            ["div", {id:"uci_div_lien_visite"},
              ["span", {"class":"uci_span_lien cdu_c"}, accessibilitytoolbar.get('uci_txt_visited')],
              ["div", {"class":"cdu_left"},
                ["button", {type:"button", id:"uci_NavLienVis", "class":"uci_inline uci_couleur_li uci_color_btn", title:accessibilitytoolbar.get('uci_title_link_visited_color'), style:"background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienVisColor")+"!important"}],
                ["div", {"class":"uci_span_help_bulle", id:"uci_palette_couleur_lien_visite", style:"display:none"},
                  accessibilitytoolbar.makeCouleurTpl("uci_table_couleur cdu_c","uci_a11yNavLienVisColor_",accessibilitytoolbar.userPref.get("a11yNavLienVisColor"),"uci_reponses_couleur_lien_visite","uci_NavLienVis")
                ]
              ]
            ]
          ]
        ],
        ["div", {id:"uci_message_constraste", style:"display:none;", "class":"margin-top margin-bottom message_couleur"},
          ["div", {style:"color: black !important; background-color: #FFFFFF !important;"}, accessibilitytoolbar.get("uci_color_warning_title")],
          ["span", {style:"color: black !important; background-color: #FFFFFF !important;", "class":"uci_message_contraste_lbl", id:"uci_message_contraste_lbl"}, accessibilitytoolbar.get('uci_color_warning_content')]
        ]
      ]);
    }
}