export function getValidateChange(input) {
  const errorElement = document.querySelector('.form-currency-transfer__inner');
  const pattern = /^\d*\.?\d+$/;

  if (!pattern.test(input.value)) {
    showError(errorElement, 'Введите только цифры больше 0');
    return false;
  }

  hideError(errorElement);
  return true;
}

function showError(append, message) {
  hideError(append);

  const errorMessage = document.createElement('span');
  errorMessage.classList.add('custom-input__error');
  errorMessage.textContent = message;
  append.append(errorMessage);
}

function hideError(append) {
  const errorMessage = append.querySelector('.custom-input__error');
  if (errorMessage) {
    errorMessage.remove();
  }
}
