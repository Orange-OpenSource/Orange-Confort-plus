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
  tour : {
    reading:{
      text:"reading",
      adcancedparam : "close",
      parentId: "masque_haut_param",
      prev:"",
      next: "reading1"

    },
    reading1: {
      text:"reading1",
      adcancedparam : "close",
      parentId: "masque_haut_param",
      prev:"reading",
      next: "reading2"
    },
    reading2:{
      text:"reading2",
      adcancedparam : "close",
      parentId: "masque_haut_param",
      prev:"reading1",
      next: "advancedparam"
    },
    advancedparam : {
      text:"advancedparam",
      adcancedparam : "close",
      parentId: "masque_haut_param",
      prev:"reading2",
      next: "typographie"
    },
    typographie : {
      text:"typographie",
      adcancedparam : "open",
      parentId: "uci_zone_form",
      prev:"advancedparam",
      next: "apparence"
    },
    apparence : {
      text:"apparence",
      adcancedparam : "isopen",
      parentId: "uci_zone_form",
      prev:"typographie",
      next: "couleur"
    },
    couleur : {
      text:"couleur",
      adcancedparam : "isopen",
      parentId: "uci_zone_form",
      prev:"apparence",
      next: "aidemotrice"
    },
    aidemotrice : {
      text:"aidemotrice",
      adcancedparam : "isopen",
      parentId: "uci_zone_form",
      prev:"couleur",
      next: ""
    }
  },
  /*
   * @constructor
   */
  InitUciHelp: function () {
    return accessibilitytoolbar.make(
      ["div", { id: "uci_main_popin_help", "class": "uci-main-popin-help" },
        ["div", { id: "uci_popin_content", "class": "uci-popin-content" },
          ["div", { id: "uci_popin_header", "class": "uci-popin-header" },
            ["h2", { id: "uci_help_title", "class": "uci-popin-title", "tabindex": "0" }, accessibilitytoolbar.get('uci_menu_guide')],
            ["button", { "class": "ucibtn-secondary uci-popin-btn", id: "uci_help_close", title: accessibilitytoolbar.get('uci_close_guide'), type: "button" },
              ["span", { "aria-hidden": "true", "class": "cdu-icon cdu-icon-croix" }],
              ["span", { "class": "cdu_n" }, accessibilitytoolbar.get('uci_close_guide')]
            ]
          ],
          ["div", { id: "uci_popin_body", "class": "uci-popin-body" },
            ["ul",
              ["li",
                ["a", { id: "uci_popin_discover", href: "#", "class": "uci-popin-li", title: accessibilitytoolbar.get('discover_service') },

                  ["span", { id: "uci_popin_discover_icon", "class": "uci-presentation" }],
                  ["span", { id: "uci_popin_discover_text", "class": "uci-popin-text" }, accessibilitytoolbar.get('discover_service')]
                ]
              ],
              ["li",
                ["a", { id: "uci_popin_read", href: "#", "class": "uci-popin-li", title: accessibilitytoolbar.get('improve_readability') },

                  ["span", { id: "uci_popin_read_icon", "class": "uci-presentation" }],
                  ["span", { id: "uci_popin_read_text", "class": "uci-popin-text" }, accessibilitytoolbar.get('improve_readability')]
                ]
              ],
              ["li",
                ["a", { id: "uci_popin_layout", href: "#", "class": "uci-popin-li", title: accessibilitytoolbar.get('edit_layout') },

                  ["span", { id: "uci_popin_layout_icon", "class": "uci-presentation" }],
                  ["span", { id: "uci_popin_layout_text", "class": "uci-popin-text" }, accessibilitytoolbar.get('edit_layout')]
                ]
              ],
              ["li",
                ["a", { id: "uci_popin_motor", href: "#", "class": "uci-popin-li", title: accessibilitytoolbar.get('use_motor_assistance') },

                  ["span", { id: "uci_popin_motor_icon", "class": "uci-presentation" }],
                  ["span", { id: "uci_popin_motor_text", "class": "uci-popin-text" }, accessibilitytoolbar.get('use_motor_assistance')]
                ]
              ]
            ],
            ["div", { "class": "uci-popin-buttom" },
              ["button", { id: "uci_popin_button", name: "uci_popin_exit", "type": "button", "class": "ucibtn ucibtn-sm ucibtn-secondary uci-popin-button-right" }, accessibilitytoolbar.get('uci_exit')]
            ]
          ]
        ]
      ])
  },
  InitUciDiscover: function () {
    return accessibilitytoolbar.make(["div", { id: "uci_discover", "class": "uci-discover", style: "display:none;" },
      ["div", { id: "uci_discover_content", "class": "uci-discover-content" },
        ["div", { id: "uci_discover_header", "class": "uci-popin-header" },
          ["h2", { id: "uci_discover_title", "class": "uci-popin-title", "tabindex": "0" }, accessibilitytoolbar.get('discover_service')],
          ["button", { "class": "ucibtn-secondary uci-popin-btn", id: "uci_discover_close", title: accessibilitytoolbar.get('uci_close_guide'), type: "button" },
            ["span", { "aria-hidden": "true", "class": "cdu-icon cdu-icon-croix" }],
            ["span", { "class": "cdu_n" }, accessibilitytoolbar.get('uci_close_guide')]
          ]
        ],
        ["div", { id: "uci_discover_body", "class": "uci-discover-body" },
          ["span", { id: "uci_discover_body_text", "class": "uci-discover-body-text" }, accessibilitytoolbar.get('uci_discover_text')],
          ["div", { id: "uci_discover_body_exemple", "class": "uci-discover-body-exemple", "aria-hidden": "true" }, "Exemples :"],
          ["div", { id: "uci_discover_selection", "class": "uci-discover-selection uci-discover-body-text", "aria-hidden": "true" },
            ["input", { type: "radio", name: "example", "checked": "true", id: "uci_discover_none" }],
            ["label", { "for": "uci_discover_none" }, accessibilitytoolbar.get('uci_default')],
            ["input", { type: "radio", name: "example", id: "uci_discover_reading" }],
            ["label", { "for": "uci_discover_reading" }, accessibilitytoolbar.get('improve_readability')],
            ["input", { type: "radio", name: "example", id: "uci_discover_layout" }],
            ["label", { "for": "uci_discover_layout" }, accessibilitytoolbar.get('edit_layout')]
          ],
          ["iframe", { id: "uci_discover_frame", "tabindex": "-1", title: "demo", name: "uci_discover_frame", "class": "uci-discover-frame", src: "../demo_" + accessibilitytoolbar.strings.getLocale().toLowerCase() + ".html" }]
        ],
        ["div", { "class": "uci-popin-buttom" },
          ["button", { id: "uci_popin_menu", name: "uci_popin_menu", "type": "button", "class": "uci-popin-button-left ucibtn-secondary ucibtn ucibtn-sm" }, accessibilitytoolbar.get('uci_menu')],
          ["div", { "class": "uci-buttom-speed" },
            ["button", { id: "uci_popin_read_btn", title: accessibilitytoolbar.get('improve_readability'), name: "uci_popin_menu", "type": "button", "class": "uci-presentation uci-popin-button-left ucibtn-secondary ucibtn ucibtn-sm uci-button_noborder", onclick: "UciHelp.show_reading()" }],
            ["button", { id: "uci_popin_layout_btn", title: accessibilitytoolbar.get('edit_layout'), name: "uci_popin_menu", "type": "button", "class": "uci-presentation uci-popin-button-left ucibtn-secondary ucibtn ucibtn-sm uci-button_noborder", onclick: "UciHelp.show_reading('apparence')" }],
            ["button", { id: "uci_popin_motor_btn", title: accessibilitytoolbar.get('use_motor_assistance'), name: "uci_popin_menu", "type": "button", "class": "uci-presentation uci-popin-button-left ucibtn-secondary ucibtn ucibtn-sm uci-button_noborder", onclick: "UciHelp.show_reading('aidemotrice')" }]
          ],
          ["button", { id: "uci_popin_exit", name: "uci_popin_exit", "type": "button", "class": "uci-popin-button-right ucibtn-secondary ucibtn ucibtn-sm" }, accessibilitytoolbar.get('uci_exit')]
        ]
      ]
    ])
  },
  InitUciReading: function (newName) {
    return accessibilitytoolbar.make(["div", { id: "uci_reading", onkeydown: "UciHelp.navigation_popin(event, 'uci_reading')", name: newName },
      ["div", { id: "triangle" },
        ["div", { "class": "triangle" }]
      ],
      ["div", { id: "uci_reading_content", "class": "uci-popin-content" },
        ["div", { id: "uci_reading_header", "class": "uci-popin-header" },
          ["h2", { id: "uci_reading_title", onkeydown: "UciHelp.navigation_popin(event, 'uci_reading_title')", "class": "uci-popin-title", "tabindex": "0" }, "Réglages rapides"],
          ["button", { id: "uci_reading_close", onclick: "UciHelp.hide_popin()", "type": "button", "class": "cdu-icon-croix ucibtn-secondary uci-popin-btn" }]
        ],
        
        ["div", { id: "uci_reading_body", "class": "uci_reading_body" }, accessibilitytoolbar.get(newName)],
        ["div", { "class": "uci-popin-buttom" },
          ["button", { id: "uci_reading_menu", onclick: "UciHelp.show_menu()", name: "uci_reading_menu", "type": "button", "class": "uci-popin-button-left ucibtn ucibtn-sm ucibtn-secondary" }, accessibilitytoolbar.get('uci_menu')],
          ["button", { id: "uci_reading_move_left", onclick: "UciHelp.changeText('left')", onkeydown: "UciHelp.navigation_popin(event, 'left')", "aria_hidden": "true", title: accessibilitytoolbar.get('uci_previous'), name: "uci_reding_move_Left", "type": "button", "class": "uci-move-left uci-popin-button-left ucibtn ucibtn-sm ucibtn-secondary" },
            ["span", { "aria-hidden": "true" }, "<"],
            ["span", { "class": "cdu_n" }, accessibilitytoolbar.get('uci_previous')]
          ],
          ["button", { id: "uci_reading_move_right", onclick: "UciHelp.changeText('right')", onkeydown: "UciHelp.navigation_popin(event, 'right')",  "aria_hidden": "true", title: accessibilitytoolbar.get('uci_next'), name: "uci_reading_move_right", "type": "button", "class": "uci-move-right uci-popin-button-right ucibtn ucibtn-sm ucibtn-secondary" },
            ["span", { "aria-hidden": "true" }, ">"],
            ["span", { "class": "cdu_n" }, accessibilitytoolbar.get('uci_next')]
          ],
          ["button", { id: "uci_reading_exit", onkeydown: "UciHelp.navigation_popin(event, 'uci_reading_exit')", onclick: "UciHelp.hide_popin()", name: "uci_reading_exit", "type": "button", "class": "uci-popin-button-right ucibtn ucibtn-sm ucibtn-secondary" }, accessibilitytoolbar.get('uci_exit')]

        ]
      ]
    ])
  },

  show_popin: function () {
    document.getElementById("uci_activer_menu").blur();
    if (document.getElementById("uci_cdu_popin")) {
      if (document.getElementById("uci_zone_form").style.display === "block") {
        document.getElementById("uci_zone_form").style.display = "none";
      }

      document.getElementById("uci_cdu_popin").style.display = "block";
      document.getElementById("uci_cdu_popin").style.height = document.getElementsByTagName("body")[0].clientHeight + "px";
      document.getElementById("masque_haut").style.display = "block";
      UciHelp.calculate_overlay_position(1);
      document.getElementById("uci_help_title").focus();
    }
  },

  show_menu: function () {
    UciHelp.calculate_overlay_position(1);
    if (document.getElementById("uci_cdu_popin")) {
      document.getElementById("masque_haut_param").className = "masque-haut-param";
      document.getElementById("masque_haut_advanced_param").className = "masque-haut-advanced-param";
      document.getElementById("uci_main_popin_help").style.display = "block";
      document.getElementById("uci_discover").style.display = "none";
    }
    if (document.getElementById("uci_reading")) {
      if (document.getElementById("uci_reading").getAttribute("name") === "typographie" ||
        document.getElementById("uci_reading").getAttribute("name") === "apparence" ||
        document.getElementById("uci_reading").getAttribute("name") === "couleur" ||
        document.getElementById("uci_reading").getAttribute("name") === "aidemotrice") {
        UciIhm.hide_more_confort();
        accessibilitytoolbar.uci_OuvrirMenuOnglet(document.getElementById("onglet_typographie").parentNode);
      }
      parent = document.getElementById("uci_reading").parentNode;
      parent.removeChild(parent.lastChild);
    }
  },

  hide_popin: function () {
    document.getElementById("uci_main_popin_help").style.display = "block";
    document.getElementById("uci_cdu_popin").style.display = "none";
    document.getElementById("uci_discover").style.display = "none";
    document.getElementById("uci_discover_none").checked = true;
    UciHelp.calculate_overlay_position(0);
    document.getElementById("masque_haut_param").className = "masque-haut-param";
    document.getElementById("masque_haut_advanced_param").className = "masque-haut-advanced-param";
    document.getElementById("masque_haut").style.display = "none";
    if (document.getElementById("uci_reading")) {
      if (document.getElementById("uci_reading").getAttribute("name") === "typographie" ||
        document.getElementById("uci_reading").getAttribute("name") === "apparence" ||
        document.getElementById("uci_reading").getAttribute("name") === "couleur" ||
        document.getElementById("uci_reading").getAttribute("name") === "aidemotrice") {
        UciIhm.hide_more_confort();
        accessibilitytoolbar.uci_OuvrirMenuOnglet(document.getElementById("onglet_typographie").parentNode);
      }
      parent = document.getElementById("uci_reading").parentNode;
      parent.removeChild(parent.lastChild);
    }
    UciHelp.demo_reset();
    document.getElementById("uci_activer_menu").focus();
  },

  show_discover: function () {
    if (document.getElementById("uci_main_popin_help")) {
      document.getElementById("uci_help_title").focus();
      document.getElementById("uci_main_popin_help").style.display = "none";
      document.getElementById("uci_discover").style.display = "block";
    }
  },

  show_reading: function (name) {
    document.getElementById("uci_main_popin_help").style.display = "none";
    document.getElementById("uci_discover").style.display = "none";
    //document.getElementById("uci_reading").style.display = "block";
    if (name === "apparence" || name === "aidemotrice") {
      //document.getElementById("uci_zone_form").appendChild(UciHelp.InitUciReading(name));
      //document.getElementById("uci_reading").setAttribute("name", name);
      //UciHelp.changeText("center");
      UciHelp._readingTraitement(UciHelp.tour[name], UciHelp.tour[name]);
    } else {
      document.getElementById("masque_haut_param").appendChild(UciHelp.InitUciReading("reading"));
      document.getElementById("uci_reading_move_left").style.visibility = "hidden";
      document.getElementById("masque_haut_param").className = "readingElements";
      UciHelp.position_popin_help();
      UciHelp.calculate_overlay_position();
    }
    document.getElementById("uci_reading_title").focus();
    document.getElementById("uci_reading").style.display = "block"
    document.getElementById("uci_reading_title").focus();
  },

  demo_visibility: function () {
    var demo = new UciUserPref();
    demo.set("a11yBigger", 150);
    accessibilitytoolbar.setCSS("false", demo);
  },

  demo_layout: function () {
    var demo = new UciUserPref();
    demo.set("a11yLeftText", "left");
    accessibilitytoolbar.setCSS("false", demo);
  },

  demo_reset: function () {
    var demo = new UciUserPref();
    accessibilitytoolbar.setCSS("false", demo);
  },

  calculate_overlay_position: function (resize) {
    if (resize !== null && resize !== undefined) {
      document.getElementById("masque_haut").setAttribute("value", resize);
    }
    if (document.getElementById("masque_haut").getAttribute("value") == 1) {
      widthTmp = document.getElementById("uci_toolbar-quick").clientWidth - document.getElementsByClassName("uci_right")[0].clientWidth;
      heightTmp = document.getElementById("uci_toolbar-quick").clientHeight;
      document.getElementById("masque_haut_logo").style.width = widthTmp - 15 + "px";
      document.getElementById("masque_haut_logo").style.height = heightTmp + "px";

      widthTmp = document.getElementById("uci_right_toolbar").clientWidth + document.getElementById("uci_middle_toolbar").clientWidth;
      document.getElementById("masque_haut_advanced_param").style.width = document.getElementById("uci_middle_toolbar").clientWidth + 16 + "px";
      document.getElementById("masque_haut_advanced_param").style.height = heightTmp + "px";

      document.getElementById("masque_haut_param").style.width = document.getElementById("uci_left_toolbar").clientWidth + "px";
      document.getElementById("masque_haut_param").style.height = heightTmp + "px";

      document.getElementById("masque_haut_exit").style.width = document.getElementById("uci_right_toolbar").clientWidth + "px";
      document.getElementById("masque_haut_exit").style.height = heightTmp + "px";
    }

  },



  position_popin_help: function () {
    if (document.getElementById("uci_reading").getAttribute("name") === "advancedparam") {
      //document.getElementById("uci_reading").style.right = document.getElementById("masque_haut_param").clientWidth + "px";
      document.getElementById("triangle").lastChild.className = "triangleright";
    }

    if (document.getElementById("uci_reading").getAttribute("name") === "typographie" ||
      document.getElementById("uci_reading").getAttribute("name") === "apparence" ||
      document.getElementById("uci_reading").getAttribute("name") === "couleur" ||
      document.getElementById("uci_reading").getAttribute("name") === "aidemotrice") {
      document.getElementById("uci_reading").style.top = document.getElementById("uci_form").clientHeight + 2 + "px";
      document.getElementById("triangle").lastChild.className = "triangleright";
    }

    if (document.getElementById("uci_reading") != null && (document.getElementById("uci_reading").getAttribute("name") !== "typographie" &&
      document.getElementById("uci_reading").getAttribute("name") !== "apparence" &&
      document.getElementById("uci_reading").getAttribute("name") !== "couleur" &&
      document.getElementById("uci_reading").getAttribute("name") !== "aidemotrice")) {
      heightTmp = document.getElementById("uci_toolbar-quick").clientHeight;
      document.getElementById("uci_reading").style.top = heightTmp + 2 + "px";
    }
  },
  navigation_popin: function (e, id) {
    var winObj = "";
    if (!e)
      e = window.event;

    var intKeyCode = e.keyCode;
    if (intKeyCode === 27 && (id === "uci_main_popin_help" || id === "uci_discover" || id === "uci_reading")) {
      UciHelp.hide_popin();
    }
    if (!e.shiftKey && intKeyCode === 9 && (id === "uci_popin_button" || id === "uci_popin_exit" || id === "uci_reading_exit")) {
      accessibilitytoolbar.stopEvt(e);
      switch (id) {
        case "uci_popin_button":
          document.getElementById("uci_help_title").focus();
          break;
        case "uci_popin_exit":
          document.getElementById("uci_discover_title").focus();
          break;
        case "uci_reading_exit":
          document.getElementById("uci_reading_title").focus();
          break;
      }
    }
    if (e.shiftKey && intKeyCode === 9 && (id === "uci_help_title" || id === "uci_discover_title" || id === "uci_reading_title")) {
      accessibilitytoolbar.stopEvt(e);
      switch (id) {
        case "uci_help_title":
          document.getElementById("uci_popin_button").focus();
          break;
        case "uci_discover_title":
          document.getElementById("uci_popin_exit").focus();
          break;
        case "uci_reading_title":
          document.getElementById("uci_reading_exit").focus();
          break;
      }
    }
    if (intKeyCode === 39 && (id === "uci_reading_title" || id === "uci_reading" ||id === "uci_reading_exit") ){
      accessibilitytoolbar.stopEvt(e);
      UciHelp.changeText('right')
    }
    if (intKeyCode === 37 && (id === "uci_reading_title" || id === "uci_reading" ||id === "uci_reading_exit") ){
      accessibilitytoolbar.stopEvt(e);
      UciHelp.changeText('left')
    }
  },

  

  hide_reading: function (name) {
    if (name === "reading"  || name === "reading1" || name === "reading2") {
      document.getElementById("masque_haut_advanced_param").className = "masque-haut-advanced-param";
      document.getElementById("masque_haut_param").className = "readingElements";
    }
    if (name === "advancedparam") {
      document.getElementById("masque_haut_param").className = "masque-haut-param";
      document.getElementById("masque_haut_advanced_param").className = "readingElements";
    }
  },

  changeText: function (move) {
    var currentName = document.getElementById("uci_reading").getAttribute("name");
    
    var currentObject = UciHelp.tour[currentName];
    var prevObject = UciHelp.tour[currentObject.prev];
    var nextObject = UciHelp.tour[currentObject.next];
    if (move === "left"){
        UciHelp._readingTraitement(currentObject, prevObject);
    } else if (move === "right"){
      UciHelp._readingTraitement(currentObject, nextObject);
    }
    /*UciHelp.tour.forEach(function(element, index) {
      if (element.name === currentName){
        if (move === "left"){
          if (index-1 >= 0){
            var nextIndex = index-1;
            UciHelp._readingTraitement(nextIndex, parent, element);
          }
        } else if (move === "right"){
          if (index+1 < UciHelp.tour.length){
            var nextIndex = index+1;
           UciHelp._readingTraitement(nextIndex, parent, element);
          }
        }
      }
      
      
      /*todo 
        connaitre l'element sur lequel on est et l'index
        faire le test pour le positionnement en fonction de la direction
        gérer l'affichage
    }, this);*/
    document.getElementById("uci_reading_title").focus();
  },

  _directReading: function(name){
    var currentObject = UciHelp.tour[name];
    document.getElementById(currentObject.parentId).appendChild(UciHelp.InitUciReading(name));
    UciIhm.more_confort(); 
    accessibilitytoolbar.uci_OuvrirMenuOnglet(document.getElementById("onglet_" + currentObject.text + "").parentNode);
  },

  /********************************** _readingTraitement ********************************************************/
  /* This function manage automically display of reading popin                                                  */
  /* @input param :                                                                                             */
  /* currentObject : It's the current popin displayed                                                           */
  /* nextObject : It's the next popin to display                                                                */
  /**************************************************************************************************************/
  _readingTraitement: function (currentObject, nextObject) {
      if (nextObject !== undefined){
        if (document.getElementById("uci_reading")){
          var parent = document.getElementById("uci_reading").parentNode;
          parent.removeChild(parent.lastChild);
        }
        document.getElementById(nextObject.parentId).appendChild(UciHelp.InitUciReading(nextObject.text));
      //}
      if (nextObject.adcancedparam === "open" && currentObject.adcancedparam !== "isopen") {
        UciIhm.more_confort();
      }
      if (nextObject.adcancedparam === "close") {
        UciIhm.hide_more_confort();
      }
      if (nextObject.adcancedparam === "isopen" ) {
        if (document.getElementById('uci_activateOnglet').style.display === "none"){
          UciIhm.more_confort();
        }
        accessibilitytoolbar.uci_OuvrirMenuOnglet(document.getElementById("onglet_" + nextObject.text + "").parentNode);
      }
      UciHelp.hide_reading(nextObject.text);
      UciHelp.position_popin_help();
      UciHelp.calculate_overlay_position();
      if (nextObject.prev === "") {
        document.getElementById("uci_reading_move_left").style.visibility = "hidden";
      }
      if (nextObject.next === "") {
        document.getElementById("uci_reading_move_right").style.visibility = "hidden";
      }
    }
  }
}