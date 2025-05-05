import { createSlice } from "@reduxjs/toolkit";
import { registrationFormReducer } from "./types";

const initialState: registrationFormReducer = {
  email: "",
  name: "",
  surname: "",
  password: "",
  confirmPassword: "",
};

const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    emailValue: (state, action) => {
      state.email = action.payload.email;
    },
    nameValue: (state, action) => {
      state.name = action.payload.name;
    },
    surnameValue: (state, action) => {
      state.surname = action.payload.surname;
    },
    passwordValue: (state, action) => {
      state.password = action.payload.password;
    },
    confirmPasswordValue: (state, action) => {
      state.confirmPassword = action.payload.confirmPassword;
    },
  },
});

export const {
  emailValue,
  nameValue,
  surnameValue,
  passwordValue,
  confirmPasswordValue,
} = registrationFormSlice.actions;
export default registrationFormSlice;
