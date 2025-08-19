<template>
  <section class="books-component">
    <input
      class="books-component__search"
      type="search"
      placeholder="Введите не менее 2 букв"
      v-model="searchBook"
    />
    <div class="books-component__count">
      <span>In plan: {{ booksStore.countBooksInEachList.plan }}</span>
      <span>Readed: {{ booksStore.countBooksInEachList.readed }}</span>
      <span>Reading: {{ booksStore.countBooksInEachList.reading }}</span>
    </div>
    <ul class="books-component__list">
      <BookItem
        v-for="book in filteredBooks"
        :key="book.volumeInfo.title"
        :book="book"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useBooksStore } from "@/stores/books";
import BookItem from "@/components/BookItem.vue";
import type { IBooks } from "@/types/books";
import { computed, ref } from "vue";

const props = defineProps<{
  books: IBooks[];
}>();

const booksStore = useBooksStore();

const searchBook = ref<string>("");
const filteredBooks = computed(() => {
  if (searchBook.value.length >= 2) {
    return props.books.filter((item) =>
      item.volumeInfo.title
        .toLowerCase()
        .includes(searchBook.value.toLowerCase())
    );
  }
  return props.books;
});
</script>

<style scoped>
.books-component {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.books-component__search {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--vt-c-blue);
}

.books-component__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.books-component__count {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
