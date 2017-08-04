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
 * @classdesc Cette classe permettra d'implémenter l'onglet typographie
 */
/*global window */
/*global document: false */
/* global alert */
UciTypographie = {
    /*
     * @constructor
     */
    InitUciTypographie: function () {      
      return accessibilitytoolbar.make(["div", {id:"uci_contenu_onglet_typographie", "class":"uci_contenu_onglet cdu_c", role:"tabpanel", style:"display:block"},
          ["div", {"class":"uci_onglet_div margin-left margin-right-lg cdu_c"},
          // font size
            ["div", {"class":"uci_aria_button_group cdu_c"},
              ["div", {"class":"cdu_left uci_label"},accessibilitytoolbar.get('uci_typo_titre_fontsize')],
              ["div", { "class": "uci_liste_bton", id: "uci_reponses_bigger"},
                ["input",
                  {
                    id: "uci_a11yBigger_less",
                    type: "button",
                    "class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary",
                    title: accessibilitytoolbar.get('uci_title_fontsize_radio_medium'),
                    value: "A-",
                    "disabled": (accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? 'disabled' : '')
                  }
                ],
                ["input",
                  {
                    id: "uci_a11yBigger_more",
                    type: "button",
                    "class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary",
                    title: accessibilitytoolbar.get('uci_title_fontsize_radio_large'),
                    value: "A+",
                    "disabled": (accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? 'disabled' : '')
                  }
                ]
              ]
            ],

            
          ],

          ["div", {"class":"uci_onglet_div margin-left-lg margin-right-lg cdu_c"},
          // font family
            ["div", {"class":"uci_aria_button_group cdu_c"},
              ["span", {id:"uci_title_typographie", "class":"cdu_left uci_label"},accessibilitytoolbar.get('uci_typo_titre_fontfamily'),
                accessibilitytoolbar.makeHelpTpl("uci_link_help_fontfamily","uci_typo_help_fontfamily",accessibilitytoolbar.get('uci_typo_help_fontfamily'))
              ],
              ["ul", {"class":"uci_liste_bton",id:"uci_reponses_fontfamily",role:"radiogroup","aria-labelledby":"uci_title_typographie"},
                ["li", {id:"uci_a11yDyslexyFont_keepit",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "keepit" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "keepit" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "keepit" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_fontfamily_radio_normal')
                  }, 
                  accessibilitytoolbar.get('uci_radio_default')
                ],
                ["li", 
                  {id:"uci_a11yDyslexyFont_arial",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "arial" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "arial" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "arial" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_fontfamily_radio_arial')
                  },
                  "Arial"
                ],
                ["li", 
                  {id:"uci_a11yDyslexyFont_opendyslexic",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "opendyslexic" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "opendyslexic" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "opendyslexic" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_fontfamily_radio_opendys')
                  },
                  "Open Dyslexic"
                ]
              ]
            ],

            
          ],

          ["div", {"class":"uci_onglet_div margin-left-lg margin-right cdu_c"},
            // font family
            ["div", {"class":"uci_aria_button_group cdu_c"},
              ["span", {id:"uci_fieldset_changecasse", "class":"cdu_left uci_label"},accessibilitytoolbar.get('uci_typo_titre_changecase'),
                accessibilitytoolbar.makeHelpTpl("uci_link_help_changecase","uci_typo_help_changecase",accessibilitytoolbar.get('uci_typo_help_changecase'))
              ],
              ["ul", {"class":"uci_liste_bton",id:"uci_reponses_changecasse",role:"radiogroup","aria-labelledby":"uci_fieldset_changecasse"},
                ["li", {id:"uci_a11yModifCasse_keepit",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "keepit" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yModifCasse") === "keepit" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yModifCasse") === "keepit" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_changecase_normal_title')
                  }, 
                  accessibilitytoolbar.get('uci_radio_default')
                ],
                ["li", 
                  {id:"uci_a11yModifCasse_capitalize",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "capitalize" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yModifCasse") === "capitalize" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yModifCasse") === "capitalize" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_changecase_firstlettre_title')
                  },
                  accessibilitytoolbar.get('uci_changecase_firstlettre')
                ],
                ["li", 
                  {id:"uci_a11yModifCasse_lowercase",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "lowercase" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yModifCasse") === "lowercase" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yModifCasse") === "lowercase" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_changecase_tolower_title')
                  },
                  accessibilitytoolbar.get('uci_changecase_tolower')
                ],
                ["li", 
                  {id:"uci_a11yModifCasse_uppercase",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "uppercase" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yModifCasse") === "uppercase" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yModifCasse") === "uppercase" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_changecase_uppercase_title')
                  },
                  accessibilitytoolbar.get('uci_changecase_uppercase')
                ]
              ]
            ]
          ]
        ]);       
    },

    displayFieldset: function (id) {
        if (document.getElementById(id).style.display === "none") {
            document.getElementById(id).style.display = "block";
        } else {
            document.getElementById(id).style.display = "none";
        }
    }
    
    


}