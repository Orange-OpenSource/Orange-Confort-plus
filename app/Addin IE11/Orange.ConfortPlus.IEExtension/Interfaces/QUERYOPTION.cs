// <copyright file="QUERYOPTION.cs" company="Orange SA">
//     Copyright (c) 2016 Orange. 
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

    public enum QUERYOPTION
    {
        QUERY_EXPIRATION_DATE = 1,
        QUERY_TIME_OF_LAST_CHANGE = QUERY_EXPIRATION_DATE + 1,
        QUERY_CONTENT_ENCODING = QUERY_TIME_OF_LAST_CHANGE + 1,
        QUERY_CONTENT_TYPE = QUERY_CONTENT_ENCODING + 1,
        QUERY_REFRESH = QUERY_CONTENT_TYPE + 1,
        QUERY_RECOMBINE = QUERY_REFRESH + 1,
        QUERY_CAN_NAVIGATE = QUERY_RECOMBINE + 1,
        QUERY_USES_NETWORK = QUERY_CAN_NAVIGATE + 1,
        QUERY_IS_CACHED = QUERY_USES_NETWORK + 1,
        QUERY_IS_INSTALLEDENTRY = QUERY_IS_CACHED + 1,
        QUERY_IS_CACHED_OR_MAPPED = QUERY_IS_INSTALLEDENTRY + 1,
        QUERY_USES_CACHE = QUERY_IS_CACHED_OR_MAPPED + 1,
        QUERY_IS_SECURE = QUERY_USES_CACHE + 1,
        QUERY_IS_SAFE = QUERY_IS_SECURE + 1,
    }
}
