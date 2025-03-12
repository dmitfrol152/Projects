import getRenderProducts from "./getRenderProducts.js";

export default function getPagination(catalogResponse) {

  const catalogPagination = document.querySelector('.catalog__pagination');
  const catalogPaginationItem = document.querySelectorAll('.catalog__pagination-item');
  const catalogPaginationBtn = document.querySelectorAll('.catalog__pagination-link');

  const getOneList = () => {
    catalogPaginationBtn[0].addEventListener('click', () => {
      const newCatalogResponse = catalogResponse.slice(0, 6);
      // render products list
      getRenderProducts(newCatalogResponse);
    })
  }
  const getTwoList = () => {
    catalogPaginationBtn[1].addEventListener('click', () => {
      const newCatalogResponse = catalogResponse.slice(6, 12);
      // render products list
      getRenderProducts(newCatalogResponse);
    })
  }
  const getThreeList = () => {
    catalogPaginationBtn[2].addEventListener('click', () => {
      const newCatalogResponse = catalogResponse.slice(12, 18);
      // render products list
      getRenderProducts(newCatalogResponse);
    })
  }
  const getFourList = () => {
    catalogPaginationBtn[3].addEventListener('click', () => {
      const newCatalogResponse = catalogResponse.slice(18, 24);
      // render products list
      getRenderProducts(newCatalogResponse);
    })
  }

  if (catalogResponse.length <= 6) {
    catalogPagination.style.display = 'none';

    // render products list
    getRenderProducts(catalogResponse);

  } else {
    catalogPagination.style.display = 'flex';

    const arrayLength = catalogResponse.length;

    if (arrayLength > 6 && arrayLength <= 12) {

      catalogPaginationItem[0].style.display = 'flex';
      catalogPaginationItem[1].style.display = 'flex';
      catalogPaginationItem[2].style.display = 'none';
      catalogPaginationItem[3].style.display = 'none';

      const newCatalogResponse = catalogResponse.slice(0, 6);

      // render products list
      getRenderProducts(newCatalogResponse)
      // render one list
      getOneList();
      // render two list
      getTwoList();

    } else if (arrayLength > 12 && arrayLength <= 18) {

      catalogPaginationItem[0].style.display = 'flex';
      catalogPaginationItem[1].style.display = 'flex';
      catalogPaginationItem[2].style.display = 'flex';
      catalogPaginationItem[3].style.display = 'none';

      const newCatalogResponse = catalogResponse.slice(0, 6);

      // render products list
      getRenderProducts(newCatalogResponse)

      // render one list
      getOneList();
      // render two list
      getTwoList();
      // render three list
      getThreeList();

    } else if (arrayLength > 18 && arrayLength <= 24) {

      catalogPaginationItem[0].style.display = 'flex';
      catalogPaginationItem[1].style.display = 'flex';
      catalogPaginationItem[2].style.display = 'flex';
      catalogPaginationItem[3].style.display = 'flex';

      const newCatalogResponse = catalogResponse.slice(0, 6);

      // render products list
      getRenderProducts(newCatalogResponse);

      // render one list
      getOneList();
      // render two list
      getTwoList();
      // render three list
      getThreeList();
      // render four list
      getFourList();

    }
  }
}