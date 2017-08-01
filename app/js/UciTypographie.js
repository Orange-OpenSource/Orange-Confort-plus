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
    * @property
    * @private
     */
    attr_typography: "",
    /*
     * @constructor
     */
    InitUciTypographie: function () {      
      return accessibilitytoolbar.make(["div", {id:"uci_contenu_onglet_typographie", "class":"uci_contenu_onglet cdu_c", role:"tabpanel", style:"display:block"},
          ["div", {id:"uci_typo_div_left","class":"cdu_c"},
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
            ]
          ],

          ["div", {id:"uci_typo_div_centre","class":"cdu_c"},
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
            ]
          ],

          ["div", {id:"uci_typo_div_right","class":"cdu_c"},
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
                ]
              ]
            ],
 
            // char spacing
            ["div", {"class":"uci_aria_button_group cdu_c uci_clear"},
              ["span", {"class":"cdu_left uci_label", id:"uci_typo_font_caractere"},accessibilitytoolbar.get('uci_typo_titre_charspacing')],
              ["ul", {"class":"uci_liste_bton",id:"uci_reponses_charspacing",role:"radiogroup", "aria-labelledby":"uci_typo_font_caractere"},
                ["li", 
                  {id:"uci_a11yCharSpacement_keepit",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_charspacing_radio_normal')
                  },
                  accessibilitytoolbar.get('uci_radio_default')
                ],
                ["li", 
                  {id:"uci_a11yCharSpacement_0.2",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "0.2" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yLineSpacement") === "0.2" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yLineSpacement") === "0.2" ? "true" : "false",
                    title:accessibilitytoolbar.get('uci_title_charspacing_radio_medium')
                  },
                  accessibilitytoolbar.get('uci_radio_medium')
                ],
                ["li", 
                  {id:"uci_a11yCharSpacement_0.5",
                    role:"radio",
                    "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "0.5" ? "active": ""),
                    tabindex:accessibilitytoolbar.userPref.get("a11yLineSpacement") === "0.5" ? "0" : "-1",
                    "aria-checked":accessibilitytoolbar.userPref.get("a11yLineSpacement") === "0.5" ? "true" : "false",                    
                    title:accessibilitytoolbar.get('uci_title_charspacing_radio_large')
                  },
                  accessibilitytoolbar.get('uci_radio_large')
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