import { createSlice } from "@reduxjs/toolkit";
import { AuthTypeProps } from "./types";

export const initialState: AuthTypeProps = {
  authTypeValue: "posts",
};

const authTypeSlice = createSlice({
  name: "authTypeName",
  initialState,
  reducers: {
    setAuthType: (state) => {
      state.authTypeValue =
        state.authTypeValue === "login" ? "registration" : "login";
    },
    setPostsType: (state) => {
      state.authTypeValue = "posts";
    },
    setLoginType: (state) => {
      state.authTypeValue = "login";
    },
  },
});

export const { setAuthType, setPostsType, setLoginType } =
  authTypeSlice.actions;
export default authTypeSlice;
