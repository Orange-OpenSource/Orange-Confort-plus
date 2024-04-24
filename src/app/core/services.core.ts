// @ts-nocheck
const pathServiceInstance = new PathService();
Object.freeze(pathServiceInstance);
const appPath = pathServiceInstance.path;

const i18nServiceInstance = new I18nService();
Object.freeze(i18nServiceInstance);
const iconsServiceInstance = new IconsService();
Object.freeze(iconsServiceInstance);
const filesServiceInstance = new FilesService();
Object.freeze(filesServiceInstance);
const localStorageServiceInstance = new LocalStorageService();
Object.freeze(localStorageServiceInstance);
const modeOfUseServiceInstance = new ModeOfUseService();
Object.freeze(modeOfUseServiceInstance);
const stylesServiceInstance = new StylesService();
Object.freeze(stylesServiceInstance);
const stringServiceInstance = new StringService();
Object.freeze(stringServiceInstance);
// @note We don't freeze these services to be able to redefine certain variables
const categoriesServiceInstance = new CategoriesService();
Object.seal(categoriesServiceInstance);
const routeServiceInstance = new RouteService();
Object.seal(routeServiceInstance);
const capitalsServiceInstance = new CapitalsService();
Object.seal(capitalsServiceInstance);
const clearlyLinksServiceInstance = new ClearlyLinksService();
Object.seal(clearlyLinksServiceInstance);
const clickFaciliteServiceInstance = new ClickFaciliteService();
Object.seal(clickFaciliteServiceInstance);
const colorContrastServiceInstance = new ColorContrastService();
Object.seal(colorContrastServiceInstance);
const colourThemeServiceInstance = new ColourThemeService();
Object.seal(colourThemeServiceInstance);
const cursorAspectServiceInstance = new CursorAspectService();
Object.seal(cursorAspectServiceInstance);
const deleteBackgroundImagesServiceInstance = new DeleteBackgroundImagesService();
Object.seal(deleteBackgroundImagesServiceInstance);
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
const scrollServiceInstance = new ScrollService();
Object.seal(scrollServiceInstance);
const skipToContentServiceInstance = new SkipToContentService();
Object.seal(skipToContentServiceInstance);
const stopAnimationsServiceInstance = new StopAnimationsService();
Object.seal(stopAnimationsServiceInstance);
const textSizeServiceInstance = new TextSizeService();
Object.seal(textSizeServiceInstance);
const textSpacingServiceInstance = new TextSpacingService();
Object.seal(textSpacingServiceInstance);
const pauseServiceInstance = new PauseService();
Object.freeze(pauseServiceInstance);
