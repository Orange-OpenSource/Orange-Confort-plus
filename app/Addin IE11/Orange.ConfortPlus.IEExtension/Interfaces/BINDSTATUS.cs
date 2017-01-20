// <copyright file="BINDSTATUS.cs" company="Orange SA">
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

    public enum BINDSTATUS : uint
    {
          FINDINGRESOURCE             = 1,
          CONNECTING,
          REDIRECTING,
          BEGINDOWNLOADDATA,
          DOWNLOADINGDATA,
          ENDDOWNLOADDATA,
          BEGINDOWNLOADCOMPONENTS,
          INSTALLINGCOMPONENTS,
          ENDDOWNLOADCOMPONENTS,
          USINGCACHEDCOPY,
          SENDINGREQUEST,
          CLASSIDAVAILABLE,
          MIMETYPEAVAILABLE,
          CACHEFILENAMEAVAILABLE,
          BEGINSYNCOPERATION,
          ENDSYNCOPERATION,
          BEGINUPLOADDATA,
          UPLOADINGDATA,
          ENDUPLOADINGDATA,
          PROTOCOLCLASSID,
          ENCODING,
          VERFIEDMIMETYPEAVAILABLE,
          CLASSINSTALLLOCATION,
          DECODING,
          LOADINGMIMEHANDLER,
          CONTENTDISPOSITIONATTACH,
          FILTERREPORTMIMETYPE,
          CLSIDCANINSTANTIATE,
          IUNKNOWNAVAILABLE,
          DIRECTBIND,
          RAWMIMETYPE,
          PROXYDETECTING,
          ACCEPTRANGES,
          COOKIE_SENT,
          COMPACT_POLICY_RECEIVED,
          COOKIE_SUPPRESSED,
          COOKIE_STATE_UNKNOWN,
          COOKIE_STATE_ACCEPT,
          COOKIE_STATE_REJECT,
          COOKIE_STATE_PROMPT,
          COOKIE_STATE_LEASH,
          COOKIE_STATE_DOWNGRADE,
          POLICY_HREF,
          P3P_HEADER,
          SESSION_COOKIE_RECEIVED,
          PERSISTENT_COOKIE_RECEIVED,
          SESSION_COOKIES_ALLOWED,
          CACHECONTROL,
          CONTENTDISPOSITIONFILENAME,
          MIMETEXTPLAINMISMATCH,
          PUBLISHERAVAILABLE,
          DISPLAYNAMEAVAILABLE,
          SSLUX_NAVBLOCKED,
          SERVER_MIMETYPEAVAILABLE,
          SNIFFED_CLASSIDAVAILABLE,
          _64BIT_PROGRESS,

          // LAST                        = 64BIT_PROGRESS,
          RESERVED_0,
          RESERVED_1,
          RESERVED_2,
          RESERVED_3,
          RESERVED_4,
          RESERVED_5,
          RESERVED_6,
          RESERVED_7,
          RESERVED_8,
          RESERVED_9

          // LAST_PRIVATE                = RESERVED_9
    }
}
