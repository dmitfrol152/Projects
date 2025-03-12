import Choices from 'choices.js';

export async function getCurrenciesFromTo(data, isToken) {
  const selectFrom = document.querySelector('select[name="from"]');

  // from
  const optionFormStart = document.createElement('option');
  optionFormStart.classList.add('custom-select-currency-transfer__option');
  optionFormStart.setAttribute('value', '');
  optionFormStart.setAttribute('disabled', '');
  optionFormStart.setAttribute('selected', '');
  optionFormStart.textContent = 'Откуда';
  selectFrom.append(optionFormStart);

  const currencyKeys = Object.keys(data.payload);
  currencyKeys.forEach(currency => {
    const currencyObj = data.payload[currency];
    const amount = currencyObj.amount;
    const code = currencyObj.code;

    if (amount > 0) {
      const option = document.createElement('option');
      option.classList.add('custom-select-currency-transfer__option');
      option.value = code;
      option.textContent = code;

      selectFrom.append(option);
    }

  })

  // to

  try {
    const response = await fetch('http://localhost:3000/all-currencies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${isToken}`
      }
    })

    if (response.ok) {
      const data = await response.json();

      const selectTo = document.querySelector('select[name="to"]');

      const optionToStart = document.createElement('option');
      optionToStart.classList.add('custom-select-currency-transfer__option');
      optionToStart.value = '';
      optionToStart.setAttribute('disabled', '');
      optionToStart.setAttribute('selected', '');
      optionToStart.textContent = 'Куда';
      selectTo.append(optionToStart);

      data.payload.forEach(currency => {
        const option = document.createElement('option');
        option.classList.add('custom-select-currency-transfer__option');
        option.value = currency;
        option.textContent = currency;

        selectTo.append(option);
      })
    } else {
      throw new Error(`Ошибка: ${response.status}`);
    }

  } catch (error) {
    console.error(`Ошибка: ${error.message}`)
  }

  // select

  const select = document.querySelectorAll('.custom-select-currency-transfer__select');
  select.forEach(selected => {
    const choices = new Choices(selected, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
      position: 'bottom'
    });
  })
  const choicesCurrency = document.querySelectorAll('.choices');
  choicesCurrency.forEach(choices => {
    choices.classList.add('choices--currency');
  })
}
