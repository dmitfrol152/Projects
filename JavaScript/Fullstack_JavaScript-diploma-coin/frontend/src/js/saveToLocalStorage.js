export function saveToLocalStorage(account) {
  let hasAccount = JSON.parse(localStorage.getItem('historyAutocomplete') || '[]');

  if (!hasAccount.includes(account)) {
    hasAccount.push(account);
    localStorage.setItem('historyAutocomplete', JSON.stringify(hasAccount));
  }
}
