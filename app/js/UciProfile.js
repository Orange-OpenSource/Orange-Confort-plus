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
 * @class Help
 * @classdesc Cette classe permettra d'implémenter l'onglet Help
 */
/*global window */
/*global document: false */
/* global alert */
UciProfile = {
  /*
  * @property
  * @private
   */

  /*
   * @constructor
   */
    InitUciProfile: function () {
      return accessibilitytoolbar.make(["div",
         UciProfile.UciSavedProfile(),
        ["span","profils predefinis"],
        ["ul",
          ["li",{class: "uci_menu_ouverture_aide"}, 
            ["input", { type: "radio", name: "example", "checked": "true", id: "uci_profile_none" }],
            ["label", { "class":"labelcolor","for": "uci_profile_none" }, "Aucun profile"]
          ],
          ["li",{class: "uci_menu_ouverture_aide"},
            ["input", { type: "radio", name: "example", "checked": "false", id: "uci_profile_reading" }],
            ["label", { "class":"labelcolor","for": "uci_profile_reading" }, "Ameliorer la lisibilite"],
          ],
          ["li",{class: "uci_menu_ouverture_aide"},
            ["input", { type: "radio", name: "example", "checked": "false", id: "uci_profile_layout" }],
            ["label", { "class":"labelcolor","for": "uci_profile_layout" }, "Modifier la mise en page"],
          ],
          ["li",{class: "uci_menu_ouverture_aide"},
            ["input", { type: "radio", name: "example", "checked": "false", id: "uci_profile_move" }],
            ["label", { "class":"labelcolor","for": "uci_profile_move" }, "Aide motrice"],
          ],
        ]
      
    ])
  },
  uci_show_profile: function(){
    document.getElementById("uci_cdu_profile").style.display = "block";
  },

  UciSavedProfile: function (params) {
    var returnSavedProfile = "";
    var tableauProfile = ["ul", {"class":"toto", id:"ulId", role:"radiogroup", "aria-labelledby":"idLabel"}];
    for (i=0; i < 3; i++){
      returnSavedProfile = ["li",{class: "uci_menu_ouverture_aide"},
                              ["input", {type: "radio", name: "example", "checked": "true", id: "uci_profile"+i }],
                              ["label", {"class":"labelcolor", "for": "uci_profile"+i }, "Toto"]
                          ];
      tableauProfile.push(returnSavedProfile);
    }
    console.log(tableauProfile);
    return tableauProfile;
  }
}
