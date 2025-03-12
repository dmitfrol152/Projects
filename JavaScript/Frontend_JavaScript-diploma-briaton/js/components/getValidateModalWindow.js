import getSettingJustValidate from './getSettingJustValidate.js';
import closeValidateModalWindow from './closeValidateModalWindow.js';

export default function getValidateModalWindow() {
  const formElement = document.querySelector('.questions__form');
  // setting justValidate
  const validator = getSettingJustValidate();

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault()
    const isValid = validator.onValidate();

    if (isValid.isValid === true) {

      await fetch('https://httpbin.org/post', {
        method: 'POST'
      })
        .then(response => {
          if (response.ok) {
            const modalSuccessElement = document.querySelector('.modal-success');
            modalSuccessElement.classList.add('modal-success--active')
            const result = response.status;
            closeValidateModalWindow(result);
          } else {
            const modalErrorElement = document.querySelector('.modal-error');
            modalErrorElement.classList.add('modal-error--active');
            const result = response.status;
            closeValidateModalWindow(result);
          }
        })
        .catch(error => {
          console.error('Ошибка сети:', error);
        });

    } else {
      return
    }
  })
}
