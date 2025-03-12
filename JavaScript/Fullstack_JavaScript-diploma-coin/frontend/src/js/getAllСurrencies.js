import { getOurCurrencies } from './getOurCurrencies.js';
import { getCurrenciesFromTo } from './getCurrenciesFromTo.js';
import { getValidateChange } from './getValidateChange.js';
import { getCurrenciesRealTime } from './getCurrenciesRealTime.js';

export async function getAllСurrencies(isToken) {
  const headerNavLinks = document.querySelectorAll('.nav__link');
  const currentPath = window.location.pathname;
  headerNavLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('nav__link--active');
    }
  });

  const app = document.querySelector('.app');

  app.innerHTML = '';
  app.innerHTML = `
      <div class="currency">
        <div class="container">
          <h2 class="currency__title">Валютный обмен</h2>
          <ul class="currency__list">
            <li class="currency__item">
              <div class="currency__our-currency">
                <h2 class="currency__our-currency-title">Ваши валюты</h2>
                <ul class="currency__our-currency-list">

                </ul>
              </div>
            </li>
            <li class="currency__item currency__item--xl">
              <div class="currency__changed-currency">
                <h2 class="currency__changed-currency-title">Изменение курсов в реальном времени</h2>
                <ul class="currency__changed-currency-list">

                </ul>
              </div>
            </li>
            <li class="currency__item currency__item--wxl">
              <div class="currency__transfer">
                <h2 class="currency__transfer-title">Обмен валюты</h2>
                <form class="form-currency-transfer">
                  <div class="form-currency-transfer__inner">
                    <div class="form-currency-transfer__top">
                      <span form-currency-transfer__top-text>Из</span>
                      <div class="custom-select-currency-transfer">
                        <select class="custom-select-currency-transfer__select" name="from">
                        </select>
                      </div>
                      <span form-currency-transfer__top-text>в</span>
                      <div class="custom-select-currency-transfer">
                        <select class="custom-select-currency-transfer__select" name="to">
                        </select>
                      </div>
                    </div>
                    <div class="custom-input-currency-transfer">
                      <label class="custom-input-currency-transfer__label" for="amount">Сумма</label>
                      <input class="custom-input-currency-transfer__field" type="text" id="amount" name="amount" placeholder="Введите сумму" autocomplete="off" required>
                    </div>
                  </div>
                  <button class="form-currency-transfer__btn btn" type="submit">Обменять</button>
                </form>
              </div>
            </li>
          </ul>
        </div>
      </div>
    `

  getCurrenciesRealTime();

  const data = await getOurCurrencies(isToken);

  if (data) {

    getCurrenciesFromTo(data, isToken);

    // send FORM
    const formChange = app.querySelector('.form-currency-transfer');
    formChange.addEventListener('submit', async (event) => {
      event.preventDefault();

      const fromSelect = formChange.querySelector('select[name="from"]').value;
      const toSelect = formChange.querySelector('select[name="to"]').value;
      const accountInput = formChange.querySelector('#amount');

      // validate
      const isValidate = getValidateChange(accountInput);

      if (isValidate) {
        try {

          const response = await fetch('http://localhost:3000/currency-buy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Basic ${isToken}`,
            },
            body: JSON.stringify({
              from: fromSelect,
              to: toSelect,
              amount: accountInput.value
            })
          })

          if (response.ok) {

            const selects = document.querySelectorAll('.custom-select-currency-transfer');
            selects.forEach(selectContainer => {
              selectContainer.innerHTML = `
                <select class="custom-select-currency-transfer__select" name="${selectContainer.querySelector('select').name}">
                </select>
              `;
            });

            formChange.reset();
            await getCurrenciesFromTo(data, isToken);
            await getOurCurrencies(isToken);
            alert('Конвертация успешно осуществлена');

          } else {
            throw new Error(`Ошибка: ${response.status}`);
          }
        } catch (error) {
          console.error(`Ошибка: ${error.message}`);
        }
      }

    });

  } else {
    throw new Error(`Ошибка: ${response.status}`);
  }
}
