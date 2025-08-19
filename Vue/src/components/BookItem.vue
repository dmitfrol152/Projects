<template>
  <li class="books-component__item">
    <img
      class="books-component__item-image"
      :src="book.volumeInfo.imageLinks.thumbnail"
      alt="Картинка книги"
      width="128"
      height="158"
    />
    <div class="books-component__item-info">
      <div class="books-component__item-info-inner">
        <span class="books-component__item-info-title">{{
          book.volumeInfo.title
        }}</span>
        <span
          v-if="userStore.isAuthrorize"
          class="books-component__item-info-text"
          >Status:</span
        >
        <ul
          v-if="userStore.isAuthrorize"
          class="books-component__item-info-list"
        >
          <li
            v-if="status === 'readed'"
            class="books-component__item-info-item"
          >
            <svg
              class="books-component__item-info-done"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path
                d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"
                fill="currentColor"
              />
            </svg>
          </li>
          <li
            v-if="status === 'reading'"
            class="books-component__item-info-item"
          >
            <svg
              class="books-component__item-info-plan"
              fill="currentColor"
              width="50px"
              height="50px"
            >
              <path
                d="M6.9917,14.502a.99974.99974,0,0,0-1,1v1.78229a7.97243,7.97243,0,0,1-2-5.28229,7.29085,7.29085,0,0,1,.05273-.87988.99992.99992,0,1,0-1.98535-.24023A9.17334,9.17334,0,0,0,1.9917,12.002a9.96434,9.96434,0,0,0,2.41687,6.5H2.9917a1,1,0,1,0,0,2h4a.98173.98173,0,0,0,.79413-.42181c.01166-.01538.02655-.0268.03741-.043.00666-.00995.00684-.02173.01306-.03186a.96576.96576,0,0,0,.106-.2583.95234.95234,0,0,0,.03143-.15589c.00287-.03088.018-.05749.018-.08911v-4A.99974.99974,0,0,0,6.9917,14.502Zm1.5-8.5H6.70923a7.9737,7.9737,0,0,1,5.28247-2,7.07475,7.07475,0,0,1,.87939.05274,1.00046,1.00046,0,0,0,.24121-1.98633A9.22717,9.22717,0,0,0,11.9917,2.002a9.96421,9.96421,0,0,0-6.5,2.41669V3.002a1,1,0,0,0-2,0v4a.95355.95355,0,0,0,.03931.19471l.00024.00122a.96893.96893,0,0,0,.14117.345l.01142.0169a.97291.97291,0,0,0,.2445.24634c.01093.008.01636.02026.02771.02789.01429.00946.03046.01246.04505.02112a.95817.95817,0,0,0,.17932.084.98784.98784,0,0,0,.26184.05285c.01733.00092.03192.01.04944.01h4a1,1,0,0,0,0-2ZM20.45215,16.80609a.96745.96745,0,0,0-.14124-.34509l-.01129-.01679a.97315.97315,0,0,0-.24469-.24646c-.01092-.00793-.01629-.02026-.02759-.02783-.0108-.00714-.02362-.00738-.0346-.0141a1.15354,1.15354,0,0,0-.40973-.13543c-.03162-.003-.0589-.01844-.09131-.01844h-4a1,1,0,0,0,0,2h1.78241a7.97338,7.97338,0,0,1-5.28241,2,7.07446,7.07446,0,0,1-.8794-.05371,1.00046,1.00046,0,0,0-.24121,1.98633,9.36538,9.36538,0,0,0,1.12061.06738,9.96425,9.96425,0,0,0,6.5-2.41668V21.002a1,1,0,0,0,2,0v-4a.95345.95345,0,0,0-.03931-.1947ZM20.9917,5.502a1,1,0,0,0,0-2h-4a.9519.9519,0,0,0-.19183.0387l-.00666.00134a.96837.96837,0,0,0-.3407.13953l-.01959.01324a.974.974,0,0,0-.2453.24378c-.00787.0108-.02.01611-.02746.02728-.00714.01074-.00739.02344-.0141.03436a1.14563,1.14563,0,0,0-.13636.41266c-.00286.03089-.018.0575-.018.08911v4a1,1,0,1,0,2,0V6.71912a7.97527,7.97527,0,0,1,2,5.28283,7.289,7.289,0,0,1-.05274.87989,1.00106,1.00106,0,0,0,.87208,1.11328,1.02916,1.02916,0,0,0,.12207.00683.99971.99971,0,0,0,.99121-.87988A9.17363,9.17363,0,0,0,21.9917,12.002a9.96411,9.96411,0,0,0-2.417-6.5Z"
              />
            </svg>
          </li>
          <li v-if="status === 'plan'" class="books-component__item-info-item">
            <svg
              class="books-component__item-info-process"
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
            >
              <path
                d="M4,10h6V4H4V10z M6,6h2v2H6V6z M28,6v2H14V6H28z M4,19h6v-6H4V19z M6,15h2v2H6V15z M14,15h14v2H14	V15z M4,28h6v-6H4V28z M6,24h2v2H6V24z M14,24h14v2H14V24z"
                fill="currentColor"
              />
            </svg>
          </li>
        </ul>
        <select v-if="userStore.isAuthrorize" v-model="selectedStatus">
          <option disabled value="">Выберите один из вариантов</option>
          <option value="plan">In plan</option>
          <option value="readed">Readed</option>
          <option value="reading">Reading</option>
        </select>
      </div>
      <div v-if="userStore.isAuthrorize" class="books-component__item-btns">
        <button
          class="books-component__item-btn"
          type="button"
          @click="toggleFavorites"
        >
          In favorites
        </button>
        <svg
          v-if="isFavorite"
          class="books-component__item-btns-favorites"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6719 2.75961L15.2533 7.999H15.2383L15.24 8.002L21.2479 8.00216C21.6276 8.00216 21.9414 8.28432 21.991 8.65039L21.9979 8.75216C21.9979 9.13186 21.7157 9.44565 21.3496 9.49532L21.2479 9.50216H14.7683C14.516 9.50216 14.2833 9.37568 14.1454 9.17002L14.0923 9.07717L13.2943 7.418L11.9991 4.78838L9.81382 9.2251C9.70456 9.44691 9.49299 9.60063 9.24827 9.63599L4.3534 10.3433L7.89768 13.7927C8.07488 13.9651 8.15569 14.2138 8.1137 14.4575L7.27381 19.3314L11.6129 17.0449C11.5396 17.2672 11.5 17.5043 11.5 17.75C11.5 18.0864 11.5738 18.4055 11.7061 18.692L6.62564 21.3682C6.07517 21.6581 5.43135 21.1904 5.53701 20.5772L6.5684 14.5921L2.21602 10.3563C1.77015 9.92234 2.01606 9.16549 2.63184 9.07651L8.64275 8.20791L11.3263 2.75961C11.6012 2.20147 12.397 2.20147 12.6719 2.75961ZM21.25 17C21.6642 17 22 17.3358 22 17.75C22 18.1297 21.7178 18.4435 21.3518 18.4932L21.25 18.5H13.75C13.3358 18.5 13 18.1642 13 17.75C13 17.3703 13.2822 17.0565 13.6482 17.0068L13.75 17H21.25ZM21.2479 12.5092C21.6621 12.5092 21.9979 12.845 21.9979 13.2592C21.9979 13.6389 21.7157 13.9527 21.3496 14.0023L21.2479 14.0092H13.7479C13.3337 14.0092 12.9979 13.6734 12.9979 13.2592C12.9979 12.8795 13.28 12.5657 13.6461 12.516L13.7479 12.5092H21.2479Z"
            fill="currentColor"
          />
        </svg>
        <svg
          v-else
          class="books-component__item-btns-unfavorites"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6719 2.75961L14.5163 6.504L13.75 6.50495L13.6493 6.50834L13.5475 6.51518L13.4466 6.52542L13.2898 6.55231C12.2582 6.76694 11.5 7.67945 11.5 8.75495C11.5 9.92024 12.3858 10.8786 13.5209 10.9934L13.6771 11.0038L13.6493 11.0034L13.5475 11.0102L13.4466 11.0205L13.2898 11.0474C12.3125 11.2507 11.5806 12.0804 11.5062 13.0816L11.5 13.25L11.5052 13.404C11.5808 14.5216 12.4724 15.4154 13.589 15.4943L13.75 15.5L14 15.501L13.75 15.5015L13.6493 15.5049L13.5475 15.5117L13.4466 15.5219L13.2898 15.5488C12.3125 15.7522 11.5806 16.5818 11.5062 17.5831L11.5 17.7515L11.5052 17.9055C11.5241 18.1848 11.5939 18.4501 11.7055 18.6923L6.62564 21.3682C6.07517 21.6581 5.43135 21.1904 5.53701 20.5772L6.5684 14.5921L2.21602 10.3563C1.77015 9.92234 2.01606 9.16549 2.63184 9.07651L8.64275 8.20791L11.3263 2.75961C11.6012 2.20147 12.397 2.20147 12.6719 2.75961ZM21.25 17.0015C21.6642 17.0015 22 17.3373 22 17.7515C22 18.1312 21.7178 18.445 21.3518 18.4946L21.25 18.5015H13.75C13.3358 18.5015 13 18.1657 13 17.7515C13 17.3718 13.2822 17.058 13.6482 17.0083L13.75 17.0015H21.25ZM21.25 12.5C21.6642 12.5 22 12.8358 22 13.25C22 13.6297 21.7178 13.9435 21.3518 13.9932L21.25 14H13.75C13.3358 14 13 13.6642 13 13.25C13 12.8703 13.2822 12.5565 13.6482 12.5068L13.75 12.5H21.25ZM21.25 8.00495C21.6642 8.00495 22 8.34074 22 8.75495C22 9.13465 21.7178 9.44845 21.3518 9.49811L21.25 9.50495H13.75C13.3358 9.50495 13 9.16917 13 8.75495C13 8.37526 13.2822 8.06146 13.6482 8.0118L13.75 8.00495H21.25Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBooksStore } from "@/stores/books";
