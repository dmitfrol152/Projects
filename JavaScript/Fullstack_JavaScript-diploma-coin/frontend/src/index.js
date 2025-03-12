import Navigo from 'navigo';
import './scss/style.scss';
import { getLogin } from './js/getLogin.js';
import { getAccounts } from './js/getAccounts.js';
import { getNavigation } from './js/getNavigation.js';
import { getAccountFulInfo } from './js/getAccountFulInfo.js';
import { getAllСurrencies } from './js/getAllСurrencies.js';
import { getMapBanks } from './js/getMapBanks.js';
import { openBurgerMenu } from './js/openBurgerMenu.js';

export const router = new Navigo('/');

document.addEventListener('DOMContentLoaded', () => {
  const { hideMenu, showMenu } = getNavigation(router);
  openBurgerMenu();

  router
    .on('/', () => {
      hideMenu();
      getLogin(router);
    })
    .on('/accounts', () => {
      const isToken = localStorage.getItem('token');

      if (!isToken) {
        router.navigate('/');
        return;
      }

      showMenu();
      getAccounts(isToken);

    })
    .on('/account/:id', ({ data: { id } }) => {
      const isToken = localStorage.getItem('token');

      if (!isToken) {
        router.navigate('/');
        return;
      }

      showMenu();
      getAccountFulInfo(id, isToken);
    })
    .on('/all-currencies', () => {
      const isToken = localStorage.getItem('token');

      if (!isToken) {
        router.navigate('/');
        return;
      }

      showMenu();
      getAllСurrencies(isToken);

    })
    .on('/banks', () => {
      const isToken = localStorage.getItem('token');

      if (!isToken) {
        router.navigate('/');
        return;
      }

      showMenu();
      getMapBanks(isToken);

    })
    .resolve();
})
