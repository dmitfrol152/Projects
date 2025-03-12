import getDataJson from './getDataJson.js';

export default async function getFilterAndSorterCheckbox() {
  const filterCheckboxField = document.querySelectorAll('.custom-checkbox__field');

  const newCatalogResponse = await getDataJson();

  let selectedFilter = [];
  let newFilterCatalogResponse = [];

  filterCheckboxField.forEach(check => {
    if (check.checked) {
      selectedFilter.push(check.value)
    } else {
      selectedFilter = selectedFilter.filter(filter => filter !== check.value);
    }
  })

  newCatalogResponse.forEach(item => {
    selectedFilter.forEach(product => {
      const typeElement = item.type;
      typeElement.forEach(tpe => {
        if (tpe === product) {
          newFilterCatalogResponse.push(item)
        }
      })
    })
  })

  if (newFilterCatalogResponse.length > 0) {
    return new Promise((resolve) => {
      resolve(newFilterCatalogResponse)
    });
  } else {
    return new Promise((resolve) => {
      resolve(newCatalogResponse)
    });
  }
}