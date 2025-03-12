import getTippy from "./getTippy.js";

export default function getRenderProducts(catalogResponse) {
  const catalogList = document.querySelector('.catalog__list');

  catalogList.innerHTML = '';
  catalogResponse.forEach(obj => {
    const catalogItem = document.createElement('li');
    catalogItem.classList.add('catalog__item');

    catalogItem.innerHTML = `
      <div class='product-card'>
        <div class='product-card__visual'>
          <img class='product-card__img' src='${obj.image}' height='436' width='290'
            alt='Изображение товара'>
          <div class='product-card__more'>
            <a href='#' class='product-card__link btn btn--icon' data-id='${obj.id}'>
              <span class='btn__text'>В корзину</span>
              <svg width='24' height='24' aria-hidden='true'>
                <use xlink:href='images/sprite.svg#icon-basket'></use>
              </svg>
            </a>
            <a href='#' class='product-card__link btn btn--secondary'>
              <span class='btn__text'>Подробнее</span>
            </a>
          </div>
        </div>
        <div class='product-card__info'>
          <h2 class='product-card__title'>${obj.name}</h2>
          <span class='product-card__old'>
            <span class='product-card__old-number'>${obj.price.old.toLocaleString('ru-RU')}</span>
            <span class='product-card__old-add'>₽</span>
          </span>
          <span class='product-card__price'>
            <span class='product-card__price-number'>${obj.price.new.toLocaleString('ru-RU')}</span>
            <span class='product-card__price-add'>₽</span>
          </span>
          <div class='product-card__tooltip tooltip'>
            <button class='tooltip__btn' aria-label='Показать подсказку'>
              <svg class='tooltip__icon' width='5' height='10' aria-hidden='true'>
                <use xlink:href='images/sprite.svg#icon-i'></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `
    catalogList.append(catalogItem);
    // get Tippy library
    getTippy(catalogItem, obj);

  })

}