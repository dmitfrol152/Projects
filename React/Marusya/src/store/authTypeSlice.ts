import { createSlice } from "@reduxjs/toolkit";
import { authTypeReducer } from "./types";

const initialState: authTypeReducer = {
  authType: "login",
};

const authTypeSlice = createSlice({
  name: "authType",
  initialState,
  reducers: {
    setAuthType: (state) => {
      state.authType = state.authType === "login" ? "registration" : "login";
    },
    resetAuthType: (state) => {
      state.authType = "login";
    },
    setRegType: (state) => {
      state.authType = "registration";
    },
    successAuthType: (state) => {
      state.authType = "success";
    },
    errorAuthType: (state) => {
      state.authType = "error auth";
    },
    errorRegType: (state) => {
      state.authType = "error reg";
    },
  },
});

export const {
  setAuthType,
  resetAuthType,
  setRegType,
  successAuthType,
  errorAuthType,
  errorRegType,
} = authTypeSlice.actions;
export default authTypeSlice;
