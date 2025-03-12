export default function getSettingSlider() {
  const swiper = new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 40,
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
    slidesPerView: 4
  });
}