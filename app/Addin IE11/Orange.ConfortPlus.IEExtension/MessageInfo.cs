// <copyright file="MessageInfo.cs" company="Orange SA">
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
namespace Orange.ConfortPlus.IEExtension
{
    using System;

    /// <summary>
    /// Wrapper on message send via onmessage event
    /// </summary>
    public class MessageInfo
    {
        /// <summary>
        /// Create an ampty message
        /// </summary>
        private MessageInfo() 
        { 
        }

        /// <summary>
        /// Get the message name
        /// </summary>
        public string Message { get; private set; }

        /// <summary>
        /// Get the message value
        /// </summary>
        public string Value { get; private set; }

        /// <summary>
        /// Get the message origin
        /// </summary>
        public string Origin { get; private set; }

        /// <summary>
        /// Create a message from object
        /// </summary>
        /// <param name="e">object</param>
        /// <returns>a new MessageInfo</returns>
        public static MessageInfo Create(dynamic e)
        {
            string data = e.data as string;
            string origin = e.origin as string;

            string[] items = data.Split('_');

            return new MessageInfo() { Message = items[0], Value = items.Length > 1 ? items[1] : null, Origin = origin };
        }
    }
}
