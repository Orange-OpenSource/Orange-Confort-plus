/* orange-confort-plus - version 3.1.0 - 12-03-2015
enhance user experience on web sites
 Copyright (C) 2014 - 2015 Orange */
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
function UciRuler() {
        this.settings = {
            showVertical : false,
            showHorizontal : false,
            color : '#000',   //#000,  #32C832, #CD3C14, #527EDB, #FFCC00
            thickness : 'medium',			   //thin,medium,thick
            launched : false
        };//defaults
        //var this.settings = $.extend({},defaults,options);

        var vMouse,hMouse;

        if ((!window.Modernizer) || !Modernizr.touch) { 
            vMouse = document.createElement("div");
            vMouse.className="vMouse";
            hMouse = document.createElement("div");
            hMouse.className="hMouse";
            document.getElementsByTagName("body")[0].appendChild(vMouse);
            document.getElementsByTagName("body")[0].appendChild(hMouse);  
               
            // Mouse crosshair
            if (!this.settings.showVertical ) {
                $('.vMouse').hide();                
            }
            if (!this.settings.showHorizontal ) {
                $('.hMouse').hide();
                
            } 
            this.rulerEventCreate = function() {              
                $(document).on("mousemove.ruler",this.rulerEvent);
                this.settings.launched = true;
            };        
         
            this.rulerEventRemove = function() {    
                $(document).unbind("mousemove.ruler",this.rulerEvent);  
                // if the vertical ruler was launched before, removed it from the dom
                $('.vMouse').hide();      
                // if the horizontal ruler was launched before, removed it from the dom
                $('.hMouse').hide(); 
                this.settings.launched = false;
            };
            this.rulerEvent = function(e) {
                // vertical
                if (accessibilitytoolbar.toolbarRuler.settings.showVertical) {     
                    $('.vMouse').show();                  
                    $('.vMouse').css("left",e.pageX+1);
                    $('.vMouse').css('borderLeft',accessibilitytoolbar.toolbarRuler.settings.thickness+' solid '+accessibilitytoolbar.toolbarRuler.settings.color);
                } 
                else
                {
                    // if the vertical ruler was launched before, removed it from the dom
                    $('.vMouse').hide();
                }
                    
                // horizontal    
                if (accessibilitytoolbar.toolbarRuler.settings.showHorizontal) { 
                    $('.hMouse').show();             
                    $('.hMouse').css("top",e.pageY-($(document).scrollTop())+1);
                    $('.hMouse').css('borderBottom',accessibilitytoolbar.toolbarRuler.settings.thickness+' solid '+accessibilitytoolbar.toolbarRuler.settings.color);                    
                }  
                else
                {    
                    // if the horizontal ruler was launched before, removed it from the dom
                    $('.hMouse').hide(); 
                }                    
            };    
        }                        
        this.rulerEventCreate();   
    }//ruler