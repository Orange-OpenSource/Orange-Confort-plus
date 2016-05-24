Build need to be done onto a windows 64 bits :
Windows 7 or Windows 8.1.
Prerequisite Tools needed for build : 
1. Windows SDK
2. Framework .NET 4.5.1 DevPack
3. Build Tools 2015 (Visual Studio)
4. Framework .NET 3.5
5. WiX Toolset 3.10
How to build : 
1. Get the source code from github (https://github.com/Orange-OpenSource/Orange-Confortplus)
2. Made your changes if needed
3. Update the assembly version Orange.ConfortPlus.IEExtension/Properties/AssemblyInfo.cs
[assembly: AssemblyVersion("1.0.1.0")]
[assembly: AssemblyFileVersion("1.0.1.0")]
4. Run « build.bat » in the path « app\Addin IE11\Tools »
5. Get the extension generated into "dist\Addin IE"
