import { createSlice } from "@reduxjs/toolkit";
import type { SearchValue } from "./types";

const initialState: SearchValue = {
  searchValue: "",
};

const searchSlice = createSlice({
  name: "searchName",
  initialState,
  reducers: {
    searchAction: (state, action) => {
      state.searchValue = action.payload.searchValue;
    },
  },
});

export const { searchAction } = searchSlice.actions;
export default searchSlice;
