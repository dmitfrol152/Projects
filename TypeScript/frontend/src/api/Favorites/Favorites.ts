import { BASE_URL } from "../../constants/api";
import {
  FavoritesGetArraySchema,
  type FavoritesGetArrayProps,
  type FavoritesGetProps,
} from "./types";

// favorites get
export function fetchGetFavoritesTracks(): Promise<FavoritesGetArrayProps> {
  let token;
  try {
    token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Пользователь не авторизован.");
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
  return fetch(`${BASE_URL}/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получния данны с сервера.");
      }
      return response.json();
    })
    .then((data) => {
      try {
        const validData = FavoritesGetArraySchema.parse(data);
        return validData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
}

// favorites post
export function fetchPostFavoritesTracks(data: {
  trackId: number;
}): Promise<FavoritesGetProps> {
  return fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получния данны с сервера.");
      }
      return response.json();
    })
    .then((data) => data);
}

// favorites delete
export function fetchDeleteFavoritesTracks(data: {
  trackId: number;
}): Promise<FavoritesGetProps> {
  return fetch(`${BASE_URL}/favorites`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получния данны с сервера.");
      }
      return response.json();
    })
    .then((data) => data);
}
