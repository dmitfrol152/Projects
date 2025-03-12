import { getValidate, getValidateClear, getValidateResponse } from "./getValidate.js";

export function getLogin(router) {
  
  const app = document.querySelector('.app');
  app.innerHTML = '';
  app.innerHTML = `
      <div class="modal">
        <div class="container">
          <div class="modal__entry">
            <h1 class="modal__entry-title">Вход в аккаунт</h1>
            <form class="form">
              <div class="form__inner">
                <div class="custom-input custom-input--login">
                  <label class="custom-input__label" for="login">Логин</label>
                  <input class="custom-input__field" type="text" id="login" name="login" placeholder="Введите логин" autocomplete="off" required>
                </div>
                <div class="custom-input custom-input--password">
                  <label class="custom-input__label" for="password">Пароль</label>
                  <input class="custom-input__field" type="password" id="password" name="password" placeholder="Введите пароль" autocomplete="off" required>
                </div>
              </div>
              <button class="form__btn btn" type="submit">Войти</button>
            </form>
          </div>
        </div>
      </div>
    `

  const login = document.querySelector('#login');
  const password = document.querySelector('#password');
  const form = document.querySelector('.form');

  login.addEventListener('input', handleClearErrors);
  password.addEventListener('input', handleClearErrors);

  function handleClearErrors() {
    getValidateClear();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    getValidateClear();

    const loginValue = login.value;
    const passwordValue = password.value;

    const validate = getValidate(loginValue, passwordValue);

    if (validate) {

      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: loginValue,
            password: passwordValue,
          })
        })

        if (response.ok) {
          const data = await response.json();
          if (data.payload === null) {
            getValidateResponse();
          } else {
            localStorage.setItem('token', data.payload.token);
            router.navigate('/accounts');
          }
        } else {
          throw new Error(`Ошибка: ${response.status}`);
        }
      } catch (error) {
        console.error(`Ошибка: ${error.message}`);
      }

    }
  })

}
