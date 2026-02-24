"use strict";
// @ts-nocheck
const pathServiceInstance = new PathService();
Object.freeze(pathServiceInstance);
const appPath = pathServiceInstance.path;
const domServiceInstance = new DomService();
Object.freeze(domServiceInstance);
const i18nServiceInstance = new I18nService();
Object.freeze(i18nServiceInstance);
const iconsServiceInstance = new IconsService();
Object.freeze(iconsServiceInstance);
const filesServiceInstance = new FilesService();
Object.freeze(filesServiceInstance);
const modeOfUseServiceInstance = new ModeOfUseService();
Object.freeze(modeOfUseServiceInstance);
const stylesServiceInstance = new StylesService();
Object.freeze(stylesServiceInstance);
const stringServiceInstance = new StringService();
Object.freeze(stringServiceInstance);
// @note We don't freeze these services to be able to redefine certain variables
const categoriesServiceInstance = new CategoriesService();
Object.seal(categoriesServiceInstance);
const localStorageServiceInstance = new LocalStorageService();
Object.seal(localStorageServiceInstance);
const dragDropServiceInstance = new DragDropService();
Object.seal(dragDropServiceInstance);
const routeServiceInstance = new RouteService();
Object.seal(routeServiceInstance);
// Settings
const capitalLettersServiceInstance = new CapitalLettersService();
Object.seal(capitalLettersServiceInstance);
const clearlyLinksServiceInstance = new ClearlyLinksService();
Object.seal(clearlyLinksServiceInstance);
const clickFaciliteServiceInstance = new ClickFaciliteService();
Object.seal(clickFaciliteServiceInstance);
const colorContrastServiceInstance = new ColorContrastService();
Object.seal(colorContrastServiceInstance);
const cursorAspectServiceInstance = new CursorAspectService();
Object.seal(cursorAspectServiceInstance);
const deleteBackgroundImagesServiceInstance = new DeleteBackgroundImagesService();
Object.seal(deleteBackgroundImagesServiceInstance);
const deleteLayoutServiceInstance = new DeleteLayoutService();
Object.seal(deleteLayoutServiceInstance);
const focusAspectServiceInstance = new FocusAspectService();
Object.seal(focusAspectServiceInstance);
const fontFamilyServiceInstance = new FontFamilyService();
Object.seal(fontFamilyServiceInstance);
const linkStyleServiceInstance = new LinkStyleService();
Object.seal(linkStyleServiceInstance);
const magnifierServiceInstance = new MagnifierService();
Object.seal(magnifierServiceInstance);
const marginAlignServiceInstance = new MarginAlignService();
Object.seal(marginAlignServiceInstance);
const navigationAutoServiceInstance = new NavigationAutoService();
Object.seal(navigationAutoServiceInstance);
const navigationButtonsServiceInstance = new NavigationButtonsService();
Object.seal(navigationButtonsServiceInstance);
const readAloudServiceInstance = new ReadAloudService();
Object.seal(readAloudServiceInstance);
const readingGuideServiceInstance = new ReadingGuideService();
Object.seal(readingGuideServiceInstance);
const readingPageServiceInstance = new ReadingPageService();
Object.seal(readingPageServiceInstance);
const restartTopLeftServiceInstance = new RestartTopLeftService();
Object.seal(restartTopLeftServiceInstance);
const scrollAspectServiceInstance = new ScrollAspectService();
Object.seal(scrollAspectServiceInstance);
const scrollTypeServiceInstance = new ScrollTypeService();
Object.seal(scrollTypeServiceInstance);
const skipToContentServiceInstance = new SkipToContentService();
Object.seal(skipToContentServiceInstance);
const stopAnimationsServiceInstance = new StopAnimationsService();
Object.seal(stopAnimationsServiceInstance);
const textSizeServiceInstance = new TextSizeService();
Object.seal(textSizeServiceInstance);
const textSpacingServiceInstance = new TextSpacingService();
Object.seal(textSpacingServiceInstance);
const zoomServiceInstance = new ZoomService();
Object.seal(zoomServiceInstance);
const globalSettingsServices = [
    { name: 'capitalLetters', instanceService: capitalLettersServiceInstance.setCapitalLetters.bind(capitalLettersServiceInstance), value: DEFAULT_VALUE },
    { name: 'clearlyLinks', instanceService: clearlyLinksServiceInstance.setClearlyLinks.bind(clearlyLinksServiceInstance), value: DEFAULT_VALUE },
    { name: 'clickFacilite', instanceService: clickFaciliteServiceInstance.setClickFacilite.bind(clickFaciliteServiceInstance), value: DEFAULT_VALUE },
    { name: 'colorContrast', instanceService: colorContrastServiceInstance.setColorsContrasts.bind(colorContrastServiceInstance), value: DEFAULT_VALUE },
    { name: 'cursorAspect', instanceService: cursorAspectServiceInstance.setCursor.bind(cursorAspectServiceInstance), value: DEFAULT_VALUE },
    { name: 'deleteBackgroundImages', instanceService: deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(deleteBackgroundImagesServiceInstance), value: DEFAULT_VALUE },
    { name: 'focusAspect', instanceService: focusAspectServiceInstance.setFocus.bind(focusAspectServiceInstance), value: DEFAULT_VALUE },
    { name: 'fontFamily', instanceService: fontFamilyServiceInstance.setFontFamily.bind(fontFamilyServiceInstance), value: DEFAULT_VALUE },
    { name: 'linkStyle', instanceService: linkStyleServiceInstance.setLinkStyle.bind(linkStyleServiceInstance), value: DEFAULT_VALUE },
    { name: 'magnifier', instanceService: magnifierServiceInstance.setMagnifier.bind(magnifierServiceInstance), value: DEFAULT_VALUE },
    { name: 'marginAlign', instanceService: marginAlignServiceInstance.setMargin.bind(marginAlignServiceInstance), value: DEFAULT_VALUE },
    { name: 'navigationAuto', instanceService: navigationAutoServiceInstance.setNavigationAuto.bind(navigationAutoServiceInstance), value: DEFAULT_VALUE },
    { name: 'navigationButtons', instanceService: navigationButtonsServiceInstance.setNavigationButtons.bind(navigationButtonsServiceInstance), value: DEFAULT_VALUE },
    { name: 'readAloud', instanceService: readAloudServiceInstance.setReadAloud.bind(readAloudServiceInstance), value: DEFAULT_VALUE },
    { name: 'readingGuide', instanceService: readingGuideServiceInstance.setReadingMaskGuide.bind(readingGuideServiceInstance), value: DEFAULT_VALUE },
    { name: 'scroll', instanceService: scrollAspectServiceInstance.setScrollAspect.bind(scrollAspectServiceInstance), value: DEFAULT_VALUE },
    { name: 'stopAnimations', instanceService: stopAnimationsServiceInstance.setStopAnimations.bind(stopAnimationsServiceInstance), value: DEFAULT_VALUE },
    { name: 'textSize', instanceService: textSizeServiceInstance.setFontSize.bind(textSizeServiceInstance), value: DEFAULT_VALUE },
    { name: 'textSpacing', instanceService: textSpacingServiceInstance.setSpacingText.bind(textSpacingServiceInstance), value: DEFAULT_VALUE },
    { name: 'zoom', instanceService: zoomServiceInstance.setZoom.bind(zoomServiceInstance), value: DEFAULT_VALUE }
];
const pauseServiceInstance = new PauseService();
Object.freeze(pauseServiceInstance);
