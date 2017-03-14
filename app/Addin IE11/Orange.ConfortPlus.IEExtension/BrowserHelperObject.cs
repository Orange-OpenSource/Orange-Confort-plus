// <copyright file="BrowserHelperObject.cs" company="Orange SA">
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
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Runtime.InteropServices;
    using System.Runtime.InteropServices.Expando;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.Win32;
    using mshtml;
    using Orange.ConfortPlus.IEExtension.Interfaces;
    using SHDocVw;

    /// <summary>
    /// Browser Helper Object that implements the confort+ service
    /// </summary>
    /// <remarks>
    /// Execution is launched with an Ole command (command button registered)
    /// </remarks>
    [ComVisible(true)]
    [Guid("FCD2E6D1-AEE3-4468-97E8-D2F0908B6A87")]
    [ClassInterface(ClassInterfaceType.None)]
    [ProgId("Confort+")]
    public class BrowserHelperObject : IObjectWithSite, IOleCommandTarget
    {
        /// <summary>
        /// lock object for processing the service
        /// </summary>
        private static object _processingLock = new object();

        /// <summary>
        /// counter of page loaded
        /// </summary>
        private int pageCounter = 0;

        /// <summary>
        /// counter of objects loaded
        /// </summary>
        private int objCounter = 0;
		
        /// <summary>
        /// StorageInfo to save user settings
        /// </summary>
        private StorageInfo info = new StorageInfo();

        #region IObjectWithSite

        /// <summary>
        /// webBrowser of current tab
        /// </summary>
        private IWebBrowser2 webBrowser;

        /// <summary>
        /// site
        /// </summary>
        private object site;

        /// <summary>
        /// Initialize the hook on webBrowser and register document events
        /// </summary>
        /// <param name="site">site</param>
        /// <returns></returns>
        public int SetSite(object site)
        {
            this.site = site;

            if (this.site != null)
            {
                Orange.ConfortPlus.IEExtension.Interfaces.IServiceProvider serviceProv = (Orange.ConfortPlus.IEExtension.Interfaces.IServiceProvider)this.site;
                Guid guidIWebBrowserApp = Marshal.GenerateGuidForType(typeof(IWebBrowserApp));
                Guid guidIWebBrowser2 = Marshal.GenerateGuidForType(typeof(IWebBrowser2));
                IntPtr intPtr;
                serviceProv.QueryService(ref guidIWebBrowserApp, ref guidIWebBrowser2, out intPtr);

                this.webBrowser = (IWebBrowser2)Marshal.GetObjectForIUnknown(intPtr);

                DWebBrowserEvents2_Event browserEvent = (DWebBrowserEvents2_Event)this.webBrowser;

                browserEvent.DocumentComplete += this.OnDocumentComplete;

                browserEvent.BeforeNavigate2 += this.OnBeforeNavigate2;
                browserEvent.DownloadBegin += this.OnDownloadBegin;
                browserEvent.DownloadComplete += this.OnDownloadComplete;
            }
            else
            {
				if (this.webBrowser != null)
				{
					DWebBrowserEvents2_Event browserEvent = (DWebBrowserEvents2_Event)this.webBrowser;

					browserEvent.DocumentComplete -= this.OnDocumentComplete;

					browserEvent.BeforeNavigate2 -= this.OnBeforeNavigate2;
					browserEvent.DownloadBegin -= this.OnDownloadBegin;
					browserEvent.DownloadComplete -= this.OnDownloadComplete;

					this.webBrowser = null;
				}
            }

            return 0;
        }

        /// <summary>
        /// get the site hooked in setsite
        /// </summary>
        /// <param name="guid"></param>
        /// <param name="ppvSite"></param>
        /// <returns></returns>
        public int GetSite(ref Guid guid, out IntPtr ppvSite)
        {
            IntPtr punk = Marshal.GetIUnknownForObject(this.webBrowser);
            int hr = Marshal.QueryInterface(punk, ref guid, out ppvSite);
            Marshal.Release(punk);
            return hr;
        }

        #endregion

        #region IOleCommandTarget

        /// <summary>
        /// Unused
        /// </summary>
        /// <param name="pguidCmdGroup"></param>
        /// <param name="cCmds"></param>
        /// <param name="prgCmds"></param>
        /// <param name="pCmdText"></param>
        /// <returns></returns>
        public int QueryStatus(IntPtr pguidCmdGroup, uint cCmds, ref OLECMD prgCmds, IntPtr pCmdText)
        {
            return 0;
        }

        /// <summary>
        /// Execute a process on IE command button click
        /// </summary>
        /// <param name="pguidCmdGroup">The unique identifier of the command group</param>
        /// <param name="nCmdID">The command to be executed. This command must belong to the group specified with pguidCmdGroup.</param>
        /// <param name="nCmdexecopt">Specifies how the object should execute the command</param>
        /// <param name="pvaIn">input arguments</param>
        /// <param name="pvaOut">command output</param>
        /// <returns></returns>
        public int Exec(IntPtr pguidCmdGroup, uint nCmdID, uint nCmdexecopt, IntPtr pvaIn, IntPtr pvaOut)
        {
            try
            {
                // 1. Toggle Service State
                this.ToggleServiceState();

                // 2. process Service
                this.ProcessService();
            }
            catch (Exception ex)
            {
                this.LogError("Exec", ex);
            }

            return 0;
        }

        #endregion

        #region events

        /// <summary>
        /// Raised when document is completed
        /// </summary>
        /// <param name="pDisp">site</param>
        /// <param name="URL">URL of document completed</param>
        private void OnDocumentComplete(object pDisp, ref object URL)
        {
			this.pageCounter--;

            if (pDisp != this.site)
            {
                return;
            }

            IHTMLDocument2 document2 = this.webBrowser.Document as IHTMLDocument2;
            IHTMLWindow2 window = document2.parentWindow;
            window.onfocus = new EventHandler(this.OnFocus);
        }
        
        /// <summary>
        /// Raised when download is completed
        /// </summary>
        private void OnDownloadComplete()
        {
			this.objCounter--;
            
            if (this.pageCounter == 0 && this.objCounter == 0)
            {
                this.OnPageLoaded();
            }
        }

        /// <summary>
        /// Raised when download begin
        /// </summary>
        private void OnDownloadBegin()
        {
			this.objCounter++;
        }

        /// <summary>
        /// Raised before navigation
        /// </summary>
        /// <param name="pDisp"></param>
        /// <param name="URL"></param>
        /// <param name="Flags"></param>
        /// <param name="TargetFrameName"></param>
        /// <param name="PostData"></param>
        /// <param name="Headers"></param>
        /// <param name="Cancel"></param>
        private void OnBeforeNavigate2(object pDisp, ref object URL, ref object Flags, ref object TargetFrameName, ref object PostData, ref object Headers, ref bool Cancel)
        {
			this.pageCounter++;
        }

        #endregion

        /// <summary>
        /// Raised when current tab get focus
        /// </summary>
        private void OnFocus()
        {
            try
            {
                this.LogInfo("OnFocus");
				this.ProcessService();
            }
            catch (Exception ex)
            {
                this.LogError("OnFocus", ex);
            }
        }
		
        /// <summary>
        /// Raised when current page is loaded
        /// </summary>
        private void OnPageLoaded()
        {
            try
            {
                this.LogInfo("OnPageLoaded");
                this.ProcessService();
            }
            catch (Exception ex)
            {
                this.LogError("OnPageLoaded", ex);
            }
        }

        /// <summary>
        /// Toggle the service state. service state is saved
        /// </summary>
        private void ToggleServiceState()
        {
            // 1. toogle the state value
            this.info.Enabled = !this.info.Enabled;
            this.LogInfo("1. ToggleServiceState : service is {0} enabled", this.info.Enabled ? string.Empty : "not");

            // change the button icon
            // TODO change the button icon
        }

        /// <summary>
        /// Load confort+ toolbar
        /// </summary>
        /// <remarks>
        /// Execute confort+ javascript and register to onmessage event
        /// </remarks>
        private void LoadToolbar()
        {
            IHTMLDocument2 document = this.webBrowser.Document as IHTMLDocument2;
            IHTMLWindow2 window = document.parentWindow;

            this.LogInfo("5. load the toolbar");

            StringBuilder sb = new StringBuilder();

            sb.Append(Tools.GetStringFromRessource("js/hebergement.js"));
            sb.Append(Tools.GetStringFromRessource("js/ToolbarStrings.js"));
            sb.Append(Tools.GetStringFromRessource("js/UciUserPref.js"));
            sb.Append(Tools.GetStringFromRessource("js/UciSimpleStorage.js"));
            sb.Append(Tools.GetStringFromRessource("language/en.js"));
            sb.Append(Tools.GetStringFromRessource("language/es.js"));
            sb.Append(Tools.GetStringFromRessource("language/fr.js"));
            sb.Append(Tools.GetStringFromRessource("js/UciAideMotrice.js"));
            sb.Append(Tools.GetStringFromRessource("js/UciCouleur.js"));
            sb.Append(Tools.GetStringFromRessource("js/UciApparence.js"));
            sb.Append(Tools.GetStringFromRessource("js/UciTypographie.js"));
            sb.Append(Tools.GetStringFromRessource("js/UciValidation.js"));
            sb.Append(Tools.GetStringFromRessource("js/UciIhm.js")); 
            sb.Append(Tools.GetStringFromRessource("js/mask.js"));
            sb.Append(Tools.GetStringFromRessource("js/toolbar.js"));

            window.execScript(sb.ToString());

            IHTMLWindow3 window3 = document.parentWindow as IHTMLWindow3;

            if (window3 != null)
            {
                // front events subscription
                bool res = window3.attachEvent("onmessage", new ObjectEventHandler(this.OnMessage));
            }
            else
            {
                this.LogInfo("window3 is null");
            }
        }
		
        /// <summary>
        /// Process the service
        /// </summary>
        private void ProcessService()
        {
            lock (_processingLock)
            {
                IHTMLDocument2 document = this.webBrowser.Document as IHTMLDocument2;
                IHTMLDocument3 document3 = this.webBrowser.Document as IHTMLDocument3;

                IHTMLWindow2 window = document.parentWindow;

                // 2. is service blocked
                this.LogInfo("2. is service blocked");

                bool serviceBlocked = false;

                string script = "var toolbarServer = document.querySelector(\"script[src*='crossdom/js']\");"
	                   + "var head = document.querySelector(\"head\");"
	                   + "var body = document.querySelector(\"body\");"
                       + "if (toolbarServer != null || head == null || body == null) document.serviceBlocked=true;";

                window.execScript(script);

                var property = ((IExpando)document).GetProperty("serviceBlocked", BindingFlags.Default);

                if (property != null)
                {
                    object propertyValue = property.GetValue(document, null);
                    serviceBlocked = propertyValue != null;
                }

                if (serviceBlocked)
                {
                    this.LogInfo("service is blocked");
                    return;
                }

                this.LogInfo("service is not blocked");
            
                this.info.Refresh();

                // 3. is service enabled
                if (this.info.Enabled)
                {
                    this.LogInfo("3. service is enabled");

                    // 4. toolbar exists?
                    var accessibilitytoolbarGraphic = document3.getElementById("accessibilitytoolbarGraphic");
					var accessibilitytoolbarLoading = document3.getElementById("accessibilitytoolbarLoading");
                    if (accessibilitytoolbarGraphic  == null && accessibilitytoolbarLoading == null)
                    {
                        this.LogInfo("4. toolbar doesn't exist");
						
						this.LogInfo("insert accessibilitytoolbarLoading");
						
						// 5. load the toolbar
						script = "var d = document.createElement(\"div\");";
						script += "d.id=\"accessibilitytoolbarLoading\";";
						script += "document.body.insertBefore(d, document.body.firstChild);";
						window.execScript(script);
				

                        // 5. load the toolbar
                        this.LoadToolbar();

                        // 6. enable toolbar
                        this.LogInfo("6. enable toolbar");

                        window.execScript("accessibilitytoolbar.start();");
                    }
                    else
                    {
                        this.LogInfo("4. toolbar exists");

                        // 6. enable toolbar
                        this.LogInfo("6. enable toolbar");
                    }
                }
                else
                {
                    this.LogInfo("3. service is disabled");

                    var accessibilitytoolbarGraphic = document3.getElementById("accessibilitytoolbarGraphic");
                    if (accessibilitytoolbarGraphic  != null)
                    {
                        this.LogInfo("7. Disable toolbar");
						
                        // 7. Disable toolbar
                        window.execScript("accessibilitytoolbar.close();if (document.getElementById(\"a11yUserPrefStyle\")) document.getElementsByTagName(\"head\")[0].removeChild(document.getElementById(\"a11yUserPrefStyle\"));");
                    }
					
					this.LogInfo("7. remove accessibilitytoolbarLoading");
					script = "if (document.getElementById(\"accessibilitytoolbarLoading\"))";
					script += "document.getElementsByTagName(\"body\")[0].removeChild(document.getElementById(\"accessibilitytoolbarLoading\"));";
					window.execScript(script);
						
                }
            }
			
        }

        /// <summary>
        /// Raised when a message is sent from the front process
        /// </summary>
        /// <param name="e"></param>
        /// <remarks>
        /// Only confort+ message are processed
        /// </remarks>
        private void OnMessage(object e)
        {
            try
            {
                MessageInfo message = MessageInfo.Create(e);

                

                IHTMLDocument2 document = this.webBrowser.Document as IHTMLDocument2;
                IHTMLWindow2 window = document.parentWindow;

                switch (message.Message)
                {
                    case "orangeconfort+userprefget":
						this.LogInfo("orangeconfort+userprefget: Origin={0} Value={1} UserPref={2} blacklist={3}", message.Origin, message.Value,  this.info.UserPref, this.info.Blacklist);
					
                        UriBuilder uriBuilder = new UriBuilder(message.Origin);

                        this.LogInfo("domain={0} blacklist flag={1}", uriBuilder.Host, this.info.GetBlackListFlag(uriBuilder.Host));


                        string script = "function timeoutSetStoredValue() {"
                            + "if (!accessibilitytoolbar || accessibilitytoolbar == null || !accessibilitytoolbar.userPref || accessibilitytoolbar.userPref == null)"
                            + "setTimeout(timeoutSetStoredValue,500);"
                            + "else accessibilitytoolbar.userPref.setStoredValue(\"" + this.info.UserPref + this.info.GetBlackListFlag(uriBuilder.Host) + "\");"
                            + "}"
                            +"setTimeout(timeoutSetStoredValue,500);";

                        window.execScript(script);
						
                        break;

                    case "orangeconfort+userprefsave":
                        this.LogInfo("orangeconfort+userprefsave: Value=" + message.Value);
                        this.info.UserPref = message.Value;
                        break;

                    case "orangeconfort+blacklistsave":
                        this.LogInfo("orangeconfort+blacklistsave: Value=" + message.Value);
                        this.info.ToggleInBlacklist(message.Value);
                        break;

                    case "orangeconfort+help":
						this.LogInfo("orangeconfort+help: Value=" + message.Value);
                        this.webBrowser.Navigate2("cdu://Resources/help/help_" + message.Value + ".html", 2048);
                        break;
                }
            }
            catch (Exception ex)
            {
                this.LogError("ToggleService", ex);
            }
        }

        #region Log

        /// <summary>
        /// Log an error to the console
        /// </summary>
        /// <param name="message">error message to write to the console</param>
        private void LogError(string message)
        {
            this.WriteToConsole(message, "error");
        }

        /// <summary>
        /// Log an error to the console
        /// </summary>
        /// <param name="prefix">text to write in front of exception</param>
        /// <param name="ex">Exception to log</param>
        private void LogError(string prefix, Exception ex)
        {
            this.WriteToConsole(prefix + " Exception : " + ex.Message + "\n" + ex.StackTrace, "error");
        }

        /// <summary>
        /// Log an info to the console
        /// </summary>
        /// <param name="format">text format</param>
        /// <param name="parameters">parameters</param>
        private void LogInfo(string format, params object[] parameters)
        {
            this.WriteToConsole(string.Format(format, parameters), "info");
        }

        /// <summary>
        /// Log an info to the console
        /// </summary>
        /// <param name="message">info to write to the console</param>
        private void LogInfo(string message)
        {
            this.WriteToConsole(message, "info");
        }

        /// <summary>
        /// Write a text to the console
        /// </summary>
        /// <param name="message">message to write</param>
        /// <param name="commande">type of message</param>
        private void WriteToConsole(string message, string commande)
        {
        
            /// IHTMLDocument2 document = this.webBrowser.Document as IHTMLDocument2;
            /// IHTMLWindow2 window = document.parentWindow;

            /// window.execScript(
            ///    string.Format(
            ///    "console.{0}(\"{1}\");",
            ///    commande,
            ///    message.Replace("\"", "\\\"").Replace(";", " ").Replace("\n", " ")));               
        }

        #endregion
    }
}


