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
// @note On ne freeze par le routeur, sinon impossible de redéfinir `currentRoute`
const routeServiceInstance = new RouteService();
Object.seal(routeServiceInstance);

const appPath = pathServiceInstance.path;
