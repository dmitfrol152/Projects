import getFilterAndSorterInStock from './getFilterAndSorterInStock.js';
import getFilterAndSorterCheckbox from './getFilterAndSorterCheckbox.js';

export default async function getFilterAndSorterMerge() {
  const radioArray = await getFilterAndSorterInStock();
  const checkboxArray = await getFilterAndSorterCheckbox();

  const checkboxId = checkboxArray.map(item => item.id);
  const combinedResults = radioArray.filter(item => checkboxId.includes(item.id));

  return combinedResults;
}