<template>
  <section class="registration">
    <form class="registration__form" @submit.prevent="handleRegistration">
      <span v-if="isUserFined"
        >Пользоватлеь уже зарегестрирован или некорректные данные.</span
      >
      <label class="registration__form-label">
        <span>Registration</span>
        <input
          class="registration__form-field"
          type="text"
          v-model="checkUser.username"
        />
      </label>
      <label class="registration__form-label">
        <span>Password</span>
        <input
          class="registration__form-field"
          type="password"
          v-model="checkUser.password"
        />
      </label>
      <button class="registration__btn" type="submit">Registration</button>
      <button
        class="registration__btn-close"
        type="button"
        @click="handleClose"
      >
        <svg
          fill="currentColor"
          width="24px"
          height="24px"
          viewBox="-3.5 0 19 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
          />
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

const handleRegistration = () => {
  const findedUser = user.usersList.find(
    (item) => item.username === checkUser.value.username
  );

  if (
    !findedUser &&
    checkUser.value.username !== "" &&
    checkUser.value.password !== ""
  ) {
    isUserFined.value = false;
    user.isAuthrorize = true;
    localStorage.setItem("user", checkUser.value.username);
    user.addUser(checkUser.value.username, checkUser.value.password);
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
.registration {
  background-color: var(--vt-c-white);
}
.registration__form {
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
.registration__form-label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}
.registration__form-field {
  padding: 5px;
  border-radius: 5px;
  border: none;
}
.registration__btn {
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

.registration__btn:focus-visible {
  outline: none;
}

.registration__btn:focus-visible,
.registration__btn:hover {
  background-color: var(--vt-c-blue-dark);
}

.registration__btn:active {
  transform: scale(0.95);
}

.registration__btn-close {
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

.registration__btn-close:focus-visible {
  outline: none;
}

.registration__btn-close:focus-visible,
.registration__btn-close:hover {
  color: var(--vt-c-white);
}

.registration__btn-close:active {
  transform: scale(0.95);
}
</style>
