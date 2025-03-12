export default function getFilterAndSorterBtns() {

  const filterRadioField = document.querySelectorAll('.custom-radio__field');
  const filterCheckboxField = document.querySelectorAll('.custom-checkbox__field');
  const selectElement = document.querySelector('.catalog__sort-select');

  // in-stock
  filterRadioField.forEach(stock => {
    stock.addEventListener('click', async () => {
      const filterIsRadio = await import('./getFilterAndSorter.js');
      filterIsRadio.getFilterAndSorter();
    })
  })

  // checkbox
  filterCheckboxField.forEach(check => {
    check.addEventListener('click', async () => {
      const filterIsCheck = await import('./getFilterAndSorter.js');
      filterIsCheck.getFilterAndSorter();
    })
  })

  // sorter
  selectElement.addEventListener('change', async () => {
    const sortValue = selectElement.value;
    const filterIsSort = await import('./getFilterAndSorter.js');
    filterIsSort.getFilterAndSorter(sortValue);
  })

}