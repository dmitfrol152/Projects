import { createSlice } from "@reduxjs/toolkit";
import type { currentTrackIndexProps } from "./types";

const initialState: currentTrackIndexProps = {
  currentTrackIndexValue: null,
};

const currentTrackIndexSlice = createSlice({
  name: "currentTrackIndexName",
  initialState,
  reducers: {
    currentTrackIndexAction: (state, action) => {
      state.currentTrackIndexValue = action.payload.currentTrackIndexValue;
    },
  },
});

export const { currentTrackIndexAction } = currentTrackIndexSlice.actions;
export default currentTrackIndexSlice;
