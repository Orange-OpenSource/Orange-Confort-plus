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
	$usageComfort="NOCOOKIE";
  $redirectUrl="cookie2.php?";
  if(isset($_GET['origin']))
  {
    $redirectUrl.="origin=".$_GET['origin'];
  }
  if(isset($_GET['hostname']))
  {
    $redirectUrl.="&hostname=".$_GET['hostname'];
  }
  global $userPref,$cookie_domain, $cookie_name, $cookie_name_old, $cookie_blackListe;

	if(isset($_COOKIE[$cookie_name]))
	{
		$usageComfort=$_COOKIE[$cookie_name];
    // vérification pour savoir si le site est blaclisté ou non
        if(isset($_COOKIE[$cookie_blackListe]) && isset($_GET['hostname'])){
            $hostnames = explode('|',$_COOKIE[$cookie_blackListe]);
            if (in_array($_GET['hostname'], $hostnames)){
                $usageComfort .= '1';
            }else{
                $usageComfort .= '0';
            }
        }else{
            $usageComfort .= '0';
        }
	}
  elseif(isset($_COOKIE[$cookie_name_old]))
  {
    $usageComfort=$_COOKIE[$cookie_name_old];
    $duration = time()+60*60*24*1000;
    setcookie( $cookie_name , $usageComfort , $duration , "/" , $cookie_domain);
  }
  else
  {                 
    $duration = time()+60*60*24*1000;
    setcookie( $cookie_name , "0000651000650650650000000000000000006500000000" , $duration , "/" , $cookie_domain);
  }

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php if(isset($locale) && ($locale!="")) { 	echo "lang=\"{$locale}\""; } ?>>
<head>
</head>
<body id="cdu_settings">
	
	<script type='text/javascript'>
  <?php 
    if($usageComfort=="NOCOOKIE")
    {
      echo "redirect();";
    }
    else
    {    
      echo "sendBackData();";
    }
  ?>
		function sendBackData()
		{  
			if(window && window.parent && window.parent.postMessage)
			{                                                                      
				window.parent.postMessage('<?php echo $usageComfort; ?>', '<?php echo $_GET['origin']; ?>');
			}
		}
    
    function redirect()
    {
      document.location.href="<?php echo $redirectUrl; ?>";
    }
  </script>
  
</body>
</html>