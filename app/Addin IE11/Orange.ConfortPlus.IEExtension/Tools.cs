// <copyright file="Tools.cs" company="Orange SA">
//     Copyright (c) 2016 - 2019 Orange. 
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
namespace Orange.ConfortPlus.IEExtension 
{
    using System;
    using System.IO;
    using System.Text;

    /// <summary>
    /// Common tools
    /// </summary>
    public class Tools
    {
        /// <summary>
        /// Get a string content of a ressource
        /// </summary>
        /// <param name="resourceName">name of the ressource</param>
        /// <returns></returns>
        public static string GetStringFromRessource(string resourceName)
        {
            string[] ressourceNameItems = resourceName.Split('/');
            string ressourceValue = string.Empty;

            using (Stream stream = typeof(BrowserHelperObject).Assembly.GetManifestResourceStream(typeof(BrowserHelperObject).Namespace + ".Resources." + string.Join(".", ressourceNameItems)))
            {
                byte[] buffer = new byte[1024];
                int nb = stream.Read(buffer, 0, buffer.Length);

                while (nb > 0)
                {
                    ressourceValue += Encoding.UTF8.GetString(buffer, 0, nb);
                    nb = stream.Read(buffer, 0, buffer.Length);
                }
            }

            return ressourceValue;
        }
    }
}
