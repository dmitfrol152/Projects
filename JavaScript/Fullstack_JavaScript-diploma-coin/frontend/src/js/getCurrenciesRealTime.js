export function getCurrenciesRealTime() {
  const socket = new WebSocket('ws://localhost:3000/currency-feed');
  const currencyArray = [];

  socket.onmessage = function(event) {
    const currencyRealTimeList = document.querySelector('.currency__changed-currency-list');
    if (!currencyRealTimeList) {
      socket.close();
      return;
    }

    const data = JSON.parse(event.data);
    const maxItem = 15;

    currencyRealTimeList.innerHTML = '';

    const currencyRealTimeItem = document.createElement('li');
    currencyRealTimeItem.classList.add('currency__changed-currency-item');

    const currencyRealTimeCode = document.createElement('span');
    currencyRealTimeCode.classList.add('currency__changed-currency-code');
    currencyRealTimeCode.textContent = `${data.from}/${data.to}`;

    const currencyRealTimeDotted = document.createElement('div');
    if (data.change === 1) {
      currencyRealTimeDotted.classList.add('currency__changed-currency-dotted', 'currency__changed-currency-dotted--green');
    } else if (data.change === -1) {
      currencyRealTimeDotted.classList.add('currency__changed-currency-dotted', 'currency__changed-currency-dotted--red');
    } else {
      currencyRealTimeDotted.classList.add('currency__changed-currency-dotted');
    }

    const currencyRealTimeAmount = document.createElement('span');
    currencyRealTimeAmount.classList.add('currency__changed-currency-amount');
    currencyRealTimeAmount.textContent = data.rate;

    const currencyRealTimeArrow = document.createElement('div');
    currencyRealTimeArrow.classList.add('currency__changed-currency-arrow');
    if (data.change === 1) {
      currencyRealTimeArrow.innerHTML = `
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10L10 0L0 10L20 10Z" fill="#76CA66"/>
        </svg>
      `
    } else if (data.change === -1) {
      currencyRealTimeArrow.innerHTML = `
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L10 10L20 0H0Z" fill="#FD4E5D"/>
        </svg>
      `
    } else {
      return;
    }

    currencyRealTimeItem.append(currencyRealTimeCode, currencyRealTimeDotted, currencyRealTimeAmount, currencyRealTimeArrow);
    currencyArray.unshift(currencyRealTimeItem);

    currencyArray.map(item => {
      currencyRealTimeList.append(item);
    })

    if (currencyArray.length > maxItem) {
      currencyArray.pop();
    }

  };
};
