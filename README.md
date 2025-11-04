# Orange-Confort-plus
_Orange Confort+_ aims to enhance user experience on websites. It works best when said websites are fully accessible.

> [!CAUTION]
> _Orange Confort+_ does not improve website accessibility: blocking points still stay blocking points, with or without _Orange Confort+_.


## Table of contents

- [Browser extension](#browser-extension)
- [Deploying Orange Confort+ on your website](#deploying-orange-confort-on-your-website)
- [Contribute](#contribute)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Copyright and license](#copyright-and-license)


## Browser extension
- [Firefox](https://addons.mozilla.org/fr/firefox/addon/orange-confort/)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/orange-confort/innlajggdjejhpeopnbhegahnkcpameb)
- [Chrome](https://chrome.google.com/webstore/detail/orange-confort%2B/ddnpdohiipephjpdpohikkamhdikbldp)

## Deploying _Orange Confort+_ on your website

To deploy _Orange Confort+_ onto your domain, a prepackaged version is available: simply add the `dist/serveur` folder to your website.

### Call Confort+

To initialize Confort+, call it before the `body` closing tag using the correct path:

```html
	<script src="/js/toolbar.min.js"></script>
</body>
```

### Customize path

> [!IMPORTANT]
> If `dist/serveur/` content is placed at your website root, you do not need the following action.

Declare `customConfortPath` before including Confort+:

```html
	<script>const customConfortPath = `${window.location.origin}/my-custom-path/`;</script>
	<script src="/my-custom-path/js/toolbar.min.js"></script>
</body>
```

> [!NOTE]
> User settings are saved in `localStorage`, thus depend on your domain. They are never shared with other websites, or extension.

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

### Build all the things

To build HTML, CSS, JS and static assets for both the docs and the extension, run:

```shell
npm run build
```

### Extension-specific scripts

We're using [Mozilla's web-ext](https://github.com/mozilla/web-ext) to ease our development workflow.

#### Package extension

A packaging script based on `web-ext build` exists for both Firefox and chromium, taking care of their specific `manifest.json` using npm `pre`-hook.

```shell
npm run zip
```

#### Lint extension

Based on `web-ext lint` (using addons-linter under the hood), we're linting the Firefox package.

```shell
npm run lint:ext
```

#### Load extension

`web-ext run` is used to load extension. There's a separate script for Firefox and Chrome.

```shell
npm run load:firefox
npm run load:chrome
```

> [!Warning]
> As of today, those scripts are quite buggy on Ubuntu if you use Firefox through snap. See #108 for more context.

### Work on Confort+ website

If you need to work on Confort+ very own website, there's a specific script:

```shell
npm run start:docs
```

## Bugs and feature requests

Have a bug or a feature request? Please first check the [issues](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/new).

## Copyright and license

Code copyright 2014 - 2025 Orange. Code released under [the GPLV2 license](https://github.com/Orange-OpenSource/Orange-Confort-plus/blob/master/LICENSE).

### Credits


#### Font credits

- [Accessible-DfA](https://github.com/Orange-OpenSource/font-accessible-dfa/): Designed by Orange and distributed under the [OFL-1.1 licence](https://opensource.org/license/OFL-1.1).
- [B612](https://github.com/polarsys/b612): Designed by PolarSys and distributed under the [OFL-1.](https://opensource.org/license/OFL-1.1)1 licence.
- [Lexend Deca](https://fonts.google.com/specimen/Lexend+Deca): Designed by Bonnie Shaver-Troup and Thomas Jockin and distributed under the [OFL-1.1 licence](https://opensource.org/license/OFL-1.1).
- [Luciole](https://www.luciole-vision.com/en/index.html): Designed by Laurent Bourcellier and Jonathan Perez and distributed under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode.en).
- [Sylexiad Sans](https://www.sylexiad.com/): Designed by Dr. Robert Hillier and distributed under the [EULA](https://www.sylexiad.com/end-user-license-agreement-eula/index.html).
- [Belle Allure](https://www.jeanboyault.fr/belle-allure/): Designed by Jean Boyault.

#### Pictogram Credits

The [accessibility icons](https://github.com/Orange-OpenSource/Accessibility-icons) for usage modes provided by Comfort+ are declared in the [ISO 11581-7:2024](https://www.iso.org/en/standard/78028.html) standard and are distributed under the [Creative Commons CC0-1.0 licence](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en).

