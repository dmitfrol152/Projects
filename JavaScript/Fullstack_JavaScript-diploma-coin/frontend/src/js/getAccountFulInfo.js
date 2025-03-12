import { router } from "..";
import { getValidateTransfer } from "./getValidateTransfer.js";
import { saveToLocalStorage } from './saveToLocalStorage.js';
import { getAutocomplete } from './getAutocomplete.js';
import { getDiagram } from './getDiagram.js';
import { getDiagramFull } from './getDiagramFull.js';
import { getCompareFull } from './getCompareFull.js';
import { getHistoryTransaction } from './getHistoryTransaction.js';
import { getHistoryTransactionFull } from './getHistoryTransactionFull.js';
import 'skeleton-elements/css';

export async function getAccountFulInfo(id, isToken) {
  const app = document.querySelector('.app');

  let data;

  // проверяем тек страницу
  const headerNavLinks = document.querySelectorAll('.nav__link');
  headerNavLinks.forEach(link => {
    link.classList.remove('nav__link--active');
  });

  // skeleton
  getSkeleton(app);

  try {
    const response = await fetch(`http://localhost:3000/account/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${isToken}`,
      }
    });

    if (response.ok) {
      data = await response.json();
      const rub = '₽';

      const renderStart = () => {
        app.innerHTML = '';
        app.innerHTML = `
            <div class="account">
              <div class="container">
                <div class="account__top">
                  <h1 class="account__title">Просмотр счета</h1>
                  <button class="account__btn btn" type="button">
                    <svg class="account__btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z" fill="white"/>
                    </svg>
                    <span class="account__btn-text">Вернуться назад</span>
                  </button>
                </div>
                <div class="account__middle">
                  <p class="account__number">№ ${data.payload.account}</p>
                  <div class="account__info">
                    <span class="account__balance">Баланс</span>
                    <span class="account__balance-number">${data.payload.balance} ${rub}</span>
                  </div>
                </div>
                <div class="account__center">
                  <div class="account__transfer">
                    <h2 class="account__transfer-title">Новый перевод</h2>
                    <form class="form-transfer">
                      <div class="form-transfer__inner">
                        <div class="custom-input-transfer custom-input-transfer--account">
                          <label class="custom-input-transfer__label" for="account">Номер счёта получателя</label>
                          <input class="custom-input-transfer__field" type="text" id="account" name="account" placeholder="Введите номер счета получателя" autocomplete="off" required>
                        </div>
                        <div class="custom-input-transfer custom-input-transfer--count">
                          <label class="custom-input-transfer__label" for="count">Сумма перевода</label>
                          <input class="custom-input-transfer__field" type="text" id="count" name="count" placeholder="Введите сумму перевода" autocomplete="off" required>
                        </div>
                      </div>
                      <button class="form-transfer__btn btn" type="submit">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z" fill="white"/>
                        </svg>
                        <span class="account__btn-text">Отправить</span>
                      </button>
                    </form>
                  </div>
                  <a class="account__link" href="href">
                    <div class="account__dynamics">
                      <h2 class="account__dynamics-title">Динамика баланса</h2>
                      <div class="account__dynamics-diagram">

                      </div>
                    </div>
                  </a>
                </div>
                <a class="account__link" href="href">
                  <div class="account__table">
                    <h2 class="account__table-title">История переводов</h2>
                    <table class="account__table-table">
                      <thead class="account__table-head">
                        <th class="account__table-head-title">Счёт отправителя</th>
                        <th class="account__table-head-title">Счёт получателя</th>
                        <th class="account__table-head-title">Сумма</th>
                        <th class="account__table-head-title">Дата</th>
                      </thead>
                      <tbody class="account__table-body">

                      </tbody>
                    <table>
                  </div>
                </a>
              </div>
            </div>
        `
        return app;
      }

      renderStart();

      const renderDetail = () => {
        app.innerHTML = '';
        app.innerHTML = `
             <div class="account">
               <div class="container">
                 <div class="account__top">
                   <h1 class="account__title">Просмотр счета</h1>
                   <button class="account__btn btn" type="button">
                     <svg class="account__btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z" fill="white"/>
                     </svg>
                     <span class="account__btn-text">Вернуться назад</span>
                   </button>
                 </div>
                 <div class="account__middle">
                   <p class="account__number">№ ${data.payload.account}</p>
                   <div class="account__info">
                     <span class="account__balance">Баланс</span>
                     <span class="account__balance-number">${data.payload.balance} ${rub}</span>
                   </div>
                 </div>
                 <div class="account__dynamics">
                   <h2 class="account__dynamics-title">Динамика баланса</h2>
                   <div class="account__dynamics-diagram">

                   </div>
                 </div>
                 <div class="account__compare">
                   <h2 class="account__compare-title">Соотношение входящих исходящих транзакций</h2>
                   <div class="account__compare-diagram">

                   </div>
                 </div>
                 <div class="account__table">
                   <h2 class="account__table-title">История переводов</h2>
                   <table class="account__table-table">
                     <thead class="account__table-head">
                       <th class="account__table-head-title">Счёт отправителя</th>
                       <th class="account__table-head-title">Счёт получателя</th>
                       <th class="account__table-head-title">Сумма</th>
                       <th class="account__table-head-title">Дата</th>
                    </thead>
                    <tbody class="account__table-body">

                    </tbody>
                   <table>
                 </div>
               </div>
             </div>
         `
        return app;
      }

      // send transfer BUTTON
      const formTransfer = app.querySelector('.form-transfer');
      formTransfer.addEventListener('submit', async (event) => {
        event.preventDefault();

        const accountInput = formTransfer.querySelector('#account');
        const countInput = formTransfer.querySelector('#count');

        // validate
        const isValidate = getValidateTransfer(countInput, accountInput);

        if (isValidate) {

          try {

            const response = await fetch('http://localhost:3000/transfer-funds', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Basic ${isToken}`,
              },
              body: JSON.stringify({
                from: id,
                to: accountInput.value,
                amount: countInput.value
              })
            })

            if (response.ok) {

              saveToLocalStorage(accountInput.value);
              alert('Сумма успешно отправлена');
              accountInput.value = '';
              countInput.value = '';
              data = await getHistoryTransaction(null, id, isToken);
              getHistoryTransaction(data);

            }
          } catch (error) {
            console.error(`Ошибка: ${error.message}`);
          }
        }

      });

      function handleDetailBack() {
        const app = renderStart();
        getAutocomplete(app);
        getDiagram(data, app);
        getHistoryTransaction(data);
        setupBackButton();
        setupLinksButton();
      }

      function handleDetailView(e) {
        e.preventDefault();
        const app = renderDetail();
        getDiagramFull(data, app);

        const containerDiagram = document.querySelector('.account__dynamics');
        containerDiagram.classList.add('account__dynamics--mb');

        getHistoryTransactionFull(data);
        getCompareFull(data, app);

        const containerCompire = document.querySelector('.account__compare');
        containerCompire.classList.add('account__compare--mb');

        const detailButtonBack = app.querySelector('.account__btn');
        detailButtonBack.addEventListener('click', handleDetailBack);
      }

      function handleMainBack() {
        router.navigate('/accounts');
        const currentPath = window.location.pathname;
        headerNavLinks.forEach(link => {
          if (link.getAttribute('href') === currentPath) {
            link.classList.add('nav__link--active');
          }
        });
      }

      function setupBackButton() {
        const buttonBack = app.querySelector('.account__btn');
        buttonBack.removeEventListener('click', handleMainBack);
        buttonBack.addEventListener('click', handleMainBack);
      }

      // more BUTTON
      function setupLinksButton() {
        const links = app.querySelectorAll('.account__link');
        links.forEach(link => {
          link.removeEventListener('click', handleDetailView);
          link.addEventListener('click', handleDetailView);
        });
      }

      // links BUTTON
      setupLinksButton();
      // back BUTTON
      setupBackButton();

      // autocomplete accounts
      getAutocomplete(app);
      // diagram
      getDiagram(data, app);
      // history
      getHistoryTransaction(data);

    } else {
      throw new Error(`Ошибка: ${response.status}`)
    }
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
  }
}

// skeleton
function getSkeleton(app) {
  app.innerHTML = `
    <div class="account">
      <div class="container">
        <div class="account__top">
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-top-detail"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-down-detail"></div>
        </div>
        <div class="account__middle">
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-top-detail-two"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-down-detail-two"></div>
        </div>
        <div class="account__center">
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-transfer-detail"></div>
          <div class="skeleton-block skeleton-effect-wave skeleton__accounts-dynamics-detail"></div>
        </div>
        <div class="skeleton-block skeleton-effect-wave skeleton__accounts-table-detail"></div>
      </div>
    </div>
`;
}
