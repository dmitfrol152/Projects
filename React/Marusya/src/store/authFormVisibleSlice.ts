import { createSlice } from "@reduxjs/toolkit";
import { IAuthFormVisibleReducer } from "./types";

const initialState: IAuthFormVisibleReducer = {
  authFormVisible: false,
};

const authFormVisibleSlice = createSlice({
  name: "authFormVisible",
  initialState,
  reducers: {
    authFormVisible: (state, action) => {
      state.authFormVisible = action.payload.authFormVisible;
    },
  },
});

export const { authFormVisible } = authFormVisibleSlice.actions;
export default authFormVisibleSlice;
