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

    InitUciApparence: function () {
      return accessibilitytoolbar.make(["div", {id:"uci_contenu_onglet_apparence", "class":"uci_contenu_onglet cdu_c", role:"tabpanel"},
          ["div", {id:"uci_apparence_div_left"},
            ["div", {id:"uci_div_supprimer_miseenpage"},
              ["input", {type:"checkbox", value:"true", name:"a11yLinearize", id:"a11yLinearize", checked:accessibilitytoolbar.userPref.get("a11yLinearize") === "true" ? "checked" : false}],
              ["label", {"for":"a11yLinearize"}, accessibilitytoolbar.get('uci_label_listmode')],
              accessibilitytoolbar.makeHelpTpl("uci_link_help_listmode","uci_help_listmode",accessibilitytoolbar.get('uci_help_listmode'))
            ],
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
          ["div", {id:"uci_apparence_div_right"},
            ["div", {id:"uci_div_desactiver_transparence"},
              ["input", {type:"checkbox", value:"1", name:"a11ySupEffetTransp", id:"a11ySupEffetTransp", checked:accessibilitytoolbar.userPref.get("a11ySupEffetTransp") === "1" ? "checked" : false}],
              ["label", {"for":"a11ySupEffetTransp"}, accessibilitytoolbar.get('uci_label_disabletransp')],
              accessibilitytoolbar.makeHelpTpl("uci_link_help_disabletransp","uci_help_disabletransp",accessibilitytoolbar.get('uci_help_disabletransp'))
            ],
            ["div", {id:"uci_div_disabled_fond_picture"},
              ["input", {type:"checkbox", value:"true", name:"a11ySupImageFont", id:"a11ySupImageFont", checked:accessibilitytoolbar.userPref.get("a11ySupImageFont") === "true" ? "checked" : false}],
              ["label", {"for":"a11ySupImageFont"}, accessibilitytoolbar.get('uci_label_disablebgpictures')]
            ],
            ["div", {id:"uci_div_disabled_first_plan_picture"},
              ["input", {type:"checkbox", value:"true", name:"a11ySupImageFirstPlan", id:"a11ySupImageFirstPlan", checked:accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") === "true" ? "checked" : false}],
              ["label", {"for":"a11ySupImageFirstPlan"}, accessibilitytoolbar.get('uci_label_disablepppictures')],
              accessibilitytoolbar.makeHelpTpl("uci_link_help_disablepppictures","uci_help_disablepppictures",accessibilitytoolbar.get('uci_help_disablepppictures'))
            ],
            ["div", {id:"uci_mask_enabled"},
              ["input", {type:"checkbox", value:"true", name:"a11yMaskEnabled", id:"a11yMaskEnabled", checked:accessibilitytoolbar.userPref.get("a11yMaskEnabled") === "true" ? "checked" : false}],
              ["label", {"for":"a11yMaskEnabled"}, accessibilitytoolbar.get('uci_label_mask')]
            ],
            ["div", {id:"uci_div_mask", style:(accessibilitytoolbar.userPref.get("a11yMaskEnabled")=== "true" ? "display:block" : "display:none")},
              ["div", {id:"uci_mask_epaisseur"},
                ["span", {id:"uci_title_epaisseur_mask","class":"margin-top cdu_left"}, accessibilitytoolbar.get('uci_txt_mask_size')],
                ["ul", {"class":"uci_liste_bton",id:"uci_reponses_epaisseurmask",role:"radiogroup", "aria-labelledby":"uci_title_epaisseur_mask"},
                  ["li", 
                    {id:"uci_a11yMaskEpaisseur_thin",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thin" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thin" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thin" ? "true" : "false",
                    },
                    accessibilitytoolbar.get('uci_radio_default')
                  ],
                  ["li", 
                    {id:"uci_a11yMaskEpaisseur_medium",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "medium" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "medium" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "medium" ? "true" : "false",
                    },
                    accessibilitytoolbar.get('uci_radio_medium')
                  ],
                  ["li", 
                    {id:"uci_a11yMaskEpaisseur_thick",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thick" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thick" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yMaskEpaisseur") === "thick" ? "true" : "false",
                    },
                    accessibilitytoolbar.get('uci_radio_large')
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