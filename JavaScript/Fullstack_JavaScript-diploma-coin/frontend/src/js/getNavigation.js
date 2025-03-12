export function getNavigation(router) {
  const headerNav = document.querySelector('.header__nav');
  const headerNavBtnExit = document.querySelector('.nav__btn');
  const headerNavLinks = document.querySelectorAll('.nav__link');

  // проверяем тек страницу
  function setActiveLink() {
    const currentPath = window.location.pathname;
    headerNavLinks.forEach(link => {
      link.classList.remove('nav__link--active');
    });

    headerNavLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('nav__link--active');
      }
    });
  }

  setActiveLink();

  // ссылки
  document.addEventListener('click', (event) => {
    if (event.target.matches('.nav__link')) {
      event.preventDefault();
      const href = event.target.getAttribute('href');
      router.navigate(href);
      setActiveLink();

      // burger
      const headerOpen = document.querySelector('.header--open');
      if (headerOpen) {
        headerOpen.classList.remove('header--open')
      }
    }
  })

  // выход
  headerNavBtnExit.addEventListener('click', () => {
    localStorage.removeItem('token');
    hideMenu();
    router.navigate('/');
    headerNavLinks.forEach(link => {
      link.classList.remove('nav__link--active');
    });

    // burger
    const headerOpen = document.querySelector('.header--open');
    if (headerOpen) {
      headerOpen.classList.remove('header--open')
    }
  })

  // скрыть навигационное меню в шапке
  function hideMenu() {
    headerNav.classList?.remove('nav--visible');
    headerNav.classList.add('nav--hidden');
  }

  // показать навигационное меню в шапке
  function showMenu() {
    headerNav.classList?.remove('nav--hidden');
    headerNav.classList.add('nav--visible');
  }

  return { hideMenu, showMenu }
}
