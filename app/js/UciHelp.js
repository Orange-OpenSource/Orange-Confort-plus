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
UciHelp = {
  /*
  * @property
  * @private
   */
   /*
    * @constructor
    */
   InitUciHelp: function () {
      return accessibilitytoolbar.make(["div", {id:"uci_main_popin_help", "class":"uci-main-popin-help", style:"display:block"},
          ["div", {id:"uci_popin_content", "class":"uci-popin-content"},
            ["div", {id: "uci_popin_header", "class":"uci-popin-header"},
              ["span", {id:"uci_help_title", "class":"uci-popin-title"}, "Guide pas à pas"],
              ["button", {id:"uci_help_close","type":"button", "class":"cdu-icon-croix ucibtn-secondary uci-popin-btn"}]
            ],
            ["div", {id: "uci_popin_body", "class": "uci-popin-body"},
              ["div", {id: "uci_popin_discover", "class": "uci-popin-discover"},
                  ["span", {id: "uci_popin_discover_icon", "class": "uci-popin-discover-icon"}],
                  ["span", {id: "uci_popin_discover_text", "class": "uci-popin-discover-text"}, "Découvrir le service"]
              ],
              ["div", {id: "uci_popin_read", "class": "uci-popin-read"},
                ["div", {id: "uci_popin_read_icon", "class": "uci-popin-read-icon"}],
                ["div", {id: "uci_popin_read_text", "class": "uci-popin-read-text"}, "Améliorer la lisibilité"]
              ],
              ["div", {id: "uci_popin_layout", "class": "uci-popin-layout"},
                ["div", {id: "uci_popin_layout_icon", "class": "uci-popin-layout-icon"}],
                ["div", {id: "uci_popin_layout_text", "class": "uci-popin-layout-text"}, "Modifier la mise en page"]
              ],
              ["div", {id: "uci_popin_motor", "class": "uci-popin-motor"},
                ["div", {id: "uci_popin_motor_icon", "class": "uci-popin-motor-icon"}],
                ["div", {id: "uci_popin_motor_text", "class": "uci-popin-motor-text"}, "Utiliser l'aide motrice"]
              ],
              ["div", {id: "uci_popin_buttom", "class": "uci-popin-buttom"},
                ["button", {id: "uci_popin_button", "type":"button", "class": "uci-popin-button ucibtn-secondary"}, "exit"]
              ]
            ]
          ]          
        ])
   },
   InitUciDiscover: function (){
    return accessibilitytoolbar.make(["div", {id:"uci_discover", "class":"uci-discover", style:"display:none;"},
        ["div", {id:"uci_discover_content", "class":"uci-discover-content"},
          ["div", {id: "uci_discover_header", "class":"uci-discover-header"},
            ["span", {id:"uci_discover_title", "class":"uci-discover-title"}, "Découvrir le service"],
            ["button", {id:"uci_discover_close","type":"button", "class":"cdu-icon-croix ucibtn-secondary uci-popin-btn"}]
          ],
          ["div", {id: "uci_discover_body", "class": "uci-discover-body"},
            ["span", {id:"uci_discover_body_text", "class":"uci-discover-body-text"}, accessibilitytoolbar.get('uci_discover_text')],
            ["div", {id:"uci_discover_body_exemple", "class":"uci-discover-body-exemple"}, "Exemples :"],
            ["div", {id:"uci_discover_selection", "class": "uci-discover-selection uci-discover-body-text"},
              ["input", {type:"radio", name:"example", "checked":"true", id:"uci_discover_none"}],
              ["label", {"for":"uci_discover_none"}, "Aucun reglages"],
              ["input", {type:"radio", name:"example", id:"uci_discover_reading"}],
              ["label", {"for":"uci_discover_reading"}, "Améliorer la lisibilité"],
              ["input", {type:"radio", name:"example", id:"uci_discover_layout"}],
              ["label", {"for":"uci_discover_layout"}, "Modifier la mise en page"]
            ],
            ["div", {id: "uci_discover_frame", "class":"uci-discover-frame"},
              ["div", {id: "uci_discover_frame_text", "class": "uci-discover-frame-text uci-discover-body-text"}, accessibilitytoolbar.get('uci_discover_lorem')],
              ["div", {id: "uci_discover_frame_image", "class": "uci-discover-frame-image"},
                ["img", {"src":"../images/skully.jpg", "class":"uci-discover-image"}]
              ]
            ]
          ]
        ]
      ])
   },
   show_popin : function(){
     if (document.getElementById("uci_main_popin_help")){
       document.getElementById("uci_cdu_popin").style.display = "block";
     } 
   },
   hide_popin : function(){
     if (document.getElementById("uci_popin_button").style == "block"){
       document.getElementById("uci_cdu_popin").style.display = "none";
     }
     if (document.getElementById("uci_discover").style == "block"){
       document.getElementById("uci_cdu_popin").style.display = "none";
     }
   },
   show_discover : function () {
     if (document.getElementById("uci_main_popin_help")){
       document.getElementById("uci_main_popin_help").style.display = "none";
       document.getElementById("uci_discover").style.display = "block";
     }
   }
}
