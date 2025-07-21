import { createSlice } from "@reduxjs/toolkit";
import type { audioGroupChoiceProps } from "./types";

const initialState: audioGroupChoiceProps = {
  audioGroupChoiceValue: false,
};

const audioGroupChoiceSlice = createSlice({
  name: "audioGroupChoiceName",
  initialState,
  reducers: {
    audioGroupChoiceAction: (state, action) => {
      state.audioGroupChoiceValue = action.payload.audioGroupChoiceValue;
    },
    audioGroupChoiceNone: (state) => {
      state.audioGroupChoiceValue = null;
    },
  },
});

export const { audioGroupChoiceAction } = audioGroupChoiceSlice.actions;
export default audioGroupChoiceSlice;
