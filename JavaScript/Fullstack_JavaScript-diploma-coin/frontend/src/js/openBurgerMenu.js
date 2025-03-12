export function openBurgerMenu() {

  const header = document.querySelector('.header');
  const burgerBtn = document.querySelector('.nav__burger-btn');

  burgerBtn.addEventListener('click', () => {
    header.classList.toggle('header--open');
  });
}
