export async function getHistoryTransaction(dataTrue, id, isToken) {

  let data;

  if (!dataTrue) {
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
        return data;
      }
    } catch (error) {
      console.error(`Ошибка: ${error.message}`)
    }
  } else {
    data = dataTrue;
  }

  const tableBody = document.querySelector('.account__table-body');
  const account = data.payload.account;
  const rub = '₽';

  const sortedTransactions = data.payload.transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const lastTransaction = sortedTransactions.slice(0, 10);

  tableBody.innerHTML = '';

  lastTransaction.forEach(transaction => {
    const tr = document.createElement('tr');
    tr.classList.add('account__table-body-row');

    if (account !== transaction.from) {
      tr.innerHTML = `
        <td class="account__table-body-column">${transaction.from}</td>
        <td class="account__table-body-column">${account}</td>
        <td class="account__table-body-column account__table-body-column--come">+ ${transaction.amount} ${rub}</td>
        <td class="account__table-body-column">${new Date(transaction.date).toLocaleDateString('ru-Ru')}</td>
    `
    } else {
      tr.innerHTML = `
        <td class="account__table-body-column">${account}</td>
        <td class="account__table-body-column">${transaction.to}</td>
        <td class="account__table-body-column account__table-body-column--leave">- ${transaction.amount} ${rub}</td>
        <td class="account__table-body-column">${new Date(transaction.date).toLocaleDateString('ru-Ru')}</td>
    `
    }

    tableBody.append(tr);
  });
}
