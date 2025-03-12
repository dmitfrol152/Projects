import getSlider from './getSlider.js';

let count = 0;
export default function getBasketRenderProduct(catalogResponse) {
  
  let dayCatalogResponse = [];

  catalogResponse.forEach(obj => {
    if (obj.goodsOfDay === true) {
      dayCatalogResponse.push(obj);
    }
  });

  // render products of day
  getSlider(dayCatalogResponse);

  const basketProductCardElement = document.querySelectorAll('.product-card__link');
  const basketListElement = document.querySelector('.basket__list');  

  basketProductCardElement.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const dataId = element.getAttribute('data-id');

      catalogResponse.forEach(products => {

        if (+products.id === +dataId) {

          const basketItemElement = document.createElement('li');
          basketItemElement.classList.add('basket__item');

          basketItemElement.innerHTML = `
            <div class="basket__img">
              <img src='${products.image}' alt="Фотография товара" height="60" width="60">
            </div>
            <span class="basket__name">${products.name}</span>
            <span class="basket__price">${products.price.new.toLocaleString('ru-RU')}</span>
            <button class="basket__item-close" type="button">
              <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-close"></use>
              </svg>
            </button>
          `
          basketListElement.append(basketItemElement);

          const basketEmptyBlockElement = document.querySelector('.basket__empty-block');
          const basketCountElement = document.querySelector('.header__user-count');

          count += 1;
          basketCountElement.textContent = count;

          const basketButtonRemoveElement = basketItemElement.querySelector('.basket__item-close');
          basketButtonRemoveElement.addEventListener('click', () => {
            basketItemElement.remove();
            count -= 1;
            basketCountElement.textContent = count;

            if (count === 0) {
              basketEmptyBlockElement.style.display = 'block';
            } else {
              basketEmptyBlockElement.style.display = 'none';
            }
          })

          basketEmptyBlockElement.style.display = 'none';

        }
      });
    })
  })
}