import { useUserStore } from "@/stores/user";
import type { BookStatus, IBooks } from "@/types/books";

const props = defineProps<{
  book: IBooks;
}>();

const booksStore = useBooksStore();
const userStore = useUserStore();

const status = computed<BookStatus>(() => booksStore.getStatusBook(props.book));

const selectedStatus = computed<BookStatus>({
  get: () => status.value,
  set: (newStatus) => {
    switch (newStatus) {
      case "plan":
        booksStore.addBooksPlan(props.book);
        booksStore.removeBookFromAllLists(props.book, "plan");
        break;
      case "readed":
        booksStore.addBooksReaded(props.book);
        booksStore.removeBookFromAllLists(props.book, "readed");
        break;
      case "reading":
        booksStore.addBooksReading(props.book);
        booksStore.removeBookFromAllLists(props.book, "reading");
        break;
      default:
        booksStore.removeBookFromAllLists(props.book, "");
    }
  },
});

const isFavorite = computed(() => booksStore.getFavorites(props.book));
const toggleFavorites = () => booksStore.toggleBooksFavorites(props.book);
</script>

<style scoped>
.books-component__item {
  padding: 20px 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid var(--vt-c-blue);
}

.books-component__item-image {
  min-width: 128px;
  height: 156px;
}

.books-component__item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
  width: 100%;
}

