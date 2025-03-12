import { getAccountRender } from './getAccountRender.js';

export function getNewAccount(isToken) {
  const newAccountBtn = document.querySelector('.accounts__btn');
  newAccountBtn.addEventListener('click', async () => {

    try {
      const response = await fetch('http://localhost:3000/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${isToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json();
        getAccountRender(data);
      }
    } catch (error) {
      console.error(`Ошибка: ${error.message}`)
    }

  })
}
