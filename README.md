# Orange-Confort-plus
The target of _Orange Confort+_ functionalities is to enhance user experience on web sites, which are already accessible, or still accessible.

_Orange Confort+_ provides these services:

* Typography - user may change: font size, space between words, characters and lines, font-face to Open Dyslexic
* Layout: cancel layout, text align left, numbering list items, modify navigation links appearance, display a reading mask
* Colors : Modify foreground/background colors
* Behavior: direct access to main content on page load, automatic selection of page clickable elements with a user defined delay, page scrolling on simple user on hover.

Be careful, _Orange Confort+_ does not improve the accessibility level of a web site: blocking points still stay blocking points, with or without _Orange Confort+_.


## Table of contents

- [Browser extension](#browser-extension)
- [Deploy it on your website](#deploy-it-on-your-website)
- [Contribute](#contribute)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Copyright and license](#copyright-and-license)


## Browser extension
- [Firefox](https://addons.mozilla.org/fr/firefox/addon/orange-confort/)
- [Chrome](https://chrome.google.com/webstore/detail/orange-confort%2B/ddnpdohiipephjpdpohikkamhdikbldp)
- [Internet Explorer 11 64bits](https://github.com/Orange-OpenSource/Orange-Confort-plus/raw/master/dist/Addin%20IE/Orange.ConfortPlus.IEExtension.Installer_x64.msi)
- [Internet Explorer 11 32bits](https://github.com/Orange-OpenSource/Orange-Confort-plus/raw/master/dist/Addin%20IE/Orange.ConfortPlus.IEExtension.Installer_x86.msi)

## Deploy it on your website
Deploy _Orange Confort+_ onto your domain - Prepackaged version available, just need to put your values
You need to custom the values in `dist/serveur/js/toolbar.js`and `dist/serveur/toolbar-min.js`
Edit the files, and replace
 
```
var hebergementDomaine = 'https://HEBERGEMENTDOMAIN'; // Here is your website protocol and url (end without /) eg: http://myexemple.com
var hebergementFullPath = hebergementDomaine + 'YOURPATHTOSOURCEFILES'; // YOURPATHTOSOURCEFILES is the deployment path (starting en ending with a /) eg: /myconfortplus/
```

Now you're ready to deploy it, just copy all the files and folders from `dist/serveur` to your website tree in `myconfortplus`folder if you used it for YOURPATHTOSOURCEFILES value.

Now you can include it everywhere, by just adding the Javascript inclusion in your pages like : 
<script type="text/javascript" src="http://myexemple.com/myconfortplus/js/toolbar-min.js"></script>

NB: The user settings are saved onto your domain and are never shared with other websites, or extension. 

## Contribute
- Clone the repo: `git clone https://github.com/Orange-OpenSource/Orange-Confort-plus.git`.

- Install dependencies
`$ npm install`
`$ bower install`

Watch it localy : 
`$ grunt serve`
Go to http://localhost:9010/testpage.html

Now you're ready to update all files in `/app` and they will automaticaly reload after update.

## Bugs and feature requests

Have a bug or a feature request? Please first check the [issues](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/new).

## Copyright and license

Code copyright 2014 - 2016 Orange. Code released under [the GPLV2 license](https://github.com/Orange-OpenSource/Orange-Confort-plus/blob/master/LICENSE).
