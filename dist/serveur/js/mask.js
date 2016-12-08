/* orange-confort-plus - version 4.0.0 - 08-12-2016
enhance user experience on websites
 Copyright (C) 2014 - 2016 Orange */
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
	        	bottomMask = document.createElement("div");
	        	bottomMask.className="bottomMask";
	            document.getElementsByTagName("body")[0].appendChild(topMask);
	            document.getElementsByTagName("body")[0].appendChild(bottomMask);     
	        	
	        }
        },
        
        start: function() {
        	if(!UciMask.settings.launched)
            {
        		UciMask.maskEventCreate();
            } 
        	$(document).mousemove();
        	//UciMask.draw(Math.round(window.innerHeight / 2));
        },
        
        maskEventCreate: function() {              
        	jQuery(document).on("mousemove.mask",this.maskEvent);
            UciMask.settings.launched = true;
        },        
     
        maskEventRemove: function() {    
        	jQuery(document).unbind("mousemove.mask",this.maskEvent);  
            // if the mask was launched before, removed it from the dom
        	jQuery('.topMask').hide();      
        	jQuery('.bottomMask').hide(); 
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
        	jQuery('.topMask').css("height",topMaskHeight + "px");
        	jQuery('.topMask').show();  
        	var bottomMaskHeight = 0;
            if((window.innerHeight - topMaskHeight - size) > 0)   {
            	bottomMaskHeight = jQuery(window).height() - topMaskHeight - size;
            }
        	jQuery('.bottomMask').css("height",bottomMaskHeight + "px");                  
        	jQuery('.bottomMask').show();
        }
}
UciMask.init();
accessibilitytoolbar.toolbarMask = true;