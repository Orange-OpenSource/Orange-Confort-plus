// <copyright file="BINDINFO.cs" company="Orange SA">
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
    using System.Runtime.InteropServices;
    
    public struct BINDINFO
    {
        public uint cbSize;
        [MarshalAs(UnmanagedType.LPWStr)]
        public string szExtraInfo;
        public STGMEDIUM stgmedData;
        public uint grfBindInfoF;
        [MarshalAs(UnmanagedType.U4)]
        public BINDVERB dwBindVerb;
        [MarshalAs(UnmanagedType.LPWStr)]
        public string szCustomVerb;
        public uint cbStgmedData;
        public uint dwOptions;
        public uint dwOptionsFlags;
        public uint dwCodePage;
        public SECURITY_ATTRIBUTES securityAttributes;
        public Guid iid;
        [MarshalAs(UnmanagedType.IUnknown)]
        public object pUnk;
        public uint dwReserved;
    }
}
