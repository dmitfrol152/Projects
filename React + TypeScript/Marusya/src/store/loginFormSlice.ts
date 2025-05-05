import { createSlice } from "@reduxjs/toolkit";
import { loginFormReducer } from "./types";

const initialState: loginFormReducer = {
  email: "",
  password: "",
};

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    emailValue: (state, action) => {
      state.email = action.payload.email;
    },
    passwordValue: (state, action) => {
      state.password = action.payload.password;
    },
  },
});

export const { emailValue, passwordValue } = loginFormSlice.actions;
export default loginFormSlice;
