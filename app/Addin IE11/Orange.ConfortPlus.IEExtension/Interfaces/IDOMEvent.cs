// <copyright file="IDOMEvent.cs" company="Orange SA">
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
    using System.Text;

    using mshtml;

    [TypeLibType(4160)]
    [Guid("305104BA-98B5-11CF-BB82-00AA00BDCE0B")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIDispatch)]
    public interface IDOMEvent
    {
        [DispId(1001)]
        bool bubbles { get; }
        [DispId(1002)]
        bool cancelable { get; }
        [DispId(1014)]
        bool cancelBubble { get; set; }
        [DispId(1003)]
        IEventTarget currentTarget { get; }
        [DispId(1004)]
        bool defaultPrevented { get; }
        [DispId(1005)]
        ushort eventPhase { get; }
        [DispId(1013)]
        bool isTrusted { get; }
        [DispId(1015)]
        IHTMLElement srcElement { get; }
        [DispId(1006)]
        IEventTarget target { get; }
        [DispId(1007)]
        ulong timeStamp { get; }
        [DispId(1008)]
        string type { get; }

        [DispId(1009)]
        void initEvent(string eventType, bool canBubble, bool cancelable);
        [DispId(1010)]
        void preventDefault();
        [DispId(1012)]
        void stopImmediatePropagation();
        [DispId(1011)]
        void stopPropagation();
    }
}
