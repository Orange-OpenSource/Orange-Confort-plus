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
            document.getElementsByTagName("body")[0].appendChild(bottomMask); 
	        }
        },
        
        start: function() {
        	if(!UciMask.settings.launched)
            {
        		  UciMask.maskEventCreate();
            }           
        },
        
        maskEventCreate: function() {   
          // For W3C Browser
          if (document.addEventListener) {
            document.addEventListener('mousemove', UciMask.maskEvent, false);
          }
          //For IE browser
          else if (document.attachEvent) {
            document.attachEvent('onmousemove', UciMask.maskEvent);
          } 
          UciMask.settings.launched = true;
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
          document.getElementById('bottomMask').style.display = "none";
          UciMask.settings.launched = false;
        },
        
        maskEvent: function(e) {
          UciMask.draw(e.clientY);
        },
        
        draw: function(positionY) {
        	switch(UciMask.settings.thickness) {
        		case 'thin':
        			var size = 20;
        			break;
        		case 'medium':
        			var size = 40;
        			break;
        		case 'thick':
        			var size = 60;
        			break;
        		case 'none':
        		default:
        			var size = 0;
        	}
        	if(typeof positionY == 'undefined') {
        		size = 0;
        	}
        	var topMaskHeight = 0;
          if((positionY - (size / 2)) > 0)   {
            topMaskHeight = positionY - (size / 2);
          }
        	document.getElementById('topMask').style.height = topMaskHeight + "px";
        	document.getElementById('topMask').style.display = "block";
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