.books-component__item-info-inner {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.books-component__item-info-title {
  display: block;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--vt-c-black);
}

.books-component__item-info-text {
  display: block;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: var(--vt-c-black);
}

.books-component__item-info-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.books-component__item-info-item {
  width: 24px;
  height: 24px;
}

.books-component__item-info-done {
  width: 24px;
  height: 24px;
  color: var(--vt-c-green);
}

.books-component__item-info-process {
  width: 24px;
  height: 24px;
  color: var(--vt-c-black);
}

.books-component__item-info-plan {
  width: 24px;
  height: 24px;
  color: var(--vt-c-orange);
}

.books-component__item-btns {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.books-component__item-btn {
  margin: 0;
  padding: 10px 15px;
  border-color: transparent;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  cursor: pointer;
  color: var(--vt-c-white);
  background-color: var(--vt-c-blue);
  transform: scale(1);
  transition: background-color 0.3s ease-in, transform 0.3s ease-in;
}

.books-component__item-btn:focus-visible {
  outline: none;
}

.books-component__item-btn:focus-visible,
.books-component__item-btn:hover {
  background-color: var(--vt-c-blue-dark);
}

.books-component__item-btn:active {
  transform: scale(0.95);
}

.books-component__item-btns-unfavorites {
  width: 24px;
  height: 24px;
  color: var(--vt-c-black);
}
.books-component__item-btns-favorites {
  width: 24px;
  height: 24px;
  color: var(--vt-c-yellow);
}
</style>
