import { validateResponse } from "../../utils/validateResponse";
import {
  EditPasswordUserProps,
  EditPasswordUserReturnProps,
  EditUserProps,
  UserDataProps,
  UserSchema,
} from "./types";

// check user
export function fetchUser() {
  const token = localStorage.getItem("token");

  return fetch("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => {
      try {
        const validateData = UserSchema.parse(data);
        return validateData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    });
}

// logout user
export function logoutUser() {
  return fetch("/api/logout", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(() => localStorage.removeItem("token"));
}

// login user
export function loginUser(userData: UserDataProps): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(validateResponse)
    .then(async (response) => {
      const data = await response.json();
      localStorage.setItem("token", data.token);
    })
    .then(() => undefined);
}

// registration user
export function registrationUser(userData: UserDataProps): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then(validateResponse)
    .then(async (response) => {
      const data = await response.json();
      localStorage.setItem("token", data.token);
    })
    .then(() => undefined);
}

// edit user
export function editUser(editUserData: FormData): Promise<EditUserProps> {
  return fetch("/api/user", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: editUserData,
  })
    .then(validateResponse)
    .then(async (response) => {
      const data = await response.json();
      return data;
    });
}

// edit password user
export function editPasswordUser(
  editPasswordUserData: EditPasswordUserProps
): Promise<EditPasswordUserReturnProps> {
  return fetch("/api/user/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(editPasswordUserData),
  })
    .then(validateResponse)
    .then(async (response) => {
      const data = await response.json();
      return data;
    });
}
