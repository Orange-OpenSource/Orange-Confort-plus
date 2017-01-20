// <copyright file="MF.cs" company="Orange SA">
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

    public enum MF : uint
    {
        INSERT = 0x00000000,
        CHANGE = 0x00000080,
        APPEND = 0x00000100,
        DELETE = 0x00000200,
        REMOVE = 0x00001000,
        BYCOMMAND = 0x00000000,
        BYPOSITION = 0x00000400,
        SEPARATOR = 0x00000800,
        ENABLED = 0x00000000,
        GRAYED = 0x00000001,
        DISABLED = 0x00000002,
        UNCHECKED = 0x00000000,
        CHECKED = 0x00000008,
        USECHECKBITMAPS = 0x00000200,
        STRING = 0x00000000,
        BITMAP = 0x00000004,
        OWNERDRAW = 0x00000100,
        POPUP = 0x00000010,
        MENUBARBREAK = 0x00000020,
        MENUBREAK = 0x00000040,
        UNHILITE = 0x00000000,
        HILITE = 0x00000080,
        DEFAULT = 0x00001000,
        SYSMENU = 0x00002000,
        HELP = 0x00004000,
        RIGHTJUSTIFY = 0x00004000,
        MOUSESELECT = 0x00008000
    }
}
