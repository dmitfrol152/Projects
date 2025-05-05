import { BASE_URL } from "../../constants/api";
import { validateResponse } from "../../utils/validateResponse";
import {
  IMovie,
  MovieGenresList,
  MovieGenresListSchema,
  MovieList,
  MovieListSchema,
  MovieSchema,
  Parameters,
} from "./types";

// Movies GET //
export function fetchMovieList({
  genre = "",
  pageParam = 1,
  count = 15,
  search = "",
}: Parameters): Promise<MovieList> {
  return fetch(
    `${BASE_URL}/movie?genre=${genre}&page=${pageParam}&count=${count}&title=${search}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка в получении данных с сервера");
      }
      return response.json();
    })
    .then((data) => {
      try {
        const parsedData = MovieListSchema.parse(data);
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Movies TOP 10 GET //
export function fetchMovieTopList(): Promise<MovieList> {
  return fetch(`${BASE_URL}/movie/top10`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка в получении данных с сервера");
      }
      return response.json();
    })
    .then((data) => {
      try {
        const parsedData = MovieListSchema.parse(data);
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Movies Genres GET //
export function fetchMovieGenresList(): Promise<MovieGenresList> {
  return fetch(`${BASE_URL}/movie/genres`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка в получении данных с сервера");
      }
      return response.json();
    })
    .then((data) => {
      try {
        const parsedData = MovieGenresListSchema.parse(data);
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Movie ID GET //
export function fetchMovie(id: number): Promise<IMovie> {
  return fetch(`${BASE_URL}/movie/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка в получении данных с сервера");
      }
      return response.json();
    })
    .then((data) => {
      try {
        const parsedData = MovieSchema.parse(data);
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Movies Random GET //
export function fetchMovieRandomList(): Promise<IMovie> {
  return fetch(`${BASE_URL}/movie/random`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка в получении данных с сервера");
      }
      return response.json();
    })
    .then((data) => {
      try {
        const parsedData = MovieSchema.parse(data);
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Movies Fvorites GET //
export function fetchMovieFvoritesList(): Promise<MovieList> {
  return fetch(`${BASE_URL}/favorites`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка в получении данных с сервера");
      }
      return response.json();
    })
    .then((data) => {
      try {
        const parsedData = MovieListSchema.parse(data);
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
      }
    });
}

// Movie Favorite add POST //
export function addMovieToFavorites(newId: number | null) {
  const id = String(newId);
  return fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

// Movie ID DELETE //
export function deleteMovieFromFavorites(id: number | null) {
  return fetch(`${BASE_URL}/favorites/${id}`, {
    method: "DELETE",
  })
    .then(() => undefined)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
