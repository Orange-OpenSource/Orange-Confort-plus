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
 * @classdesc Cette classe permettra d'implémenter l'onglet aide motrice
 * @property {string}  attr_aide_motrice : the string containt hinner html for aide motrice.
 */
/*global window */
/*global document: false */
/* global alert */
UciAideMotrice = {
    /**
     * @property
     * @private
     */
    attr_aide_motrice: "",
    attr_onglet: "",
    attr_aide_motrice: "",
    /*
     * @constructor
     */
    InitUciAideMotrice: function () {
        return accessibilitytoolbar.make(["div", {id:"uci_contenu_onglet_aidemotrice", "class":"uci_contenu_onglet cdu_c", role:"tabpanel"},
          ["div",{"class":"padding-left margin-top-lg uci_w50-left"},
            // jump to content
            ["input", {type:"checkbox", name:"a11yJumpToContent", id:"a11yJumpToContent", value:"true", checked:accessibilitytoolbar.userPref.get("a11yJumpToContent") === "true" ? "checked" : false}],
            ["label", {"for":"a11yJumpToContent"},accessibilitytoolbar.get('uci_label_jumptocontent')],
            ["p", {"class":"font-normal padding-left-align margin-top margin-right-lg"}, accessibilitytoolbar.get('uci_help_jumptocontent')],
            // Pointed nav
            ["input", {type:"checkbox", name:"a11yMotorModeRemote", id:"a11yMotorModeRemote", value:"true", checked: accessibilitytoolbar.userPref.get("a11yMotorModeRemote") === "true" ? "checked" : false}],
            ["label", {"for":"a11yMotorModeRemote","class":"margin-top-lg"},accessibilitytoolbar.get('uci_label_telecomande')],
            ["div", {id:"uci_motor_mode", "class":"padding-left-align setting-sub-container"},
              ["p",{"class":"font-normal margin-right-lg margin-top"},accessibilitytoolbar.get('uci_help_telecomande')],
            // delay before clic option
              ["p",{id:"a11yDelayBeforeClick0", "class":"margin-top"}, accessibilitytoolbar.get('uci_legend_delai_clic')],
              ["ul",{"class":"uci_liste_bton margin-top-sm", id:"uci_reponses_DelayBeforeLoop", role:"radiogroup", "aria-labelledby":"a11yDelayBeforeClick0"},
                ["li", 
                  {id:"uci_a11yDelayBeforeClick_1", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "1" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "1" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "1" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_1sec')
                ],
                ["li", 
                  {id:"uci_a11yDelayBeforeClick_2", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "2" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "2" ? "0" : "-1",
                  "aria-checked": accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "2" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_2sec')
                ],
                ["li", 
                  {id:"uci_a11yDelayBeforeClick_3", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "3" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "3" ? "0" : "-1",
                  "aria-checked": accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "3" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_3sec')
                ],
                ["li", 
                  {id:"uci_a11yDelayBeforeClick_6", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "6" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "6" ? "0" : "-1",
                  "aria-checked": accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "6" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_6sec')
                ],
              ]
            ]
          ],
          // automatic mode 
          ["div",{"class":"margin-top-lg uci_w50-left"},            
            ["input", {type:"checkbox", name:"a11yMotorModeLooping", id:"a11yMotorModeLooping", value:"true", checked: accessibilitytoolbar.userPref.get("a11yMotorModeLooping") === "true" ? "checked" : false}],
            ["label", {"for":"a11yMotorModeLooping"},accessibilitytoolbar.get('uci_label_automove')],
            ["div", {"class":"padding-left-align"},
              ["p",{"class":"font-normal margin-top"},accessibilitytoolbar.get('uci_help_automove')],
              // menu position
              ["p",{id:"a11yMenuPositionning", "class":"uci_clear margin-top"}, accessibilitytoolbar.get('uci_legend_menupos')],
              ["ul",{"class":"uci_liste_bton margin-top-sm margin-bottom", id:"uci_reponses_a11yMenuPositionning", role:"radiogroup", "aria-labelledby":"a11yMenuPositionning"},
                ["li", 
                  {id:"uci_a11yMenuPositionning_center", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "center" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "center" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "center" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_centeredmenu')
                ],
                ["li", 
                  {id:"uci_a11yMenuPositionning_nextto", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "nextto" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "nextto" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "nextto" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_nearelemtmenu')
                ]
              ],
              // loop speed
              ["p",{id:"a11yDelayBeforeLoop", "class":"uci_clear margin-top"}, accessibilitytoolbar.get('uci_legend_time_before_sel')],
              ["ul",{"class":"uci_liste_bton margin-top-sm margin-bottom", id:"uci_reponses_DelayBeforeLoop_auto", role:"radiogroup", "aria-labelledby":"a11yDelayBeforeLoop"},
                ["li", 
                  {id:"uci_a11yDelayBeforeLoop_1", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "1" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "1" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "1" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_1sec')
                ],
                ["li", 
                  {id:"uci_a11yDelayBeforeLoop_2", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "2" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "2" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "2" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_2sec')
                ],
                ["li", 
                  {id:"uci_a11yDelayBeforeLoop_3", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "3" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "3" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "3" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_3sec')
                ],
                ["li", 
                  {id:"uci_a11yDelayBeforeLoop_6", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "6" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "6" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "6" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_6sec')
                ]
              ],
              // quick step value
              ["p",{id:"a11yQuickMode", "class":"uci_clear margin-top"}, accessibilitytoolbar.get('uci_legend_pasquickmode')],
              ["p",{"class": "font-normal margin-top-sm"},accessibilitytoolbar.get('uci_help_quickmode')],
              ["ul",{"class":"uci_liste_bton margin-top-sm margin-bottom", id:"uci_reponses_a11yQuickMode", role:"radiogroup", "aria-labelledby":"a11yQuickMode"},
                ["li", 
                  {id:"uci_a11yQuickMode_2", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "2" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yQuickMode") === "2" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yQuickMode") === "2" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_2par2')
                ],
                ["li", 
                  {id:"uci_a11yQuickMode_5", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "5" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yQuickMode") === "5" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yQuickMode") === "5" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_5par5')
                ],
                ["li", 
                  {id:"uci_a11yQuickMode_10", 
                  role:"radio", 
                  "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "10" ? "active" : ""), 
                  tabindex:accessibilitytoolbar.userPref.get("a11yQuickMode") === "10" ? "0" : "-1",
                  "aria-checked":accessibilitytoolbar.userPref.get("a11yQuickMode") === "10" ? "true" : "false"
                  },
                  accessibilitytoolbar.get('uci_label_10par10')
                ],
              ]
            ]
          ]
        ]);        
    }

}