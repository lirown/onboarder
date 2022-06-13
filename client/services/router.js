import { Router } from '@vaadin/router';
import { routes } from '../routes';

/**
 * vaadin router
 */
const router = new Router();
window.__router = router;

/**
 * configure routes
 */
router.setRoutes([
  // Redirect to URL without trailing slash
  {
    path: '(.*)/',
    action: (context, commands) => {
      const newPath = context.pathname.slice(0, -1);
      return commands.redirect(newPath);
    }
  },
  ...routes
]);

/**
 * setup router from specfic route config
 * @param outlet HTMLElement
 */
export const attachRouter = (outlet) => {
  router.setOutlet(outlet);
};

/**
 * extract url by name and url params
 * @param name {String}
 * @param params {Params}
 * @return {String} url name
 */
export const urlForName = (name, params) => {
  return router.urlForName(name, params);
};

/**
 * go to specified router from code
 */
export const redirect = (url, params = {}) => {
  const a = document.querySelector('#link');
  a.setAttribute('href', urlForName(url, params));
  a.click();
};
