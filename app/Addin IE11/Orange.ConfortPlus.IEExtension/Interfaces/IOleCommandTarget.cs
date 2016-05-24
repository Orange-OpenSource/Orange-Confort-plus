// <copyright file="IOleCommandTarget.cs" company="Orange SA">
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

    [ComImport]
    [ComVisible(true)]
    [Guid("B722BCCB-4E68-101B-A2BC-00AA00404770")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    public interface IOleCommandTarget
    {
        [return: MarshalAs(UnmanagedType.I4)]
        [PreserveSig]
        int QueryStatus(
            [In] IntPtr pguidCmdGroup,
            [In, MarshalAs(UnmanagedType.U4)] uint cCmds,
            [In, Out, MarshalAs(UnmanagedType.Struct)] ref OLECMD prgCmds,
            [In, Out] IntPtr pCmdText);

        [return: MarshalAs(UnmanagedType.I4)]
        [PreserveSig]
        int Exec(
            [In] IntPtr pguidCmdGroup,
            [In, MarshalAs(UnmanagedType.U4)] uint nCmdID,
            [In, MarshalAs(UnmanagedType.U4)] uint nCmdexecopt,
            [In] IntPtr pvaIn,
            [In, Out] IntPtr pvaOut);
    }
}
