// <copyright file="PARSEACTION.cs" company="Orange SA">
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
namespace Orange.ConfortPlus.IEExtension.Interfaces
{
    using System;

    public enum PARSEACTION
    {
        PARSE_CANONICALIZE = 1,
        PARSE_FRIENDLY = PARSE_CANONICALIZE + 1,
        PARSE_SECURITY_URL = PARSE_FRIENDLY + 1,
        PARSE_ROOTDOCUMENT = PARSE_SECURITY_URL + 1,
        PARSE_DOCUMENT = PARSE_ROOTDOCUMENT + 1,
        PARSE_ANCHOR = PARSE_DOCUMENT + 1,
        PARSE_ENCODE = PARSE_ANCHOR + 1,
        PARSE_DECODE = PARSE_ENCODE + 1,
        PARSE_PATH_FROM_URL = PARSE_DECODE + 1,
        PARSE_URL_FROM_PATH = PARSE_PATH_FROM_URL + 1,
        PARSE_MIME = PARSE_URL_FROM_PATH + 1,
        PARSE_SERVER = PARSE_MIME + 1,
        PARSE_SCHEMA = PARSE_SERVER + 1,
        PARSE_SITE = PARSE_SCHEMA + 1,
        PARSE_DOMAIN = PARSE_SITE + 1,
        PARSE_LOCATION = PARSE_DOMAIN + 1,
        PARSE_SECURITY_DOMAIN = PARSE_LOCATION + 1,
        PARSE_ESCAPE = PARSE_SECURITY_DOMAIN + 1,
        PARSE_UNESCAPE = PARSE_ESCAPE + 1,
    }
}
