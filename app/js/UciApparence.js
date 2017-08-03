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
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet apparence
 */
/*global window */
/*global document: false */
/* global alert */
UciApparence = {
    /*
     * @constructor init
     */

    InitUciApparence: function () {
      return accessibilitytoolbar.make(["div", {id:"uci_contenu_onglet_apparence", "class":"uci_contenu_onglet cdu_c", role:"tabpanel"},
          ["div", {"class":"uci_onglet_div margin-left margin-right-lg"},
            ["div", {id:"uci_div_alignement_gauche"},
              ["input", {type:"checkbox", value:"left", name:"a11yLeftText", id:"a11yLeftText", checked:accessibilitytoolbar.userPref.get("a11yLeftText") === "left" ? "checked" : false}],
              ["label", {"for":"a11yLeftText"}, accessibilitytoolbar.get('uci_label_alignleft')]
            ],
            ["div", {id:"uci_div_numero_ligne"},
              ["input", {type:"checkbox", value:"decimal", name:"a11yNumerotationList", id:"a11yNumerotationList", checked:accessibilitytoolbar.userPref.get("a11yNumerotationList") === "decimal" ? "checked" : false}],
              ["label", {"for":"a11yNumerotationList"}, accessibilitytoolbar.get('uci_label_putnumonlist')]
            ],
            ["div", {id:"uci_div_apparence_liens"},
              ["input", {type:"checkbox", value:"true", name:"a11yNavLienEnabled", id:"a11yNavLienEnabled", checked:accessibilitytoolbar.userPref.get("a11yNavLienEnabled") === "true" ? "checked" : false}],
              ["label", {"for":"a11yNavLienEnabled"}, accessibilitytoolbar.get('uci_titre_links')],
              accessibilitytoolbar.makeHelpTpl("uci_link_help_links","uci_help_links",accessibilitytoolbar.get('uci_help_links'))
            ],
            ["div", {id:"uci_gestion_lien", style:(accessibilitytoolbar.userPref.get("a11yNavLienEnabled")=== "true" ? "display:block" : "display:none")},
              ["div", {id:"uci_div_lien_selectionne"},
                ["span", {"class":"uci_span_lien cdu_c"}, accessibilitytoolbar.get('uci_txt_active')],
                ["div", {"class":"cdu_left"},
                  ["select", {"class":"uci_select_lien", name:"a11yNavLienSelStyle", id:"a11yNavLienSelStyle", title:accessibilitytoolbar.get("uci_title_link_active_render")},
                    ["option", {value:"keepit", selected:accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "keepit" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_default')],
                    ["option", {value:"underline", selected:accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "underline" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_underline')],
                    ["option", {value:"border", selected:accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "border" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_border')],
                    ["option", {value:"bold", selected:accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "bold" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_bold')]            
                  ]
                ],
                ["div", {"class":"cdu_left"},
                  ["a", {href:"#", id:"uci_NavLienSel", "class":"uci_inline uci_couleur_li", title:accessibilitytoolbar.get('uci_title_link_active_color')},
                    ["span", {"class":"cdu_color", "aria-hidden":"true", style:"background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienSelColor")+"!important"},"\u00a0"],
                    ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_title_link_active_color')]
                  ],
                  ["div", {"class":"uci_span_help_bulle", id:"uci_palette_couleur_lien_selectionne", style:"display:none"},
                    accessibilitytoolbar.makeCouleurTpl("uci_table_couleur cdu_c","uci_a11yNavLienSelColor_",accessibilitytoolbar.userPref.get("a11yNavLienSelColor"),"uci_reponses_couleur_lien_sel","uci_NavLienSel")
                  ]
                ]
              ],
              ["div", {id:"uci_div_lien_notselectionne"},
                ["span", {"class":"uci_span_lien cdu_c"}, accessibilitytoolbar.get('uci_txt_notvisited')],
                ["div", {"class":"cdu_left"},
                  ["select", {"class":"uci_select_lien", name:"a11yNavLienNonVisStyle", id:"a11yNavLienNonVisStyle", title:accessibilitytoolbar.get("uci_title_link_notvisited_render")},
                    ["option", {value:"keepit", selected:accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "keepit" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_default')],
                    ["option", {value:"underline", selected:accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "underline" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_underline')],
                    ["option", {value:"border", selected:accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "border" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_border')],
                    ["option", {value:"bold", selected:accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "bold" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_bold')]            
                  ]
                ],
                ["div", {"class":"cdu_left"},
                  ["a", {href:"#", id:"uci_NavLienNonVis", "class":"uci_inline uci_couleur_li", title:accessibilitytoolbar.get('uci_title_link_notvisited_color')},
                    ["span", {"class":"cdu_color", "aria-hidden":"true", style:"background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienSelColor")+"!important"},"\u00a0"],
                    ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_title_link_notvisited_color')]
                  ],
                  ["div", {"class":"uci_span_help_bulle", id:"uci_palette_couleur_lien_notselectionne", style:"display:none"},
                    accessibilitytoolbar.makeCouleurTpl("uci_table_couleur cdu_c","uci_a11yNavLienNonVisColor_",accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor"),"uci_reponses_couleur_lien_notsel","uci_NavLienNonVis")
                  ]
                ]
              ],
              ["div", {id:"uci_div_lien_visite"},
                ["span", {"class":"uci_span_lien cdu_c"}, accessibilitytoolbar.get('uci_txt_visited')],
                ["div", {"class":"cdu_left"},
                  ["select", {"class":"uci_select_lien", name:"a11yNavLienVisStyle", id:"a11yNavLienVisStyle", title:accessibilitytoolbar.get("uci_title_link_visited_render")},
                    ["option", {value:"keepit", selected:accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "keepit" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_default')],
                    ["option", {value:"underline", selected:accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "underline" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_underline')],
                    ["option", {value:"border", selected:accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "border" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_border')],
                    ["option", {value:"bold", selected:accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "bold" ? "selected": false}, accessibilitytoolbar.get('uci_link_render_options_bold')]            
                  ]
                ],
                ["div", {"class":"cdu_left"},
                  ["a", {href:"#", id:"uci_NavLienVis", "class":"uci_inline uci_couleur_li", title:accessibilitytoolbar.get('uci_title_link_visited_color')},
                    ["span", {"class":"cdu_color", "aria-hidden":"true", style:"background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienSelColor")+"!important"},"\u00a0"],
                    ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_title_link_visited_color')]
                  ],
                  ["div", {"class":"uci_span_help_bulle", id:"uci_palette_couleur_lien_visite", style:"display:none"},
                    accessibilitytoolbar.makeCouleurTpl("uci_table_couleur cdu_c","uci_a11yNavLienVisColor_",accessibilitytoolbar.userPref.get("a11yNavLienVisColor"),"uci_reponses_couleur_lien_visite","uci_NavLienVis")
                  ]
                ]
              ]
            ]
          ],
          ["div", {"class":"uci_onglet_div margin-left-lg margin-right"},
          // Line spacing
            ["div", {"class":"uci_aria_button_group cdu_c uci_clear"},
              ["span", {"class":"cdu_left uci_label", id:"uci_typo_spacement_line_aria_label"},accessibilitytoolbar.get('uci_typo_titre_linespacing')],
              ["ul", {"class":"uci_liste_bton",id:"uci_reponses_linespacement",role:"radiogroup", "aria-labelledby":"uci_typo_spacement_line_aria_label"},
                ["li", 
                  {id:"uci_a11yLineSpacement_keepit",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_linespacing_radio_normal')
                  },
                  accessibilitytoolbar.get('uci_radio_default')
                ],
                ["li", 
                  {id:"uci_a11yLineSpacement_2",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_linespacing_radio_medium')
                  },
                  accessibilitytoolbar.get('uci_radio_medium')
                ],
                ["li", 
                  {id:"uci_a11yLineSpacement_3",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_linespacing_radio_large')
                  },
                  accessibilitytoolbar.get('uci_radio_large')
                ]
              ]
            ],
            // Wording espacement
            ["div", {id:"uci_typo_espacement_mot", "class":"uci_aria_button_group cdu_c uci_clear"},
              ["span", {"class":"cdu_left uci_label", id:"uci_espacement_word_aria_label"},accessibilitytoolbar.get('uci_typo_titre_wordspacing')],
              ["ul", {"class":"uci_liste_bton",id:"uci_reponses_wordspacing",role:"radiogroup", "aria-labelledby":"uci_espacement_word_aria_label"},
                ["li", 
                  {id:"uci_a11ySpacement_keepit",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_wordspacing_radio_normal')
                  },
                  accessibilitytoolbar.get('uci_radio_default')
                ],
                ["li", 
                  {id:"uci_a11ySpacement_0.5",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_wordspacing_radio_medium')
                  },
                  accessibilitytoolbar.get('uci_radio_medium')
                ],
                ["li", 
                  {id:"uci_a11ySpacement_1",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_wordspacing_radio_large')
                  },
                  accessibilitytoolbar.get('uci_radio_large')
                ]
              ]
            ],
            ["div", {id:"uci_mask_enabled"},
              ["input", {type:"checkbox", value:"true", name:"a11yMaskEnabled", id:"a11yMaskEnabled", checked:accessibilitytoolbar.userPref.get("a11yMaskEnabled") === "true" ? "checked" : false}],
              ["label", {"for":"a11yMaskEnabled"}, accessibilitytoolbar.get('uci_label_mask')]
            ],
            ["div", {id:"uci_div_mask", style:(accessibilitytoolbar.userPref.get("a11yMaskEnabled")=== "true" ? "display:block" : "display:none")},
              ["div", {id:"uci_mask_epaisseur"},
                ["span", {id:"uci_title_epaisseur_mask","class":"margin-top cdu_left"}, accessibilitytoolbar.get('uci_txt_mask_opacity')],
                ["ul", {"class":"uci_liste_bton",id:"uci_reponses_epaisseurmask",role:"radiogroup", "aria-labelledby":"uci_title_epaisseur_mask"},
                  ["li", 
                    {id:"uci_a11yMaskEpaisseur_medium",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "medium" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "medium" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "medium" ? "true" : "false",
                    },
                    accessibilitytoolbar.get('uci_radio_light')
                  ], 
                  ["li", 
                    {id:"uci_a11yMaskEpaisseur_thin",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thin" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thin" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thin" ? "true" : "false",
                    },
                    accessibilitytoolbar.get('uci_radio_medium1')
                  ],
                  ["li", 
                    {id:"uci_a11yMaskEpaisseur_thick",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thick" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thick" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thick" ? "true" : "false",
                    },
                    accessibilitytoolbar.get('uci_radio_dark')
                  ]
                ]
              ]
            ]
          ]
        ]);
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