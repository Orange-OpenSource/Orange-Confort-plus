// @ts-nocheck
const pathServiceInstance = new PathService();
Object.freeze(pathServiceInstance);
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
const routeServiceInstance = new RouteService();
Object.seal(routeServiceInstance);
const scrollServiceInstance = new ScrollService();
Object.seal(scrollServiceInstance);

const appPath = pathServiceInstance.path;
