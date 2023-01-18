# Orange-Confort-plus
_Orange Confort+_ aims to enhance user experience on websites.It works best when said websites are fully accessible.

## Features

* **Typography**:
  * font size,
  * word-spacing,
  * letter-spacing,
  * line-height,
  * font-face, among Arial, [Luciole](https://www.luciole-vision.com/), [Open Sans](https://fonts.google.com/specimen/Open+Sans), [Open Dyslexic](https://opendyslexic.org/) and [Accessible DfA](https://github.com/Orange-OpenSource/font-accessible-dfa).
* **Layout**:
  * cancel layout,
  * force left-aligned text,
  * number list items,
  * customize links appearance,
  * display a reading mask.
* **Colors**: modify foreground and background colors.
* **Behavior**:
  * direct access to main content on page load,
  * automatic selection of page clickable elements with a user defined delay,
  * page scrolling on simple user on hover.

Be careful, _Orange Confort+_ does not improve website accessibility: blocking points still stay blocking points, with or without _Orange Confort+_.


## Table of contents

- [Browser extension](#browser-extension)
- [Deploying Orange Confort+ on your website](#deploying-orange-confort-on-your-website)
- [Contribute](#contribute)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Copyright and license](#copyright-and-license)


## Browser extension
- [Firefox](https://addons.mozilla.org/fr/firefox/addon/orange-confort/)
- [Chrome](https://chrome.google.com/webstore/detail/orange-confort%2B/ddnpdohiipephjpdpohikkamhdikbldp)

## Deploying _Orange Confort+_ on your website

To deploy _Orange Confort+_ onto your domain, a prepackaged version is available: simply add the `dist/serveur` folder to your website. Beware of naming the folder appropriately.

To initialize Confort+, call it before the `body` closing tag, using the correct path to the files (e.g. your domain and the path to the folder you uploaded Confort+ to):

```html
<script type="text/javascript" src="http://example.com/myconfortplus/js/toolbar-min.js"></script>
```

**NB**: User settings are saved onto your domain and are never shared with other websites, or extension.

If the button doesn't comply with your graphics charter, you can create a link that will trigger Confort plus.
To do so, just include those scripts along with the aforementioned:

```html
<script type="text/javascript">
	accessibilitytoolbar_custom = {
		// MANDATORY
		// ID of the target container which will include the link. If not null, activate the display in link mode. The link will be added as the last element of the target container.
		idLinkModeContainer : "id_target_container",

		// OPTIONAL
		// CSS class applied on the link to unify its appearance with the site.
		cssLinkModeClassName : "linkClass",

		// OPTIONAL
		// When the service is displayed as a link in the page, a skip link is automatically added at the top of the page. If you already have a group of skip links, you can specify the target container where the skip link will be added. The link will be added as the last element of the target container.
		idSkipLinkIdLinkMode : "",

		// OPTIONAL
		// CSS class applied on the skip link
		cssSkipLinkClassName : ""
	};
</script>
```

## Contribute

### Clone

```shell
git clone https://github.com/Orange-OpenSource/Orange-Confort-plus.git
```

### Install dependencies
```shell
npm ci
```

### Start local server
```shell
npm start
```

It should build all the things and open your browser to `http://localhost:9010`.

You're ready to update files in `/src`: any changes will trigger a build and reload your browser.

For mor specific needs, take a look at existing scripts in our `package.json`.

### Work on Confort+ website

If you need to work on Confort+ very own website, there's a specific script:

```shell
npm run start:docs
```

### Modify Confort+ icon-font

A custom icon-font is used in Confort+ toolbar. If you need to modify it, you're encouraged to use [IcoMoon app](https://icomoon.io/app/) and import [existing IcoMoon settings](https://github.com/Orange-OpenSource/Orange-Confort-plus/blob/main/src/fonts/Confort%20Plus.json).

You can find a detailed workflow in [Boosted v4.6 documentation for icons](https://boosted.orange.com/docs/4.6/extend/icons/).

## Bugs and feature requests

Have a bug or a feature request? Please first check the [issues](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/new).

## Copyright and license

Code copyright 2014 - 2023 Orange. Code released under [the GPLV2 license](https://github.com/Orange-OpenSource/Orange-Confort-plus/blob/master/LICENSE).

### Third party assets

[Luciole Font Family © Laurent Bourcellier & Jonathan Perez](http://www.luciole-vision.com/),  [CC-BY](https://creativecommons.org/licenses/by/4.0/legalcode).
