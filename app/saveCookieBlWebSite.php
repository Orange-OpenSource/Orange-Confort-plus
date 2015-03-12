<?php                    
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
if(!isset($_SESSION)) session_start();

/**
 * Global settings go here
 */
include("conf/param.php");


if(isset($_GET['hostname']))
{
    global $userPref, $cookie_domain, $cookie_blackListe;

    $duration = time()+60*60*24*1000;
    if(isset($_COOKIE[$cookie_blackListe])){
        $aBlackListWebsites = explode('|',$_COOKIE[$cookie_blackListe]);
    }else{
        $aBlackListWebsites = array();
    }
    if(in_array($_GET['hostname'], $aBlackListWebsites)){
        foreach($aBlackListWebsites as $key => $value){
            if($value == $_GET['hostname']){
                unset($aBlackListWebsites[$key]);
            }
        }

    }else{
        array_push($aBlackListWebsites,$_GET['hostname']);
    }

    setcookie( $cookie_blackListe , implode('|',$aBlackListWebsites) , $duration , "/" , $cookie_domain);
}