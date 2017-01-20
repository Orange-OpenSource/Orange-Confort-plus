// <copyright file="EventHandler.cs" company="Orange SA">
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
namespace Orange.ConfortPlus.IEExtension
{
    using System;
    using System.Runtime.InteropServices;
    using System.Text;

    using mshtml;

    /// <summary>
    /// COM event handler
    /// </summary>
    [ComVisible(true)]
    [ClassInterface(ClassInterfaceType.None)]
    public class EventHandler
    {
        /// <summary>
        /// Action to launch when event is raised 
        /// </summary>
        private Action action;

        /// <summary>
        /// Create a new EventHandler
        /// </summary>
        /// <param name="action">Action to launch when event is raised</param>
        public EventHandler(Action action)
        {
            this.action = action;
        }

        /// <summary>
        /// Method launched when event is raised
        /// </summary>
        /// <remarks>action is lauched</remarks>
        /// <returns></returns>
        [DispId(0)]
        public object DefaultMethod()
        {
            this.action();

            return null;
        }
    }
}
