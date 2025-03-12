import getDataJson from './getDataJson.js';

export default async function getFilterAndSorterInStock() {
  const filterRadioField = document.querySelectorAll('.custom-radio__field');

  let filterCatalogResponse = [];

  const newCatalogResponse = await getDataJson();

  filterRadioField.forEach((stock) => {
    if (stock.checked && stock.value === 'instock') {
      newCatalogResponse.forEach(element => {

        const moscow = element.availability.moscow;
        const orenburg = element.availability.orenburg;
        const saintPetersburg = element.availability.saintPetersburg;

        const sumElement = +moscow + +orenburg + +saintPetersburg;

        if ((sumElement) > 0) {
          filterCatalogResponse.push(element);
        }
      })
    } else if (stock.checked && stock.value === 'all-item') {
      return
    }
  })

  if (filterCatalogResponse.length > 0) {
    return new Promise((resolve) => {
      resolve(filterCatalogResponse)
    });
  } else {
    return new Promise((resolve) => {
      resolve(newCatalogResponse)
    });
  }
}