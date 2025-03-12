export function getAutocomplete(app) {
  const input = app.querySelector('#account');
  const datalist = document.createElement('datalist');
  datalist.id = 'autocomplate';

  const local = JSON.parse(localStorage.getItem('historyAutocomplete') || '[]')
    .slice(-10);

  local.forEach(element => {
    const option = document.createElement('option');
    option.value = element;
    datalist.append(option);
  });

  input.setAttribute('list', 'autocomplate');
  input.after(datalist);
}
