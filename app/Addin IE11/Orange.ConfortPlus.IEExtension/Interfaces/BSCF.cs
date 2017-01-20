// <copyright file="BSCF.cs" company="Orange SA">
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

    public enum BSCF : uint
    {
        BSCF_FIRSTDATANOTIFICATION = 0,
        BSCF_INTERMEDIATEDATANOTIFICATION = 1,
        BSCF_LASTDATANOTIFICATION = 2,
        BSCF_DATAFULLYAVAILABLE = 3,
        BSCF_AVAILABLEDATASIZEUNKNOWN = 4,
    }
}
