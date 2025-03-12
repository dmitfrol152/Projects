import getDataJson from './getDataJson.js';

export default async function getCountProductions() {
  const newCatalogResponse = await getDataJson();

  const filterCheckboxField = document.querySelectorAll('.custom-checkbox__field');
  const filterCheckboxText = document.querySelectorAll('.custom-checkbox__count');

  filterCheckboxField.forEach((element, index) => {
    if (element.id !== 'agree') {
      const textElement = filterCheckboxText[index];
      let count = 0;
      newCatalogResponse.forEach(item => {
        const elementArray = item.type;
        elementArray.forEach(tpe => {
          if (tpe === element.value) {
            count = count + 1;
          }
        })
      })
      textElement.textContent = count;
    }
  })
}