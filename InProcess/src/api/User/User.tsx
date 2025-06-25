import { validateResponse } from "../../utils/validateResponse";
import { EditUserProps, UserDataProps, UserSchema } from "./types";

// check user
export function fetchUser() {
  return fetch("/api/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
export function editUser(editUserData: EditUserProps): Promise<EditUserProps> {
  const formData = new FormData();
  formData.append("full_name", editUserData.full_name);
  formData.append("city", editUserData.city);
  formData.append("country", editUserData.country);
  if (editUserData.bio) {
    formData.append("bio", editUserData.bio);
  }
  if (editUserData.photo) {
    formData.append("photo", editUserData.photo);
  }
  console.log(editUserData);

  return fetch("/api/user", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then(validateResponse)
    .then(async (response) => {
      const data = await response.json();
      return data;
    });
}
