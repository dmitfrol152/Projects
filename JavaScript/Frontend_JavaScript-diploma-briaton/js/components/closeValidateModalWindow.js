export default function closeValidateModalWindow(result) {
  if (result !== 200) {
    const modalErrorBtn = document.querySelector('.modal-error__button');
    modalErrorBtn.addEventListener('click', () => {
      const modalErrorElement = document.querySelector('.modal-error');
      modalErrorElement.classList.remove('modal-error--active');
    })
  } else {
    const modalSuccessBtn = document.querySelector('.modal-success__button');
    modalSuccessBtn.addEventListener('click', () => {
      const modalSuccessElement = document.querySelector('.modal-success');
      modalSuccessElement.classList.remove('modal-success--active')
    })
  }
}