/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014 - 2019  Orange SA

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
 * @classdesc Cette classe permettra d'implémenter l'onglet settings
 */
/*global window */
/*global document: false */
/* global alert */
UciSettings = {
    /*
     * @constructor init
     */
    FreezeGifOption: function() {
      if(accessibilitytoolbar.getCompatible('a11ySupGif')) {
        return accessibilitytoolbar.make(["div", {"class":"uci_onglet_div margin-left margin-right cdu_c"},
          ["div", {id:"uci_div_disabled_gif"},
            ["input", {type:"checkbox", value:"true", name:"a11ySupGif", id:"a11ySupGif", checked:accessibilitytoolbar.userPref.get("a11ySupGif") === "true" ? "checked" : false}],
            ["label", {"for":"a11ySupGif"}, accessibilitytoolbar.get('uci_label_disablegif')],
            accessibilitytoolbar.makeHelpTpl("uci_link_help_disablegif","uci_help_disablegif",accessibilitytoolbar.get('uci_help_disablegif'))
          ],
          ["div", {id:"uci_div_disabled_video"},
            ["input", {type:"checkbox", value:"true", name:"a11yPauseVideo", id:"a11yPauseVideo", checked:accessibilitytoolbar.userPref.get("a11yPauseVideo") === "true" ? "checked" : false}],
            ["label", {"for":"a11yPauseVideo"}, accessibilitytoolbar.get('uci_label_disablevideo')]
          ]
        ]
        )
      } else {
        return accessibilitytoolbar.make(["div", {"class":"uci_onglet_div margin-left margin-right cdu_c"},
          ["div", {id:"uci_div_disabled_video"},
            ["input", {type:"checkbox", value:"true", name:"a11yPauseVideo", id:"a11yPauseVideo", checked:accessibilitytoolbar.userPref.get("a11yPauseVideo") === "true" ? "checked" : false}],
            ["label", {"for":"a11yPauseVideo"}, accessibilitytoolbar.get('uci_label_disablevideo')]
          ]
        ]
        )
      }
    },

    InitUciSettings: function () {
      return accessibilitytoolbar.make(["div", {id:"uci_contenu_onglet_settings", "class":"uci_contenu_onglet cdu_c", role:"tabpanel"},
          ["div", {"class":"uci_onglet_div margin-left margin-right-xlg cdu_c"},
            ["div", {id:"uci_div_supprimer_miseenpage"},
              ["input", {type:"checkbox", value:"true", name:"a11yLinearize", id:"a11yLinearize", checked:accessibilitytoolbar.userPref.get("a11yLinearize") === "true" ? "checked" : false}],
              ["label", {"for":"a11yLinearize"}, accessibilitytoolbar.get('uci_label_listmode')],
              accessibilitytoolbar.makeHelpTpl("uci_link_help_listmode","uci_help_listmode",accessibilitytoolbar.get('uci_help_listmode'))
            ],
            ["div", {id:"uci_div_desactiver_transparence"},
              ["input", {type:"checkbox", value:"1", name:"a11ySupEffetTransp", id:"a11ySupEffetTransp", checked:accessibilitytoolbar.userPref.get("a11ySupEffetTransp") === "1" ? "checked" : false}],
              ["label", {"for":"a11ySupEffetTransp"}, accessibilitytoolbar.get('uci_label_disabletransp')],
              accessibilitytoolbar.makeHelpTpl("uci_link_help_disabletransp","uci_help_disabletransp",accessibilitytoolbar.get('uci_help_disabletransp'))
            ]
          ],
          ["div", {"class":"uci_onglet_div margin-left margin-right-xlg cdu_c"},
            ["div", {id:"uci_div_disabled_fond_picture"},
              ["input", {type:"checkbox", value:"true", name:"a11ySupImageFont", id:"a11ySupImageFont", checked:accessibilitytoolbar.userPref.get("a11ySupImageFont") === "true" ? "checked" : false}],
              ["label", {"for":"a11ySupImageFont"}, accessibilitytoolbar.get('uci_label_disablebgpictures')]
            ],
            ["div", {id:"uci_div_disabled_first_plan_picture"},
              ["input", {type:"checkbox", value:"true", name:"a11ySupImageFirstPlan", id:"a11ySupImageFirstPlan", checked:accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") === "true" ? "checked" : false}],
              ["label", {"for":"a11ySupImageFirstPlan"}, accessibilitytoolbar.get('uci_label_disablepppictures')],
              accessibilitytoolbar.makeHelpTpl("uci_link_help_disablepppictures","uci_help_disablepppictures",accessibilitytoolbar.get('uci_help_disablepppictures'))
            ]
          ],
          this.FreezeGifOption()
        ]);
    }
}