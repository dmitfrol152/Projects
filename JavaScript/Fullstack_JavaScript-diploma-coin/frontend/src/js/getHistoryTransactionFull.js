import paginate from 'jw-paginate';

export function getHistoryTransactionFull(data) {
  const tableBody = document.querySelector('.account__table-body');
  const table = document.querySelector('.account__table');
  const account = data.payload.account;
  const rub = '₽';

  const lastTransaction = data.payload.transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  function displayPage(pageOfItems) {
    tableBody.innerHTML = '';

    pageOfItems.forEach(transaction => {
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

  let paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) {
    paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';
    table.after(paginationContainer);
  }

  function setupPagination(currentPage = 1) {

    const pager = paginate(lastTransaction.length, currentPage, 25);

    const pageOfItems = lastTransaction.slice(pager.startIndex, pager.endIndex + 1);

    displayPage(pageOfItems);

    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(lastTransaction.length / 25);

    function createPageButton(page, text = page) {
      const button = document.createElement('button');
      button.innerText = text;
      button.classList.add('pagination-button');
      if (page === currentPage) {
        button.classList.add('active');
      }
      button.addEventListener('click', () => setupPagination(page));
      return button;
    }

    paginationContainer.appendChild(createPageButton(1));

    if (currentPage > 3) {
      const dots = document.createElement('span');
      dots.innerText = '...';
      dots.classList.add('pagination-dots');
      paginationContainer.appendChild(dots);
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      paginationContainer.appendChild(createPageButton(i));
    }

    if (currentPage < totalPages - 2) {
      const dots = document.createElement('span');
      dots.innerText = '...';
      dots.classList.add('pagination-dots');
      paginationContainer.appendChild(dots);
    }

    if (totalPages > 1) {
      paginationContainer.appendChild(createPageButton(totalPages));
    }
  }

  setupPagination(1);
}
