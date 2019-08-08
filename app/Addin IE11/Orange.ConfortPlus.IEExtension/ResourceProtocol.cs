// <copyright file="ResourceProtocol.cs" company="Orange SA">
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
    using System.IO;
    using System.Reflection;
    using System.Runtime.InteropServices;
    using System.Text;

    using Microsoft.Win32;
    using Orange.ConfortPlus.IEExtension.Interfaces;

    /// <summary>
    /// Local custom url protocol which return assembly resource
    /// </summary>
    [Guid("29012BAD-2C58-4DB9-80F1-B51E52DC4A06")]
    [ComVisible(true)]
    [ClassInterface(ClassInterfaceType.None)]
    public class ResourceProtocol : IInternetProtocol, IInternetProtocolRoot, IInternetProtocolInfo
    {
        private const int E_FAIL = unchecked((int)0x80004005);

        /// <summary>
        /// content stream
        /// </summary>
        private MemoryStream _stream = new MemoryStream();

        private const string IEProtocolsHandlerRegistryPath = @"PROTOCOLS\Handler\";
        private const string Name = "cdu";

        /// <summary>
        /// Get the directory of an url
        /// </summary>
        /// <param name="Url">url to parse</param>
        /// <returns></returns>
        private static string VirtualDirectoryFromBaseUrl(string Url)
        {
            int loc = Url.LastIndexOf('/');
            if (loc < 0)
            {
                return string.Empty;
            }

            return Url.Substring(0, loc);
        }
        
        /// <summary>
        /// Initialize the content stream
        /// </summary>
        /// <param name="szURL">URL called</param>
        /// <param name="sink"></param>
        /// <param name="pOIBindInfo"></param>
        /// <param name="grfPI"></param>
        /// <param name="dwReserved"></param>
        /// <remarks>
        /// The name of the resource is defined from the url. content stream is filled with resource stream. content-type is defined from file extension.
        /// </remarks>
        public void Start(string szURL, IInternetProtocolSink sink, IInternetBindInfo pOIBindInfo, uint grfPI, uint dwReserved)
        {
            try
            {
                Assembly assembly = Assembly.GetExecutingAssembly();
                AssemblyName assemblyName = assembly.GetName();

                UriBuilder uriBuilder = new UriBuilder(szURL);

                string resourcePath = assemblyName.Name + ".Resources" + uriBuilder.Path.Replace("/", ".");

                Stream s = assembly.GetManifestResourceStream(resourcePath);

                byte[] buffer = new byte[s.Length];
                int nb = s.Read(buffer, 0, buffer.Length);
                this._stream.Write(buffer, 0, nb);
                this._stream.Position = 0;

                string contentType = "text/html";
                switch (uriBuilder.Path.Substring(uriBuilder.Path.Length - 3))
                {
                    case "png":
                        contentType = "image/png";
                        break;
                    case "gif":
                        contentType = "image/gif";
                        break;
                    case "css":
                        contentType = "text/css";
                        break;
                    case "eot":
                        contentType = "application/font-woff";
                        break;
                }

                sink.ReportProgress((uint)BINDSTATUS.VERFIEDMIMETYPEAVAILABLE, contentType);

                sink.ReportData(BSCF.BSCF_LASTDATANOTIFICATION, (uint)this._stream.Length, (uint)this._stream.Length);
                sink.ReportResult(0, 200, null);
            }
            catch (Exception ex)
            {
                sink.ReportResult(E_FAIL, 0, ex.Message);
            }
        }

        /// <summary>
        /// Read the content stream
        /// </summary>
        /// <param name="pv"></param>
        /// <param name="cb"></param>
        /// <param name="pcbRead"></param>
        /// <returns></returns>
        public uint Read(System.IntPtr pv, uint cb, out uint pcbRead)
        {
            byte[] streamBuffer = new byte[0x8000];

            pcbRead = (uint)Math.Min(cb, streamBuffer.Length);
            pcbRead = (uint)this._stream.Read(streamBuffer, 0, (int)pcbRead);
            Marshal.Copy(streamBuffer, 0, pv, (int)pcbRead);

            return pcbRead == 0 ? HRESULT.S_FALSE : HRESULT.S_OK;
        }

        /// <summary>
        /// Seek
        /// </summary>
        /// <param name="dlibMove"></param>
        /// <param name="dwOrigin"></param>
        /// <param name="plibNewPosition"></param>
        public void Seek(LARGE_INTEGER dlibMove, uint dwOrigin, out ULARGE_INTEGER plibNewPosition)
        {
            plibNewPosition = new ULARGE_INTEGER();
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        public void Resume()
        {
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        public void Terminate(uint dwOptions)
        {
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        public void LockRequest(uint dwOptions)
        {
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        public void UnlockRequest()
        {
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        public void Abort(int hrReason, uint dwOptions)
        {
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        public void Suspend()
        {
        }

        /// <summary>
        /// Not implemented
        /// </summary>
        public void Continue(ref PROTOCOLDATA pProtocolData)
        {
        }

        /// <summary>
        /// ParseUrl
        /// </summary>
        /// <param name="pwzUrl"></param>
        /// <param name="ParseAction"></param>
        /// <param name="dwParseFlags"></param>
        /// <param name="pwzResult"></param>
        /// <param name="cchResult"></param>
        /// <param name="pcchResult"></param>
        /// <param name="dwReserved"></param>
        /// <returns></returns>
        /// <remarks>
        /// Implement security rule to avoid alert with non HTTPS content.
        /// </remarks>
        public uint ParseUrl(string pwzUrl, PARSEACTION ParseAction, uint dwParseFlags, IntPtr pwzResult, uint cchResult, out uint pcchResult, uint dwReserved)
        {
            string temp = null;

            switch (ParseAction)
            {
                case PARSEACTION.PARSE_CANONICALIZE:
                case PARSEACTION.PARSE_FRIENDLY:
                case PARSEACTION.PARSE_DOCUMENT:
                case PARSEACTION.PARSE_ENCODE:
                case PARSEACTION.PARSE_DECODE:
                case PARSEACTION.PARSE_PATH_FROM_URL:
                case PARSEACTION.PARSE_URL_FROM_PATH:
                case PARSEACTION.PARSE_ESCAPE:
                case PARSEACTION.PARSE_UNESCAPE:
                case PARSEACTION.PARSE_SECURITY_URL:
                    temp = pwzUrl;
                    break;
                case PARSEACTION.PARSE_ROOTDOCUMENT:
                    temp = Name + "://";
                    break;
                case PARSEACTION.PARSE_MIME:
                    temp = "text/html";
                    switch (pwzUrl.Substring(pwzUrl.Length - 3))
                    {
                        case "png":
                            temp = "image/png";
                            break;
                        case "gif":
                            temp = "image/gif";
                            break;
                        case "css":
                            temp = "text/css";
                            break;
                        case "eot":
                            temp = "application/font-woff";
                            break;
                    }

                    break;
                case PARSEACTION.PARSE_SCHEMA:
                    temp = Name;
                    break;
            }

            Marshal.Copy(temp.ToCharArray(), 0, pwzResult, temp.Length);

            pcchResult = (uint)temp.Length + 1;

            return HRESULT.S_OK;
        }

        /// <summary>
        /// CombineUrl
        /// </summary>
        /// <param name="pwzBaseUrl"></param>
        /// <param name="pwzRelativeUrl"></param>
        /// <param name="dwCombineFlags"></param>
        /// <param name="pwzResult"></param>
        /// <param name="cchResult"></param>
        /// <param name="pcchResult"></param>
        /// <param name="dwReserved"></param>
        /// <returns></returns>
        public uint CombineUrl(string pwzBaseUrl, string pwzRelativeUrl, uint dwCombineFlags, IntPtr pwzResult, uint cchResult, out uint pcchResult, uint dwReserved)
        {
            string temp = null;
            
			if (pwzRelativeUrl.StartsWith("#"))
			{
				temp = pwzBaseUrl + pwzRelativeUrl;
			}
			else
			{
				temp = VirtualDirectoryFromBaseUrl(pwzBaseUrl) + (pwzRelativeUrl.Substring(0, 1) != "/" ? "/" : string.Empty) + pwzRelativeUrl;
			}
			
                
            if (pwzRelativeUrl.IndexOf(":") > 0)
            {
                temp = pwzRelativeUrl;
            }
                
            if (temp.Length > cchResult)
            {
                pcchResult = 0;
                return HRESULT.S_FALSE;
            }

            Marshal.Copy(temp.ToCharArray(), 0, pwzResult, temp.Length);
            Marshal.WriteInt32(pwzResult, temp.Length * 2, 0);
            pcchResult = (uint)temp.Length + 1;
            return HRESULT.S_OK;
        }

        /// <summary>
        /// CompareUrl
        /// </summary>
        /// <param name="pwzUrl1"></param>
        /// <param name="pwzUrl2"></param>
        /// <param name="dwCompareFlags"></param>
        /// <returns></returns>
        public uint CompareUrl(string pwzUrl1, string pwzUrl2, uint dwCompareFlags)
        {
            return (uint)pwzUrl1.CompareTo(pwzUrl2);
        }

        public uint QueryInfo(string pwzUrl, QUERYOPTION queryOption, uint dwQueryFlags, IntPtr pBuffer, uint cbBuffer, ref uint pcbBuf, uint dwReserved)
        {
            string temp = string.Empty;
            switch (queryOption)
            {
                case QUERYOPTION.QUERY_IS_SECURE:
                    temp = "1";
                    break;
            }

            if (!string.IsNullOrEmpty(temp))
            {
                Marshal.Copy(temp.ToCharArray(), 0, pBuffer, temp.Length);

                pcbBuf = (uint)temp.Length + 1;

                return HRESULT.S_OK;
            }

            return HRESULT.INET_E_DEFAULT_ACTION;
        }
    }
}
