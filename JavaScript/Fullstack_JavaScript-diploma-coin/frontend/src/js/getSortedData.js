import { getAccountsRender } from './getAccountsRender.js';

export async function getSortedData(data) {

  const select = document.querySelector('.accounts__select');
  const dataFiltred = {...data};

  select.addEventListener('change', (event) => {
    const value = event.target.value;

    if (!value) {
      getAccountsRender(data);
      return;
    }

    if (value === 'number') {
      dataFiltred.payload.sort((bankAccountOne, bankAccountTwo) => bankAccountOne.account > bankAccountTwo.account ? 1 : -1);
      getAccountsRender(dataFiltred);
      return;
    }
    if (value === 'balance') {
      dataFiltred.payload.sort((bankAccountOne, bankAccountTwo) => bankAccountOne.balance > bankAccountTwo.balance ? 1 : -1);
      getAccountsRender(dataFiltred);
      return;
    }
    if (value === 'lastTransaction') {
      dataFiltred.payload.sort((bankAccountOne, bankAccountTwo) => Date.now(bankAccountOne.transactions[0]?.date) > Date.now(bankAccountTwo.transactions[0]?.date) ? 1 : -1);
      getAccountsRender(dataFiltred);
      return;
    }

  })

  return data;
}
