export default function getBasketOpenOrCloseMenu() {
  const basketElement = document.querySelector('.header__user-btn');
  const basketOpacityBlockElement = document.querySelector('.basket');
  basketElement.addEventListener('click', () => {
    basketOpacityBlockElement.classList.toggle('basket--active');
  })
}