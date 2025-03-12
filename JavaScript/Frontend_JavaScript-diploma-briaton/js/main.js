import getDataJson from './components/getDataJson.js';
import getBurgerMenu from './components/getBurgerMenu.js';
import getChoiceCity from './components/getChoiceCity.js';
import getPagination from './components/getPagination.js';
import getCountProductions from './components/getCountProductions.js';
import getFilterAndSorterBtns from './components/getFilterAndSorterBtns.js';
import getBasketRenderProduct from './components/getBasketRenderProduct.js';
import getBasketOpenOrCloseMenu from './components/getBasketOpenOrCloseMenu.js';
import getAccordion from './components/getAccordion.js';
import getValidateModalWindow from './components/getValidateModalWindow.js';

window.addEventListener('DOMContentLoaded', async () => {

  // get Data.JSON
  const catalogResponse = await getDataJson();

  // open burger menu (main catalog)
  getBurgerMenu();

  // open select city list
  getChoiceCity();

  // render products list with pagination
  getPagination(catalogResponse);

  // set count products in filter
  getCountProductions();

  // EventListeners filter and sorted
  getFilterAndSorterBtns();

  // render products list to basket
  getBasketRenderProduct(catalogResponse);

  // open or close basket
  getBasketOpenOrCloseMenu();

  // accordion
  getAccordion();

  // status send message
  getValidateModalWindow()

})