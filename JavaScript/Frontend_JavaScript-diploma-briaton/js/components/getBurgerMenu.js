import closeBurgerMenu from './closeBurgerMenu.js';

export default function getBurgerMenu() {
  const mainMenuOpenBtn = document.querySelector('.header__catalog-btn');

  mainMenuOpenBtn.addEventListener('click', () => {
    const mainMenu = document.querySelector('.main-menu');
    mainMenu.classList.add('main-menu--active');

    closeBurgerMenu();
    
  });
}