export function getValidateTransfer(countInput, accountInput) {
  const errorElement = document.querySelector('.form-transfer__inner');
  const pattern = /^\d+$/;

  if (accountInput.value.length < 26 || accountInput.value.length > 26) {
    showError(errorElement, 'Счет должен содержать 26 символов');
    return false;
  }

  if (!pattern.test(countInput.value)) {
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
