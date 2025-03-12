export default function closeBurgerMenu() {
  const mainMenuCloseBtn = document.querySelector('.main-menu__close');
  
  mainMenuCloseBtn.addEventListener('click', () => {
    const mainMenu = document.querySelector('.main-menu');
    mainMenu.classList.remove('main-menu--active');
  });
}