import { createSlice } from "@reduxjs/toolkit";
import { AccountModalProps } from "./types";

export const initialState: AccountModalProps = {
  accountModalValue: false,
};

const accountModalSlice = createSlice({
  name: "accountModalName",
  initialState,
  reducers: {
    setAccountModalValue: (state, actions) => {
      state.accountModalValue = actions.payload.accountModalValue;
    },
  },
});

export const { setAccountModalValue } = accountModalSlice.actions;
export default accountModalSlice;
