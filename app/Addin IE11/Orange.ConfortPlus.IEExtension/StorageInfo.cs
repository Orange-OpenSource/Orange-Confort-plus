// <copyright file="StorageInfo.cs" company="Orange SA">
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
    using System.Collections.Generic;
    using System.Runtime.InteropServices;
    using System.Text;
    using System.Globalization;
    
    using Microsoft.Win32;
   
    /// <summary>
    /// Wrapper to local storage (Registry)
    /// </summary>
    public class StorageInfo
    {
        /// Default cookie value first bit set toolbar enable, second one set default lang, third one set to no profile 
        private const string DEFAULT_USERPREF = "1|0|0";
        
        private const string TRUE_VALUE = "1";
        private const string FALSE_VALUE = "0";

        private const string DATA_REGISTRY_PATH = "Software\\Orange.ConfortPlus.IEExtension";        

        private const string ENABLED_REGISTRY_KEY = "enabled";
        private const string USERPREF_REGISTRY_KEY = "UCI41";
        private const string DEFLANG_REGISTRY_KEY = "LANG";
        private const string BLACKLIST_REGISTRY_KEY = "blacklist";

        private bool enabled = false;
        private string userPref = string.Empty;
        private string lang = "EN";
        private List<string> blacklist = new List<string>();

        private bool isLoaded = false;

        /// <summary>
        /// Create a new StorageInfo. Content is loaded from registry
        /// </summary>
        public StorageInfo()
        {
            this.Load();
        }

        /// <summary>
        /// Get or set service enability value. Value is saved on set, loaded on get.
        /// </summary>
        public bool Enabled 
        { 
            get
            {
                this.Load();
                return this.enabled;
            }

            set
            {
                this.enabled = value;
                this.Save();
            }
        }

        /// <summary>
        /// Get or set user settings. Value is saved on set, loaded on get.
        /// </summary>
        public string UserPref
        {
            get
            {
                this.Load();
                return this.userPref;
            }

            set
            {
                this.userPref = value;
                this.Save();
            }
        }


        /// <summary>
        /// Get or set user settings. Value is saved on set, loaded on get.
        /// </summary>
        public string Lang
        {
            get
            {
                this.Load();
                return this.lang;
            }

            set
            {
                this.lang = value;
                this.Save();
            }
        }

        /// <summary>
        /// IEGetWriteableHKCU
        /// </summary>
        /// <param name="phKey"></param>
        /// <returns></returns>
        [DllImport("ieframe.dll")]
        public static extern int IEGetWriteableHKCU(ref IntPtr phKey);

        /// <summary>
        /// Get the Blacklist content
        /// </summary>
        public string Blacklist
        {
            get { return string.Join(",", this.blacklist); }
        }

        /// <summary>
        /// Toggle a domain in the blacklist. Blacklist is saved
        /// </summary>
        /// <param name="domain">domain to toggle</param>
        /// <remarks>if domain is in black list, it is removed from the blacklist, otherwise, it is added to the blacklist</remarks>
        public void ToggleInBlacklist(string domain)
        {
            this.Load();
            if (this.blacklist.Contains(domain.ToLower()))
            {
                this.blacklist.Remove(domain.ToLower());
            }
            else
            {
                this.blacklist.Add(domain.ToLower());
            }

            this.Save();
        }

        /// <summary>
        /// Get a domain BlackList Flag
        /// </summary>
        /// <param name="domain">domain to test</param>
        /// <returns></returns>
        public string GetBlackListFlag(string domain)
        {
            this.Load();

            return this.blacklist.Contains(domain.ToLower()) ? TRUE_VALUE : FALSE_VALUE;
        }

        #region Load and Save Data

        /// <summary>
        /// Refresh the values from the registry
        /// </summary>
        public void Refresh()
        {
            this.isLoaded = false;
        }

        /// <summary>
        /// Save the values to the registry
        /// </summary>
        private void Save()
        {
            this.Load();

            // In IE 7,8,9,(desktop)10 tabs run in Protected Mode
            // which prohibits writes to HKLM, HKCU.
            // Must ask IE for "Writable" registry section pointer
            // which will be something like HKU/S-1-7***/Software/AppDataLow/
            // In "metro" IE 10 mode, tabs run in "Enhanced Protected Mode"
            // where BHOs are not allowed to run, except in edge cases.
            // see http://blogs.msdn.com/b/ieinternals/archive/2012/03/23/understanding-ie10-enhanced-protected-mode-network-security-addons-cookies-metro-desktop.aspx
            IntPtr phKey = new IntPtr();
            var answer = IEGetWriteableHKCU(ref phKey);
            using (RegistryKey writeableRegistry = RegistryKey.FromHandle(new Microsoft.Win32.SafeHandles.SafeRegistryHandle(phKey, true)))
            {
                RegistryKey registryKey = writeableRegistry.OpenSubKey(DATA_REGISTRY_PATH, true);
                try
                {
                    if (registryKey == null)
                    {
                        registryKey = writeableRegistry.CreateSubKey(DATA_REGISTRY_PATH);
                    }

                    // enabled
                    registryKey.SetValue(ENABLED_REGISTRY_KEY, this.enabled ? TRUE_VALUE : FALSE_VALUE);

                    // userPref
                    registryKey.SetValue(USERPREF_REGISTRY_KEY, this.userPref);

                    // blacklist
                    registryKey.SetValue(BLACKLIST_REGISTRY_KEY, string.Join(",", this.blacklist));
                }
                finally
                {
                    registryKey.Dispose();
                }
            }
        }

        /// <summary>
        /// Load the values from the registry
        /// </summary>
        private void Load()
        {
            if (this.isLoaded)
            {
                return;
            }

            IntPtr phKey = new IntPtr();
            var answer = IEGetWriteableHKCU(ref phKey);
            using (RegistryKey writeableRegistry = RegistryKey.FromHandle(new Microsoft.Win32.SafeHandles.SafeRegistryHandle(phKey, true)))
            {
                using (RegistryKey registryKey = writeableRegistry.OpenSubKey(DATA_REGISTRY_PATH, true))
                {
                    if (registryKey == null)
                    {
                        this.enabled = false;
                    }
                    else
                    {
                        object registryValue;

                        registryValue = registryKey.GetValue(ENABLED_REGISTRY_KEY, null);
                        this.enabled = registryValue != null && registryValue.ToString() == TRUE_VALUE;

                        registryValue = registryKey.GetValue(USERPREF_REGISTRY_KEY, null);
                        this.userPref = registryValue != null ? registryValue.ToString() : DEFAULT_USERPREF;

                        // lang
                        CultureInfo culture = CultureInfo.CurrentCulture;
                        this.lang = culture.Name.Substring(0,2).ToUpper();

                        registryValue = registryKey.GetValue(BLACKLIST_REGISTRY_KEY, null);
                        this.blacklist.Clear();
                        if (registryValue != null)
                        {
                            this.blacklist.AddRange(registryValue.ToString().Split(','));
                        }
                    }
                }
            }

            this.isLoaded = true;
        }

        #endregion
    }
}
