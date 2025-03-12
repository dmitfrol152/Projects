export async function getOurCurrencies(isToken) {

  try {

    const response = await fetch('http://localhost:3000/currencies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${isToken}`
      }
    })

    if (response.ok) {

      const newData = await response.json();

      renderCurrencies(newData);

      return newData;

    }

  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
  }

}

function renderCurrencies(newDate) {
  const ourCurrencyList = document.querySelector('.currency__our-currency-list');
  ourCurrencyList.innerHTML = '';

  const currencyKeys = Object.keys(newDate.payload);
  currencyKeys.forEach(currency => {
    const currencyObj = newDate.payload[currency];
    const amount = currencyObj.amount;
    const code = currencyObj.code;

    if (amount > 0) {
      const ourCurrencyItem = document.createElement('li');
      ourCurrencyItem.classList.add('currency__our-currency-item');

      const ourCurrencySpanCode = document.createElement('span');
      ourCurrencySpanCode.classList.add('currency__our-currency-code');
      ourCurrencySpanCode.textContent = code;

      const ourCurrencySpanDotted = document.createElement('div');
      ourCurrencySpanDotted.classList.add('currency__our-currency-dotted');

      const ourCurrencySpanamount = document.createElement('span');
      ourCurrencySpanamount.classList.add('currency__our-currency-amount');
      ourCurrencySpanamount.textContent = amount.toFixed(2);

      ourCurrencyItem.append(ourCurrencySpanCode, ourCurrencySpanDotted, ourCurrencySpanamount);
      ourCurrencyList.append(ourCurrencyItem);
    }

  })
}
