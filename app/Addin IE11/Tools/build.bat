set WiX=C:\Program Files (x86)\WiX Toolset v3.10
set MSBuild=C:\Program Files (x86)\MSBuild\14.0\bin
mkdir "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources"        
cd %~dp0

robocopy "%~dp0\..\..\help" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\help" /COPYALL
robocopy "%~dp0\..\..\fonts" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\fonts" /COPYALL
robocopy "%~dp0\..\..\css" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\css" /COPYALL
robocopy "%~dp0\..\..\images" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\images" /COPYALL
robocopy "%~dp0\..\..\language" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\language" /COPYALL

mkdir "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js"

copy /Y "%~dp0\..\..\js\mask.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\mask.js"
copy /Y "%~dp0\..\..\js\toolbar.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\toolbar.js"
copy /Y "%~dp0\..\..\js\ToolbarStrings.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\ToolbarStrings.js"
copy /Y "%~dp0\..\..\js\UciAideMotrice.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciAideMotrice.js"
copy /Y "%~dp0\..\..\js\UciApparence.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciApparence.js"
copy /Y "%~dp0\..\..\js\UciCouleur.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciCouleur.js"
copy /Y "%~dp0\..\..\js\UciIhm.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciIhm.js"
copy /Y "%~dp0\..\..\js\UciSimpleStorage.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciSimpleStorage.js"
copy /Y "%~dp0\..\..\js\UciTypographie.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciTypographie.js"
copy /Y "%~dp0\..\..\js\UciUserPref.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciUserPref.js"
copy /Y "%~dp0\..\..\js\UciValidation.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciValidation.js"
copy /Y "%~dp0\..\..\js\UciProfile.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\UciProfile.js"
copy /Y "%~dp0\..\..\js\start.extensionIE.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\start.extensionIE.js"
copy /Y "%~dp0\..\..\conf\extensionIE\hebergement.js" "%~dp0\..\Orange.ConfortPlus.IEExtension\Resources\js\hebergement.js"

cd %~dp0\..\Orange.ConfortPlus.IEExtension\Resources\help\
powershell -Command "(gc help_en.html -Encoding "UTF8") -replace '../css/help.css', 'cdu://Resources/css/help.css' | Out-File -Encoding "UTF8" help_en.html"
powershell -Command "(gc help_en.html -Encoding "UTF8") -replace 'build:js ../js/toolbar-min.js -->', 'build:js ../js/toolbar-min.js' | Out-File -Encoding "UTF8" help_en.html"

powershell -Command "(gc help_fr.html -Encoding "UTF8") -replace '../css/help.css', 'cdu://Resources/css/help.css' | Out-File -Encoding "UTF8" help_fr.html"                  
powershell -Command "(gc help_fr.html -Encoding "UTF8") -replace 'build:js ../js/toolbar-min.js -->', 'build:js ../js/toolbar-min.js' | Out-File -Encoding "UTF8" help_fr.html"

powershell -Command "(gc help_es.html -Encoding "UTF8") -replace '../css/help.css', 'cdu://Resources/css/help.css' | Out-File -Encoding "UTF8" help_es.html"
powershell -Command "(gc help_es.html -Encoding "UTF8") -replace 'build:js ../js/toolbar-min.js -->', 'build:js ../js/toolbar-min.js' | Out-File -Encoding "UTF8" help_es.html"

powershell -Command "(gc help_pl.html -Encoding "UTF8") -replace '../css/help.css', 'cdu://Resources/css/help.css' | Out-File -Encoding "UTF8" help_pl.html"
powershell -Command "(gc help_pl.html -Encoding "UTF8") -replace 'build:js ../js/toolbar-min.js -->', 'build:js ../js/toolbar-min.js' | Out-File -Encoding "UTF8" help_pl.html"
# cd %~dp0\..\Orange.ConfortPlus.IEExtension\Resources\css\
# powershell -Command "(gc classic-toolbar.css -Encoding "UTF8") -replace '../fonts/orangeconfortplus.eot', 'cdu://Resources/fonts/orangeconfortplus.eot' | Out-File -Encoding "UTF8" classic-toolbar.css"
cd %~dp0


"%MSBuild%\msbuild.exe" ..\Orange.ConfortPlus.IEExtension.sln /p:Configuration=Release;Platform=x86
"%MSBuild%\msbuild.exe" ..\Orange.ConfortPlus.IEExtension.sln /p:Configuration=Release;Platform=x64

mkdir "%~dp0\..\..\..\dist\Addin IE"
copy /Y "%~dp0\..\Orange.ConfortPlus.IEExtension.Installer\bin\x86\Release\en-US\Orange.ConfortPlus.IEExtension.Installer.msi" "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x86.msi"
copy /Y "%~dp0\..\Orange.ConfortPlus.IEExtension.Installer\bin\x64\Release\en-US\Orange.ConfortPlus.IEExtension.Installer.msi" "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x64.msi"

"%WiX%\bin\torch.exe" "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x86.msi" "%~dp0\..\Orange.ConfortPlus.IEExtension.Installer\bin\x86\Release\fr-FR\Orange.ConfortPlus.IEExtension.Installer.msi" -o fr-FR.mst
"%WiX%\bin\torch.exe" "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x86.msi" "%~dp0\..\Orange.ConfortPlus.IEExtension.Installer\bin\x86\Release\es-ES\Orange.ConfortPlus.IEExtension.Installer.msi" -o es-ES.mst


cscript.exe WiSubStg.vbs "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x86.msi" fr-FR.mst 1036
cscript.exe WiSubStg.vbs "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x86.msi" es-ES.mst 3082
cscript.exe WiLangId.vbs "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x86.msi" Package 1033,1036,3082

del *.mst

"%WiX%\bin\torch.exe" "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x64.msi" "%~dp0\..\Orange.ConfortPlus.IEExtension.Installer\bin\x64\Release\fr-FR\Orange.ConfortPlus.IEExtension.Installer.msi" -o fr-FR.mst
"%WiX%\bin\torch.exe" "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x64.msi" "%~dp0\..\Orange.ConfortPlus.IEExtension.Installer\bin\x64\Release\es-ES\Orange.ConfortPlus.IEExtension.Installer.msi" -o es-ES.mst

cscript.exe WiSubStg.vbs "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x64.msi" fr-FR.mst 1036
cscript.exe WiSubStg.vbs "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x64.msi" es-ES.mst 3082
cscript.exe WiLangId.vbs "%~dp0\..\..\..\dist\Addin IE\Orange.ConfortPlus.IEExtension.Installer_x64.msi" Package 1033,1036,3082

del *.mst