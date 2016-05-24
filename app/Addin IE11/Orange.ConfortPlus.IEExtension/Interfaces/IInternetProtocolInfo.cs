// <copyright file="IInternetProtocolInfo.cs" company="Orange SA">
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

    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [Guid("79eac9ec-baf9-11ce-8c82-00aa004ba90b")]
    public interface IInternetProtocolInfo
    {
        [PreserveSig]
        uint ParseUrl(
            [MarshalAs(UnmanagedType.LPWStr)] string pwzUrl,
            PARSEACTION ParseAction,
            uint dwParseFlags,
            IntPtr pwzResult,
            uint cchResult,
            out uint pcchResult,
            uint dwReserved);

        [PreserveSig]
        uint CombineUrl(
          [MarshalAs(UnmanagedType.LPWStr)] string pwzBaseUrl,
          [MarshalAs(UnmanagedType.LPWStr)] string pwzRelativeUrl,
          uint dwCombineFlags,
          IntPtr pwzResult,
          uint cchResult,
          out uint pcchResult,
          uint dwReserved);

        [PreserveSig]
        uint CompareUrl(
          [MarshalAs(UnmanagedType.LPWStr)] string pwzUrl1,
          [MarshalAs(UnmanagedType.LPWStr)] string pwzUrl2,
          uint dwCompareFlags);

        [PreserveSig]
        uint QueryInfo(
           [MarshalAs(UnmanagedType.LPWStr)] string pwzUrl,
           QUERYOPTION OueryOption,
           uint dwQueryFlags,
           IntPtr pBuffer,
           uint cbBuffer,
           ref uint pcbBuf,
           uint dwReserved);
    }
}
