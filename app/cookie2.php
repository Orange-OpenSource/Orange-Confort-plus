<?php
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014 - 2016  Orange SA

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
	$usageConfort="NOCOOKIE";
	if(isset($_COOKIE[$cookie_name]))
	{
		$usageConfort=$_COOKIE[$cookie_name];
    // vérification pour savoir si le site est blaclisté ou non
        if(isset($_COOKIE[$cookie_blackListe]) && isset($_GET['hostname'])){
            $hostnames = explode('|',$_COOKIE[$cookie_blackListe]);
            if (in_array($_GET['hostname'], $hostnames)){
                $usageConfort .= '1';
            }else{
                $usageConfort .= '0';
            }
        }else{
            $usageConfort .= '0';
        }
	}  
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php if(isset($locale) && ($locale!="")) { 	echo "lang=\"{$locale}\""; } ?>>
<head>
</head>
<body id="cdu_settings">
	
	<script type='text/javascript'>  
		sendBackData();
		function sendBackData()
		{  
			if(window && window.parent && window.parent.postMessage)
			{                                                                      
				window.parent.postMessage('<?php echo $usageConfort; ?>', '<?php echo $_GET['origin']; ?>');
			}
		}
  </script>
</body>
</html>