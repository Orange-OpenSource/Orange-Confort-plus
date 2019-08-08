// <copyright file="MFS.cs" company="Orange SA">
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
namespace Orange.ConfortPlus.IEExtension.Interfaces
{
    using System;
    
    public enum MFS : uint
    {
        GRAYED = 0x00000003,
        DISABLED = MFS.GRAYED,
        CHECKED = MF.CHECKED,
        HILITE = MF.HILITE,
        ENABLED = MF.ENABLED,
        UNCHECKED = MF.UNCHECKED,
        UNHILITE = MF.UNHILITE,
        DEFAULT = MF.DEFAULT,
        MASK = 0x0000108B,
        HOTTRACKDRAWN = 0x10000000,
        CACHEDBMP = 0x20000000,
        BOTTOMGAPDROP = 0x40000000,
        TOPGAPDROP = 0x80000000,
        GAPDROP = 0xC0000000
    }
}
