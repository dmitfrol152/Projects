import { BASE_URL } from "@/constants/api";

export function fetchProducts() {
  return fetch(`${BASE_URL}/products/on_main`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error get response");
      }

      return response.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error("Error get data");
      }

      return data;
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.error(error);
      }

      throw error;
    });
}

export function postProducts(
  page: number,
  Data: { searchQuery: string },
  perPage: number
) {
  return fetch(`${BASE_URL}/products/filter?per_page=${perPage}&page=${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: Data.searchQuery }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error get response post");
      }

      return response.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error("Error get data post");
      }

      return data;
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.error(error);
      }

      throw error;
    });
}
