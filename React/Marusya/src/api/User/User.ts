import { LoginUserProps, RegistrationUserProps } from "./types";
import { validateResponse } from "../../utils/validateResponse";
import { BASE_URL } from "../../constants/api";

// Registration POST //
export function registrationUser(
  userData: RegistrationUserProps
): Promise<void> {
  return fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return undefined;
  });
}

// Login POST //
export function loginUser(userData: LoginUserProps): Promise<void> {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(validateResponse)
    .then(() => undefined);
}

// logout GET //
export function logoutUser() {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "GET",
  }).then(() => undefined);
}
