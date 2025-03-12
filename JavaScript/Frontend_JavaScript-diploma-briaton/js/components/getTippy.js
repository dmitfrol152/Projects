export default function getTippy(catalogItem, obj) {

  const tooltipBtn = catalogItem.querySelector('.tooltip__btn');
  tippy(tooltipBtn, {
    content: `
    <span class="tooltip__text">Наличие товара по городам:</span>
    <ul class="tooltip__list">
      <li class="tooltip__item">
        <span class="tooltip__text">Москва: <span class="tooltip__count">${obj.availability.moscow}</span></span>
      </li>
      <li class="tooltip__item">
        <span class="tooltip__text">Оренбург: <span class="tooltip__count">${obj.availability.orenburg}</span></span>
      </li>
      <li class="tooltip__item">
        <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${obj.availability.saintPetersburg}</span></span>
      </li>
    </ul>
    `,
    allowHTML: true,
  });
  return tooltipBtn;
}