import getPagination from './getPagination.js';
import getFilterAndSorterMerge from './getFilterAndSorterMerge.js';
import getBasketRenderProduct from './getBasketRenderProduct.js';

// filter and sorter
export async function getFilterAndSorter(sortValue) {

  // merged filter and in-stock
  let filtredArray = await getFilterAndSorterMerge();

  if (sortValue === 'price-min') {
    filtredArray.sort((a, b) => a.price.new - b.price.new);
  } else if (sortValue === 'price-max') {
    filtredArray.sort((a, b) => b.price.new - a.price.new);
  } else if (sortValue === 'rating-max') {
    filtredArray.sort((a, b) => b.rating - a.rating);
  }

  getPagination(filtredArray);
  getBasketRenderProduct(filtredArray);

}