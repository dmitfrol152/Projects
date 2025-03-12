import { getAccountsRender } from './getAccountsRender.js';
import { getNewAccount } from './getNewAccount.js';
import { getSortedData } from './getSortedData.js';
import Choices from 'choices.js';

export async function getAccounts(isToken) {
  const app = document.querySelector('.app');

  // skeleton
  getSkeleton(app);

  try {

    const response = await fetch('http://localhost:3000/accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${isToken}`,
      },
    })

    if (response.ok) {
      const data = await response.json();

      app.innerHTML = '';
      app.innerHTML = `
          <div class="accounts">
            <div class="container">
              <div class="accounts__wrapper">
                <div class="accounts__top">
                  <div class="accounts__sorted">
                    <h1 class="accounts__title">Ваши счета</h1>
                    <select class="accounts__select" name="sorted">
                      <option class="accounts__option" value="" disabled selected>Сортировка</option>
                      <option class="accounts__option" value="number">По номеру</option>
                      <option class="accounts__option" value="balance">По балансу</option>
                      <option class="accounts__option" value="lastTransaction">По последней транзакции</option>
                    </select>
                  </div>
                  <button class="accounts__btn btn" type="button">
                    <svg class="accounts__btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.00001L12 12M12 12L12 20M12 12L20 12M12 12L4 12" stroke="white" stroke-width="2"/>
                    </svg>
                    <span class="accounts__btn-text">Создать новый счет</span>
                  </button>
                </div>
                <ul class="accounts__list">

                </ul>
              </div>
            </div>
          </div>
        `

      // select
      const select = document.querySelector('.accounts__select');
      const choices = new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        position: 'bottom'
      });

      const headerNavLinks = document.querySelectorAll('.nav__link');
      const currentPath = window.location.pathname;
      headerNavLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('nav__link--active');
        }
      })

      getSortedData(data);
      getAccountsRender(data);
      getNewAccount(isToken);

    } else {
      throw new Error(`Ошибка: ${response.status}`);
    }

  } catch (error) {
    console.error(`Ошибка: ${error.message}`)
  }

}

// skeleton
function getSkeleton(app) {
  app.innerHTML = `
    <div class="accounts">
      <div class="container">
        <div class="accounts__top" style="margin-bottom: 50px">
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-top"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-down"></div>
        </div>
        <ul class="accounts__list">
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-list"></div>
        </ul>
      </div>
    </div>
`;
}
