import { createSlice } from "@reduxjs/toolkit";
import type { AuthUserProps } from "./types";

const initialState: AuthUserProps = {
  authUserValue: false,
};

const authUserSlice = createSlice({
  name: "authUserName",
  initialState,
  reducers: {
    authUserAction: (state, action) => {
      state.authUserValue = action.payload.authUserValue;
    },
  },
});

export const { authUserAction } = authUserSlice.actions;
export default authUserSlice;
