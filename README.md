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

## Deploying _Orange Confort+_ on your website
To deploy _Orange Confort+_ onto your domain, a prepackaged version is available: you just need to customize the values in `dist/serveur/js/toolbar.js`and `dist/serveur/toolbar-min.js`

Edit the files, and change the following variables:
 
```
var hebergementDomaine = 'https://HEBERGEMENTDOMAIN'; // Here is your website protocol and url (end without /) eg: http://myexample.com
var hebergementFullPath = hebergementDomaine + 'YOURPATHTOSOURCEFILES'; // YOURPATHTOSOURCEFILES is the deployment path (starting en ending with a /) eg: /myconfortplus/
```

NB: Pay attention to the protocol you are using, HTTPS or HTTP.

Now you're ready to deploy it, just copy all the files and folders from `dist/serveur` to your website tree in `myconfortplus` folder if you used it for YOURPATHTOSOURCEFILES value.

You can call it anywhere on your website, just by adding the Javascript link, before the closing body tag, `</body>`, in your pages like this (replace `example.com` with your domain): 

`<script type="text/javascript" src="http://example.com/myconfortplus/js/toolbar-min.js"></script>`

NB: The user settings are saved onto your domain and are never shared with other websites, or extension. 

If the button doesn't comply with your graphics charter, you can create a link that will trigger Confort plus.
To do so, just include those scripts along with the aforementionned: 

```
`<script type="text/javascript">
accessibilitytoolbar_custom = {
// MANDATORY : ID of the target container which will include the link. If not null, activate the display in link mode. The link will be added as the last element of the target container. idLinkModeContainer : "id_target_container",

// OPTIONAL (put it as comments if useless) CSS class applied on the link to unify its appearance with the site.
cssLinkModeClassName : "linkClass",
 
// OPTIONAL (put it as comments if useless) When the service is displayed as a link in the page, a skip link is automatically added at the top of the page. If you already have a group of skip links, you can specify the target container where the skip link will be added. The link will be added as the last element of the target container. 
//idSkipLinkIdLinkMode : "", 

// OPTIONAL (put it as comments if useless) CSS class applied on the skip link
//cssSkipLinkClassName : "" 
};
</script>`
```

## Contribute
- Clone the repo: `git clone https://github.com/Orange-OpenSource/Orange-Confort-plus.git`.

- Install dependencies
`$ npm install bower -g`
`$ npm install grunt -g`
`$ npm install gulp-cli -g`

`$ npm install`
`$ bower install`

Watch it localy : 
`$ grunt serve`
Go to http://localhost:9010/testpage.html

Now you're ready to update all files in `/app` and they will automaticaly reload after update.

## Bugs and feature requests

Have a bug or a feature request? Please first check the [issues](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/new).

## Copyright and license

Code copyright 2014 - 2019 Orange. Code released under [the GPLV2 license](https://github.com/Orange-OpenSource/Orange-Confort-plus/blob/master/LICENSE).

### Third part

[Luciole Font Family © Laurent Bourcellier & Jonathan Perez](http://www.luciole-vision.com/) [CC-BY](https://creativecommons.org/licenses/by/4.0/legalcode)
