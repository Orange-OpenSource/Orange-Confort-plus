<?php

/*------------------------------------------*/
/* User preference mode |                   */
/*------------------------------------------*/
/* 
Value can be :
	- "cookie" => user preference are saved
					as cookie
By default, or if value is unknown, the 
cookie mode is selected.
*/ 
/*------------------------------------------*/
$userPrefMode = "cookie"; 	/* cookie mode  */
/*==========================================*/

/*------------------------------------------*/
/* User GUI |                   			*/
/*------------------------------------------*/
/* 
Value can be :
	- "classic" => GUI is according to the 
				Orange 2010 brand.
	- "ofr" => GUI is according to the 2011 
				Orange France Portal
By default, or if value is unknown, the 
classic GUI is selected.
*/ 
/*------------------------------------------*/
$gui = "classic";	/* classic 2010 brand   */
//$gui = "ofr"; 	/* 2011 Orange France  	*/
/*==========================================*/

/*------------------------------------------*/
/* Cookies information |                    */
/*------------------------------------------*/

$cookie_domain = "comfort.orange.com";

$cookie_name	= "UCI3";
$cookie_blackListe = "uci-bl";
$cookie_name_old	= "UsageComfort2"; 
/*==========================================*/

/*------------------------------------------*/
/* Debug mode |                    			*/
/*------------------------------------------*/
$debug = false;
if(isset($_GET["debug"])) {
	$debug = $_GET["debug"];
}
/*==========================================*/