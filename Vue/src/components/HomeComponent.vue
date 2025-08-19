<template>
  <section class="home">
    <img
      class="home__image"
      src="@/assets/images/logo.png"
      alt="Логотип"
      width="250"
      height="250"
    />
    <h1 class="home__title">Your library of books</h1>
    <ul class="home__buttons">
      <li>
        <button
          class="home__buttonsElement home__buttonsElement--login"
          type="button"
          @click="handleLogin"
        >
          {{ user.isAuthrorize ? "Enter" : "Login" }}
        </button>
      </li>
      <li>
        <button
          class="home__buttonsElement home__buttonsElement--register"
          type="button"
          @click="handleRegister"
        >
          Register
        </button>
      </li>
      <li>
        <button
          class="home__buttonsElement home__buttonsElement--entry"
          type="button"
          @click="handleEntry"
        >
          Entry
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const user = useUserStore();
const router = useRouter();

const handleLogin = () => {
  if (user.isAuthrorize) {
    router.push({ name: "books" });
  } else {
    router.push({ name: "login" });
  }
};

const handleRegister = () => {
  router.push({ name: "register" });
};

const handleEntry = () => {
  router.push({ name: "books" });
};
</script>

<style scoped>
.home {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.home__image {
  width: 150px;
  height: 150px;
}

.home__title {
  margin: 0;
  padding: 0;
  font-size: 38px;
  line-height: 42px;
  font-weight: 600;
  color: var(--vt-c-black);
}

.home__buttons {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.home__buttonsElement {
  transform: scale(1);
  transition: background-color 0.3s ease-in, transform 0.3s ease-in;
}

.home__buttonsElement:focus-visible {
  outline: none;
}

.home__buttonsElement--login:focus-visible,
.home__buttonsElement--login:hover {
  background-color: var(--vt-c-blue-dark);
}

.home__buttonsElement--register:focus-visible,
.home__buttonsElement--register:hover {
  background-color: var(--vt-c-gray-dark);
}

.home__buttonsElement--entry:focus-visible,
.home__buttonsElement--entry:hover {
  background-color: var(--vt-c-gray-dark);
}

.home__buttonsElement:active {
  transform: scale(0.95);
}

.home__buttonsElement {
  margin: 0;
  padding: 10px 15px;
  border-color: transparent;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  cursor: pointer;
}

.home__buttonsElement--login {
  color: var(--vt-c-white);
  background-color: var(--vt-c-blue);
}

.home__buttonsElement--register {
  color: var(--vt-c-black);
  background-color: var(--vt-c-gray);
}

.home__buttonsElement--entry {
  color: var(--vt-c-black);
  background-color: var(--vt-c-gray);
}
</style>
