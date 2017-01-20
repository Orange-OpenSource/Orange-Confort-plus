// <copyright file="IEventTarget.cs" company="Orange SA">
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
    using System.Runtime.InteropServices;

    [Guid("305104B9-98B5-11CF-BB82-00AA00BDCE0B")]
    [TypeLibType(4160)]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIDispatch)]
    public interface IEventTarget
    {
        [DispId(-2147417602)]
        void addEventListener(string type, object listener, bool useCapture);
        [DispId(-2147417600)]
        bool dispatchEvent(IDOMEvent evt);
        [DispId(-2147417601)]
        void removeEventListener(string type, object listener, bool useCapture);
    }
}
