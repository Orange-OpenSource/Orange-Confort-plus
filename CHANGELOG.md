<a name="3.2.0"></a>
### 3.2.0 (2015-10-20)


#### Bug Fixes

* **css:**
  * Change padding from main container to small one for best responsiveness
  * Center elements horizontally into the quick settings toolbar
  * Fix Confort+ H1 heading
  * Define a class for label disabled state color update
  * Fix transparency error onto IE
  * Set the font-size bigger onto HTML tag to match with REM sizes
* **javascript:** 
  * Fix invalid aria-labelledby attributes into advance settings 
  * Fix js error onto classname match for svg elements
  * Fix motorhelp error onto svg elements
  * Fix motorhelp priority activate onclick event even if href value is present
  * Fix JS error onto navigation link color selection setproperty for IE8 
  * Fix the motor help onto tabindexed element lower than 0                         

#### Features

* **deployment:**
  * Create a standalone mode, fullJS who don't need PHP server
  * Extend the settings to frame and popup served from same domain, without displaying the toolbar
  * Serve ressources (JS, Images, CSS) onto the configured protocol HTTP or HTTPS
  * Serialize opendyslexic fonts in base64
* **ergonomics:**
  * Update toolbar color
  * Replace pictures by font icons for better scale
  * Change the toolbar open status default state. If nothing was saved, then the toolbar will be closed on the page reload
  * Move the disable switch near the service title
  * Move the clear settings button from menu to quick settings
  * Move the close button from menu to quick settings 
  * Add a confirmation box before clearing all settings

