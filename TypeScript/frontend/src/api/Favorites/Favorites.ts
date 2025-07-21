import {
  FavoritesGetArraySchema,
  type FavoritesGetArrayProps,
  type FavoritesGetProps,
  type FavoritesIdTracktProps,
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
  return fetch("/api/favorites", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
export function fetchPostFavoritesTracks(
  data: FavoritesIdTracktProps
): Promise<FavoritesGetProps> {
  return fetch("/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
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
export function fetchDeleteFavoritesTracks(
  data: FavoritesIdTracktProps
): Promise<FavoritesGetProps> {
  return fetch("/api/favorites", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка получния данны с сервера.");
      }
      return response.json();
    })
    .then((data) => data);
}
