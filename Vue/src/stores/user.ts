import type { IUser } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userCurrent = localStorage.getItem("user");
  const isAuthrorize = ref<boolean>(userCurrent ? true : false);
  const newId = ref<number>(0);

  const usersList = ref<IUser[]>([
    {
      id: newId.value++,
      username: "admin",
      password: "admin",
    },
  ]);

  const addUser = (username: string, password: string) => {
    const newUser = {
      id: newId.value++,
      username,
      password,
    };
    usersList.value.push(newUser);
  };

  return {
    isAuthrorize,
    usersList,
    addUser,
  };
});
