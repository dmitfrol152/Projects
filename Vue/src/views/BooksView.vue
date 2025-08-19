<template>
  <div class="books-page">
    <div class="container">
      <div class="books-page__wrapper">
        <ul class="books-page__list">
          <li class="books-page__list">
            <router-link
              :class="[
                'books-page__link',
                {
                  'books-page__link--active': !route.query.list,
                },
              ]"
              :to="{ name: 'books', query: {} }"
            >
              All books
            </router-link>
          </li>
          <li v-if="user.isAuthrorize" class="books-page__list">
            <router-link
              :class="[
                'books-page__link',
                {
                  'books-page__link--active': route.query.list === 'favorites',
                },
              ]"
              :to="{ name: 'books', query: { list: 'favorites' } }"
            >
              Favorites
            </router-link>
          </li>
          <li v-if="user.isAuthrorize" class="books-page__list">
            <router-link
              :class="[
                'books-page__link',
                {
                  'books-page__link--active': route.query.list === 'plan',
                },
              ]"
              :to="{ name: 'books', query: { list: 'plan' } }"
            >
              In plan
            </router-link>
          </li>
          <li v-if="user.isAuthrorize" class="books-page__list">
            <router-link
              :class="[
                'books-page__link',
                {
                  'books-page__link--active': route.query.list === 'readed',
                },
              ]"
              :to="{ name: 'books', query: { list: 'readed' } }"
            >
              Readed
            </router-link>
          </li>
          <li v-if="user.isAuthrorize" class="books-page__list">
            <router-link
              :class="[
                'books-page__link',
                {
                  'books-page__link--active': route.query.list === 'reading',
                },
              ]"
              :to="{ name: 'books', query: { list: 'reading' } }"
            >
              Reading
            </router-link>
          </li>
          <li class="books-page__list">
            <button
              class="books-page__button"
              type="button"
              @click="handleExit"
            >
              Exit
            </button>
          </li>
        </ul>
        <BooksComponent :books="currentBooks" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBooks } from "@/api/books";
import BooksComponent from "../components/BooksComponent.vue";
import { useBooksStore } from "@/stores/books";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { computed, onMounted } from "vue";

const booksStore = useBooksStore();
const route = useRoute();
const router = useRouter();
const user = useUserStore();

const currentBooks = computed(() => {
  switch (route.query.list) {
    case "favorites":
      return booksStore.booksFavorites;
    case "plan":
      return booksStore.booksPlan;
    case "readed":
      return booksStore.booksReaded;
    case "reading":
      return booksStore.booksReading;
    default:
      return booksStore.books;
  }
});

const handleExit = () => {
  if (!user.isAuthrorize) {
    router.push({ name: "home" });
  }
  localStorage.removeItem("user");
  user.isAuthrorize = false;
  router.push({ name: "home" });
};

const loadBooks = async () => {
  try {
    const data = await getBooks();
    booksStore.addBooks(data);
  } catch (error) {
    console.error("Ошибка загрузки книг:", error);
  }
};

onMounted(() => {
  loadBooks();
});
</script>

<style scope>
.books-page {
  padding: 50px 0;
}

.books-page__wrapper {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
}

.books-page__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
}

.books-page__item {
  padding: 20px 5px;
}

.books-page__link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: var(--vt-c-black);
  background-color: var(--vt-c-white);
  transition: background-color 0.3s ease-in;
}

.books-page__link--active {
  border: 1px solid var(--vt-c-blue);
  background-color: var(--vt-c-gray);
  pointer-events: none;
}

.books-page__link:focus-visible {
  outline: none;
}

.books-page__link:focus-visible,
.books-page__link:hover {
  background-color: var(--vt-c-gray);
}

.books-page__link:active {
  background-color: var(--vt-c-gray-dark);
}

.books-page__button {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: var(--vt-c-black);
  background-color: var(--vt-c-white);
  transition: background-color 0.3s ease-in;
  border: none;
  cursor: pointer;
}

.books-page__button:focus-visible {
  outline: none;
}

.books-page__button:focus-visible,
.books-page__button:hover {
  background-color: var(--vt-c-gray);
}

.books-page__button:active {
  background-color: var(--vt-c-gray-dark);
}
</style>
