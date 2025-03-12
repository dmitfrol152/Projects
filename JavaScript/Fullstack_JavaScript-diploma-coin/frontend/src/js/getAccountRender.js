export function getAccountRender(data) {
  const accountsList = document.querySelector('.accounts__list');
  const bankAccount = data.payload;
  const accountsItem = document.createElement('li');

  accountsItem.classList.add('accounts__item');

  accountsItem.innerHTML = `
      <div class="accounts__card">
        <h2 class="accounts__bank-account">${bankAccount.account}</h2>
        <p class="accounts__bank-balance">${bankAccount.balance}</p>
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

}
