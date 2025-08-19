import { getBooks } from "@/api/books";
import type { IBooks } from "@/types/books";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useBooksStore = defineStore("books", () => {
  const books = ref<IBooks[]>([]);
  const booksFavorites = ref<IBooks[]>([]);
  const booksPlan = ref<IBooks[]>([]);
  const booksReaded = ref<IBooks[]>([]);
  const booksReading = ref<IBooks[]>([]);

  const countBooksInEachList = computed(() => ({
    plan: booksPlan.value.length,
    readed: booksReaded.value.length,
    reading: booksReading.value.length,
  }));

  function addBooks(booksProps: IBooks[]) {
    books.value = booksProps;
  }

  function toggleBooksFavorites(booksProps: IBooks) {
    if (
      booksFavorites.value.some(
        (el: IBooks) => el.volumeInfo.title === booksProps.volumeInfo.title
      )
    ) {
      booksFavorites.value = booksFavorites.value.filter(
        (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
      );
    } else {
      booksFavorites.value.push(booksProps);
    }
  }

  function getFavorites(bookEl: IBooks) {
    return booksFavorites.value.some(
      (book) => book.volumeInfo.title === bookEl.volumeInfo.title
    );
  }

  function addBooksPlan(booksProps: IBooks) {
    booksPlan.value.push(booksProps);
  }

  function addBooksReaded(booksProps: IBooks) {
    booksReaded.value.push(booksProps);
  }

  function addBooksReading(booksProps: IBooks) {
    booksReading.value.push(booksProps);
  }

  function removeBookFromAllLists(booksProps: IBooks, status: string) {
    if (status === "plan") {
      booksReaded.value = booksReaded.value.filter(
        (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
      );
      booksReading.value = booksReading.value.filter(
        (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
      );
      return;
    }
    if (status === "readed") {
      booksPlan.value = booksPlan.value.filter(
        (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
      );
      booksReading.value = booksReading.value.filter(
        (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
      );
      return;
    }
    if (status === "reading") {
      booksPlan.value = booksPlan.value.filter(
        (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
      );
      booksReaded.value = booksReaded.value.filter(
        (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
      );
      return;
    }

    booksPlan.value = booksPlan.value.filter(
      (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
    );
    booksReaded.value = booksReaded.value.filter(
      (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
    );
    booksReading.value = booksReading.value.filter(
      (el: IBooks) => el.volumeInfo.title !== booksProps.volumeInfo.title
    );
  }

  function getStatusBook(booksProps: IBooks) {
    const findedStatusInPlan = booksPlan.value.some(
      (el: IBooks) => el.volumeInfo.title === booksProps.volumeInfo.title
    );
    const findedStatusInReaded = booksReaded.value.some(
      (el: IBooks) => el.volumeInfo.title === booksProps.volumeInfo.title
    );
    const findedStatusInReading = booksReading.value.some(
      (el: IBooks) => el.volumeInfo.title === booksProps.volumeInfo.title
    );

    if (findedStatusInPlan) {
      return "plan";
    }
    if (findedStatusInReaded) {
      return "readed";
    }
    if (findedStatusInReading) {
      return "reading";
    }

    return "";
  }

  return {
    books,
    booksFavorites,
    toggleBooksFavorites,
    getFavorites,
    booksPlan,
    booksReaded,
    booksReading,
    addBooks,
    addBooksPlan,
    addBooksReaded,
    addBooksReading,
    removeBookFromAllLists,
    getStatusBook,
    countBooksInEachList,
  };
});
