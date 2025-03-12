import { router } from '../index.js';

export function getAccountsRender(data) {
  const accountsList = document.querySelector('.accounts__list');
  accountsList.innerHTML = '';

  if (!data.payload.length) {
    const accountListTitle = document.createElement('h2');
    accountListTitle.classList.add('accounts__bank-empty');
    accountListTitle.textContent = 'Нет доступных счетов';
    accountsList.append(accountListTitle);
  } else {
    const accountListTitle = document.querySelector('.accounts__bank-empty');
    accountListTitle?.remove();
  }

  const rub = '₽';

  data.payload.forEach(bankAccount => {
    const accountsItem = document.createElement('li');
    accountsItem.classList.add('accounts__item')
    accountsItem.innerHTML = `
      <div class="accounts__card">
        <h2 class="accounts__bank-account">${bankAccount.account}</h2>
        <p class="accounts__bank-balance">${bankAccount.balance} ${rub}</p>
        <div class="accounts__bank-inner">
          <div class="accounts__bank-transaction">
            <span class="accounts__bank-transaction-title">Последняя транзакция:</span>
            <span class="accounts__bank-transaction-info">${bankAccount.transactions.length > 0 ? new Date(bankAccount.transactions[0].date).toLocaleDateString('ru-Ru', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }) : 'Нет транзакций'}</span>
          </div>
          <button class="accounts__inner-btn btn" type="button">Открыть</button>
        </div>
      </div>
    `
    accountsList.append(accountsItem);

    const fullAccountInfoBtn = accountsItem.querySelector('.accounts__inner-btn');
    fullAccountInfoBtn.addEventListener('click', () => {
      router.navigate(`/account/${bankAccount.account}`)
    });
  });
}
