# Orange-Confort-plus
The target of _Orange Confort+_ functionalities is to enhance user experience on web sites, which are already accessible, or still accessible.

_Orange Confort+_ provides these services:

* Typography - user may change: font size, space between words, characters and lines, font-face to Open Dyslexic
* Layout: cancel layout, text align left, numbering list items, modify navigation links appearance, display a reading ruler
* Colors : Modify foreground/background colors
* Behavior: direct access to main content on page load, automatic selection of page clickable elements with a user defined delay, page scrolling on simple user on hover.

Be careful, _Orange Confort+_ does not improve the accessibility level of a web site: blocking points still stay blocking points, with or without _Orange Confort+_.


## Table of contents

- [Browser extension](#browser-extension)
- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Copyright and license](#copyright-and-license)


## Browser extension
- [Firefox] (https://addons.mozilla.org/fr/firefox/addon/orange-confort/)
- [chrome] (https://chrome.google.com/webstore/detail/orange-confort%2B/ddnpdohiipephjpdpohikkamhdikbldp)
- [Internet Explorer 11 64bits] (https://github.com/Orange-OpenSource/Orange-Confort-plus/blob/master/dist/Addin%20IE/Orange.ConfortPlus.IEExtension.Installer_x64.msi)
- [Internet Explorer 11 32bits] (https://github.com/Orange-OpenSource/Orange-Confort-plus/blob/master/dist/Addin%20IE/Orange.ConfortPlus.IEExtension.Installer_x86.msi)

## Quick start
- Clone the repo: `git clone https://github.com/Orange-OpenSource/Orange-Confort-plus.git`.
- Configure your protocol, domain and deployment path into config.json file.
- Build your dist, deploy and look at the testpage.html

### 1. Configuring the service

```
{
"hebergementProtocol": "https:",
"cookieDomain": "HEBERGEMENTDOMAIN",
"hebergementDomaine": "HEBERGEMENTDOMAIN",
"hebergementFullPath": "YOURPATHTOSOURCEFILES"
}
```

- `cookieDomain` is the domain on which the cookie will be fixed. It must be the same or a portion of the `hebergementDomaine` domain.
- `hebergementDomaine` is the domain where you host the _Orange Confort+_ service.
- `hebergementFullPath` is the full path to the service on your server, complete with beginning and end slash.

### 2. Building the dist

1. `$ npm install`
2. `$ bower install`
3. `$ grunt`

### 3. Deploy _Orange Confort+_ onto your domain - Prepackaged version available, just need to put your values
- `dist/serveur` -> Serveur mode content using PHP, allow to share cookie on multiple domain
- `dist/standalone` -> Standalone mode content, don't need PHP, need to be deployed onto each different domain

## Bugs and feature requests

Have a bug or a feature request? Please first check the [issues](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/new).

## Copyright and license

Code copyright 2014 - 2016 Orange. Code released under [the GPLV2 license](https://github.com/Orange-OpenSource/Orange-Confort-plus/blob/master/LICENSE).
