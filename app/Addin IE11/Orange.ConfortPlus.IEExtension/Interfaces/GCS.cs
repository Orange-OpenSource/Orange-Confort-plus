// <copyright file="GCS.cs" company="Orange SA">
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

    public enum GCS : uint
    {
        VERBA = 0x00000000,     // canonical verb
        HELPTEXTA = 0x00000001,     // help text (for status bar)
        VALIDATEA = 0x00000002,     // validate command exists
        VERBW = 0x00000004,     // canonical verb (unicode)
        HELPTEXTW = 0x00000005,     // help text (unicode version)
        VALIDATEW = 0x00000006,     // validate command exists (unicode)
        UNICODE = 0x00000004,     // for bit testing - Unicode string
        VERB = GCS.VERBA,
        HELPTEXT = GCS.HELPTEXTA,
        VALIDATE = GCS.VALIDATEA
    }
}
