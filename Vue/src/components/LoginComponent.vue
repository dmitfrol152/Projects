<template>
  <section class="login">
    <form class="login__form" @submit.prevent="handleLogin">
      <span v-if="isUserFined">Пользоватлеь не найден! Повторите попытку.</span>
      <label class="login__form-label">
        <span>Login</span>
        <input
          class="login__form-field"
          type="text"
          v-model="checkUser.username"
        />
      </label>
      <label class="login__form-label">
        <span>Password</span>
        <input
          class="login__form-field"
          type="text"
          v-model="checkUser.password"
        />
      </label>
      <button class="login__btn" type="submit">Login</button>
      <button class="login__btn-close" type="button" @click="handleClose">
        <svg width="24" height="24" aria-hidden="true">
          <use xlink:href="../assets/svg/sprite.svg#icon-close"></use>
        </svg>
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import type { IUserCheck } from "@/types/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const user = useUserStore();
const router = useRouter();
const isUserFined = ref<boolean>(false);

const checkUser = ref<IUserCheck>({
  username: "",
  password: "",
});

const handleLogin = () => {
  const findedUser = user.usersList.find(
    (item) => item.username === checkUser.value.username
  );

  if (
    findedUser &&
    checkUser.value.username !== "" &&
    checkUser.value.password !== ""
  ) {
    isUserFined.value = false;
    user.isAuthrorize = true;
    localStorage.setItem("user", checkUser.value.username);
    router.push({ name: "home" });
  } else {
    isUserFined.value = true;

    checkUser.value = {
      username: "",
      password: "",
    };
  }
};

const handleClose = () => {
  router.push({ name: "home" });
};
</script>

<style scoped>
.login {
  background-color: var(--vt-c-white);
}
.login__form {
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  background-color: var(--vt-c-gray);
  min-height: 300px;
  min-width: 300px;
  border-radius: 20px;
}
.login__form-label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}
.login__form-field {
  padding: 5px;
  border-radius: 5px;
  border: none;
}
.login__btn {
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

.login__btn:focus-visible {
  outline: none;
}

.login__btn:focus-visible,
.login__btn:hover {
  background-color: var(--vt-c-blue-dark);
}

.login__btn:active {
  transform: scale(0.95);
}

.login__btn-close {
  margin: 0;
  padding: 5px;
  position: absolute;
  top: 20px;
  right: 20px;
  border-color: transparent;
  border: none;
  width: 20px;
  height: 20px;
  background-color: transparent;
  cursor: pointer;
  color: var(--vt-c-black);
  transform: scale(1);
  transition: transform 0.3s ease-in, color 0.3s ease-in;
}

.login__btn-close:focus-visible {
  outline: none;
}

.login__btn-close:focus-visible,
.login__btn-close:hover {
  color: var(--vt-c-white);
}

.login__btn-close:active {
  transform: scale(0.95);
}
</style>
