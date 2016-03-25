/* orange-confort-plus - version 3.2.1 - 25-03-2016
enhance user experience on web sites
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
UciRuler = {
        settings: {
            showVertical : false,
            showHorizontal : false,
            color : '#000',   //#000,  #32C832, #CD3C14, #527EDB, #FFCC00
            thickness : 'medium',			   //thin,medium,thick
            launched : false
        },

        vMouse: null,
        hMouse: null,

        init: function() {
	        if ((!window.Modernizer) || !Modernizr.touch) { 
	            vMouse = document.createElement("div");
	            vMouse.className="vMouse";
	            hMouse = document.createElement("div");
	            hMouse.className="hMouse";
	            document.getElementsByTagName("body")[0].appendChild(vMouse);
	            document.getElementsByTagName("body")[0].appendChild(hMouse);  

	            // Mouse crosshair
	            if (!UciRuler.settings.showVertical ) {
	            	jQuery('.vMouse').hide();              
	            }
	            if (!UciRuler.settings.showHorizontal ) {
	            	jQuery('.hMouse').hide(); 
	                
	            }   
	        	
	        }
        },
        
        rulerEventCreate: function() {              
        	jQuery(document).on("mousemove.ruler",this.rulerEvent);
            UciRuler.settings.launched = true;
        },        
     
        rulerEventRemove: function() {    
        	jQuery(document).unbind("mousemove.ruler",this.rulerEvent);  
            // if the vertical ruler was launched before, removed it from the dom
        	jQuery('.vMouse').hide();      
            // if the horizontal ruler was launched before, removed it from the dom
        	jQuery('.hMouse').hide(); 
            UciRuler.settings.launched = false;
        },
        
        rulerEvent: function(e) {
            // vertical
            if (UciRuler.settings.showVertical) {     
            	jQuery('.vMouse').show();                  
            	jQuery('.vMouse').css("left",e.pageX+1);
            	jQuery('.vMouse').css('borderLeft',UciRuler.settings.thickness+' solid '+UciRuler.settings.color);
            } 
            else
            {
                // if the vertical ruler was launched before, removed it from the dom
            	jQuery('.vMouse').hide();
            }
                
            // horizontal    
            if (UciRuler.settings.showHorizontal) { 
            	jQuery('.hMouse').show();             
            	jQuery('.hMouse').css("top",e.pageY-(jQuery(document).scrollTop())+1);
            	jQuery('.hMouse').css('borderBottom',UciRuler.settings.thickness+' solid '+UciRuler.settings.color);                    
            }  
            else
            {    
                // if the horizontal ruler was launched before, removed it from the dom
            	jQuery('.hMouse').hide(); 
            }                    
        }
}
UciRuler.init();
accessibilitytoolbar.toolbarRuler = true;