import type { LoginProps } from "./types";

// login
export function loginUser(userData: LoginProps): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Ошибка авторизации.");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", userData.username);
    })
    .then(() => undefined);
}

// register
export function registerUser(userData: LoginProps): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Ошибка регистрации.");
      }
    })
    .then(() => undefined);
}

// logout
export function logoutUser() {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
  }
  return;
}
