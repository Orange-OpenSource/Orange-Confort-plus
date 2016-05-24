// <copyright file="IInternetProtocolRoot.cs" company="Orange SA">
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
    [Guid("79EAC9E3-BAF9-11CE-8C82-00AA004BA90B")]
    public interface IInternetProtocolRoot
    {
        void Start(
            [MarshalAs(UnmanagedType.LPWStr)]string szURL,
           IInternetProtocolSink Sink,
           IInternetBindInfo pOIBindInfo,
           uint grfPI,
           uint dwReserved);

        void Continue(ref PROTOCOLDATA pProtocolData);

        void Abort(int hrReason, uint dwOptions);

        void Terminate(uint dwOptions);

        void Suspend();

        void Resume();
    }
}
