/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs

    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/
UciMask = {
        settings: {
            launched : false,
            thickness : 'none'
        },

        init: function() {
	        if ((!window.Modernizer) || !Modernizr.touch) {
	        	topMask = document.createElement("div");
	        	topMask.className="topMask";
	        	topMask.id="topMask";
	        	bottomMask = document.createElement("div");
	        	bottomMask.className="bottomMask";
            bottomMask.id="bottomMask";
            document.getElementsByTagName("body")[0].appendChild(topMask);
            document.getElementById('topMask').appendChild(UciMask.initCloseMask());
            document.getElementsByTagName("body")[0].appendChild(bottomMask);
           document.getElementById("topMask").appendChild(UciMask.explainHowToCloseDiv());
	        }
        },

        start: function() {
        	if(!UciMask.settings.launched)
            {
        		  UciMask.maskEventCreate();
            }
        },

        initCloseMask: function(){
          return accessibilitytoolbar.make(
            ["div", {id:"closeMaskDiv", "class": "closeMask"},
              ["button", { id: "closeMask", onclick: "UciMask.closeMask()", title: accessibilitytoolbar.get('uci_close_mask'), type: "button", "class": "closeMaskHidden uci-popin-btn ucibtn-secondary" },
                ["span", { "aria-hidden": "true", "class": "cdu-icon cdu-icon-croix" }],
                ["span", { "class": "cdu_n" }, accessibilitytoolbar.get('uci_close_mask')]
              ]
            ]
          );
        },

        explainHowToCloseDiv: function(){
          return accessibilitytoolbar.make(["div", {id:"howToClose", "class": "closeMask howtoclose"},  accessibilitytoolbar.get('howToClose') ])
        },

        maskEventCreate: function() {
          // For W3C Browser
          if (document.addEventListener) {
            document.addEventListener('mousemove', UciMask.maskEvent, false);
            document.addEventListener('keydown', function(){UciMask.exitMask(event)}, false);
            document.getElementById("closeMaskDiv").addEventListener('mouseover',function(){UciMask.changeVisibility("visible")}, false);
            document.getElementById("closeMaskDiv").addEventListener('mouseout', function(){UciMask.changeVisibility("hidden")}, false);
          }
          //For IE browser
          else if (document.attachEvent) {
            document.attachEvent('onmousemove', UciMask.maskEvent);
            document.addEventListener('keydown', function(){UciMask.exitMask(event)}, false);
            document.getElementById("closeMaskDiv").addEventListener('mouseover', function(){UciMask.changeVisibility("visible")});
            document.getElementById("closeMaskDiv").addEventListener('mouseout', function(){UciMask.changeVisibility("hidden")});
          }
          UciMask.settings.launched = true;
        },

        changeVisibility: function(state){
          document.getElementById("closeMask").style.visibility = state;
        },

        exitMask: function(e){
          var winObj = "";
          if (!e)
            e = window.event;

          var intKeyCode = e.keyCode;
          if (intKeyCode === 27 &&  document.getElementById('topMask').style.display === "block") {
            UciMask.closeMask();
          }

        },

        closeMask: function(){
          document.getElementById('a11yMaskEnabled').checked = false;
          accessibilitytoolbar.userPref.set("a11yMaskEnabled", "false");
          accessibilitytoolbar.setCSS();
          UciMask.maskEventRemove();
        },

        maskEventRemove: function() {
          if (document.removeEventListener) {
            document.removeEventListener('mousemove', UciMask.maskEvent, false);
          }
          //For IE browser
          else if (document.attachEvent) {
            document.detachEvent('onmousemove', UciMask.maskEvent);
          }

          // if the mask was launched before, removed it from the dom
          document.getElementById('topMask').style.display = "none";
          document.getElementById('closeMaskDiv').style.display = "none";
          document.getElementById('bottomMask').style.display = "none";
          UciMask.settings.launched = false;
        },

        maskEvent: function(e) {
          UciMask.draw(e.clientY);
        },

        draw: function(positionY) {
          closeMask = document.getElementById("closeMask");
          document.getElementById('howToClose').className = document.getElementById('howToClose').className.replace(/ howtocloselight{0,1}/, "");
        	switch(UciMask.settings.thickness) {
        		case 'medium':
              document.getElementById('topMask').style.background = "rgba(0, 0, 0, 0.25)";
              document.getElementById('bottomMask').style.background = "rgba(0, 0, 0, .25)";
              document.getElementById('howToClose').className += " howtocloselight";
        			break;
        		case 'thick':;
              document.getElementById('topMask').style.background = "rgba(0, 0, 0, 0.9)";
              document.getElementById('bottomMask').style.background = "rgba(0, 0, 0, 0.9)";
        			break;
        		default:
        			document.getElementById('topMask').style.background = "rgba(0, 0, 0, 0.5)";
              document.getElementById('bottomMask').style.background = "rgba(0, 0, 0, 0.5)";
          }
          var size = 90;
          closeMask.style.height = "90px";
          closeMask.style.width = "90px";
        	if(typeof positionY == 'undefined') {
        		size = 0;
        	}
        	var topMaskHeight = 0;
          if((positionY - (size / 2)) > 0)   {
            topMaskHeight = positionY - (size / 2);
          }
          document.getElementById('topMask').style.height = topMaskHeight + "px";
          document.getElementById('topMask').style.display = "block";
          document.getElementById('closeMaskDiv').style.top = topMaskHeight + "px";
          document.getElementById('closeMaskDiv').style.display = "block";
          document.getElementById('howToClose').style.top = topMaskHeight - document.getElementById("howToClose").clientHeight + "px";
          
        	var bottomMaskHeight = 0;
          var winHeight = 0;
          if (window.getComputedStyle) {
            winHeight = parseInt(document.documentElement.clientHeight,10);
          } else {
            winHeight = parseInt(document.documentElement.offsetHeight, 10);
          }

          if((winHeight - topMaskHeight - size) > 0)   {
            bottomMaskHeight = winHeight - topMaskHeight - size;
          }

          document.getElementById('bottomMask').style.height = bottomMaskHeight + "px";
        	document.getElementById('bottomMask').style.display = "block";
        }
}
