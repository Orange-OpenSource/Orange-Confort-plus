// <copyright file="Tools.cs" company="Orange SA">
//     Copyright (c) 2016 - 2017 Orange. 
// </copyright>
//
// This file is part of Orange Confort+ Internet Explorer Extension | An Internet Explorer Extension that embed Orange Confort+ (http://confort-plus.orange.com/)
//
// Orange Confort+ is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// Orange Confort+ is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details (LICENSE.txt file).
namespace Orange.ConfortPlus.IEExtension.WiX
{
    using System;
    using System.IO;
    using System.Runtime.InteropServices;
    
    using Microsoft.Deployment.WindowsInstaller;
    
    /// <summary>
    /// WiX CustomActions
    /// </summary>
    public class CustomActions
    {
        /// <summary>
        /// SetInternetExplorerLCID
        /// </summary>
        /// <param name="session"></param>
        /// <returns></returns>
        /// <remarks>
        /// <para>set IELCID property with LCID defined from iexplorer.exe language.</para>
        /// <para>iexplorer.exe path must be set in iexplorePath property</para>
        /// </remarks>
        [CustomAction]
        public static ActionResult SetInternetExplorerLCID(Session session)
        {
            try
            {
                session.Log("Begin SetInternetExplorerLCID");

                string filePath = session["iexplorePath"];
                if (!File.Exists(filePath))
                {
                    session.Log(filePath + "doesn't exist");
                    return ActionResult.Failure;
                }

                uint handle = 0;

                uint size = (uint)GetFileVersionInfoSize(filePath, out handle);
                if (size <= 0)
                {
                    session.Log("Error GetFileVersionInfoSize");
                    return ActionResult.Failure;
                }

                IntPtr buffer = System.Runtime.InteropServices.Marshal.AllocHGlobal((int)(size));

                if (!GetFileVersionInfo(filePath, handle, size, buffer))
                {
                    session.Log("Error GetFileVersionInfo");
                    return ActionResult.Failure;
                }

                uint len = 0;
                IntPtr Info = IntPtr.Zero;

                if (!VerQueryValue(buffer, @"\VarFileInfo\Translation", out Info, out len))
                {
                    session.Log("Error VerQueryValue");
                    return ActionResult.Failure;
                }
                short wlang = System.Runtime.InteropServices.Marshal.ReadInt16(Info, 0);
                string lang = "1033"; // en-US
                switch (wlang)
                {
                    case 1036: //france
                    case 2060: //belgique
                    case 11276: //cameroun
                    case 3084: // canada
                    case 9228: // congo
                    case 12300: // Cote d'Ivoire
                    case 15372: // Haiti
                    case 5132: // Luxembourg
                    case 13324: // Mali
                    case 6156: // Monaco
                    case 14348: // Maroc
                    //case 58380 : // Afrique du nord
                    case 8204: // Réunion
                    case 10252: //Senegal
                    case 4108: //Switzerland
                    case 7180: //West Indies
                        lang = "1036"; // fr-FR
                        break;
                    case 3082: // Spain Modern
                    case 1034: // Spain traditional
                    case 11274: // Argentina
                    case 16394: //Bolivia
                    case 13322: //Chile
                    case 9226: //Colombia
                    case 5130: //Costa Rica
                    case 7178: //Dominican Republic
                    case 12298: //Ecuador
                    case 17418: //El Salvador
                    case 4106: //Guatemala
                    case 18442: //Honduras
                    case 22538: //Latin America
                    case 2058: //Mexico
                    case 19466: //Nicaragua
                    case 6154: //Panama
                    case 15370: //Paraguay
                    case 10250: //Peru
                    case 20490: //Puerto Rico
                    case 21514: //United States
                    case 14346: //Uruguay
                    case 8202: //Venezuela
                        lang = "3082"; // es-ES
                        break;
                }
                session["IELCID"] = lang;
            }
            catch (Exception ex)
            {
                session.Log("ERROR in custom action SetInternetExplorerLCID {0}", ex.ToString());
                return ActionResult.Failure;
            }

            return ActionResult.Success;
        }

        /// <summary>
        /// GetFileVersionInfo
        /// </summary>
        /// <param name="sFileName"></param>
        /// <param name="handle"></param>
        /// <param name="size"></param>
        /// <param name="infoBuffer"></param>
        /// <returns></returns>
        [DllImport("version.dll")]
        public static extern bool GetFileVersionInfo(string sFileName, uint handle, uint size, IntPtr infoBuffer);

        /// <summary>
        /// GetFileVersionInfoSize
        /// </summary>
        /// <param name="sFileName"></param>
        /// <param name="handle"></param>
        /// <returns></returns>
        [DllImport("version.dll")]
        public static extern int GetFileVersionInfoSize(string sFileName, out uint handle);

        /// <summary>
        /// VerQueryValue
        /// </summary>
        /// <param name="pBlock"></param>
        /// <param name="pSubBlock"></param>
        /// <param name="pValue"></param>
        /// <param name="len"></param>
        /// <returns></returns>
        [DllImport("version.dll")]
        public static extern bool VerQueryValue(IntPtr pBlock, string pSubBlock, out IntPtr pValue, out uint len);
    }
}
