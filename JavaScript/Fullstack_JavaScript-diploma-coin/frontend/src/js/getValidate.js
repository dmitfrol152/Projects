export function getValidate(loginValue, passwordValue) {
  const errorElement = document.querySelector('.form__inner');

  if (loginValue.length < 6 || passwordValue.length < 6 || loginValue.includes(' ') || passwordValue.includes(' ')) {
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('custom-input__error');
    errorMessage.textContent = 'Длина должна быть больше 6 символов и без пробелов';
    errorElement.append(errorMessage);
    return false;
  } else {
    const errorMessage = errorElement.querySelector('.custom-input__error');
    if (errorMessage) {
      errorMessage.remove();
    }
    return true;
  }
}

export function getValidateClear() {
  const errorElement = document.querySelector('.form__inner');
  const errorMessage = errorElement.querySelector('.custom-input__error');
  if (errorMessage) {
    errorMessage.remove();
  }
}

export function getValidateResponse() {
  const errorElement = document.querySelector('.form__inner');
  const errorMessage = document.createElement('span');
  errorMessage.classList.add('custom-input__error');
  errorMessage.textContent = 'Пользователя с таким логином или паролем не сущетсвует';
  errorElement.append(errorMessage);
}
