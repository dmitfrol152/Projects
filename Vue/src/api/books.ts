import type { IBooks } from "@/types/books";

export const getBooks = async (): Promise<IBooks[]> => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=subject:programming"
    );

    if (!response.ok) {
      throw new Error("Ошибка получения данных с сервера.");
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    throw error;
  }
};
