import { createSlice } from "@reduxjs/toolkit";
import type { AudioPlayerActiveImageProps } from "./types";

const initialState: AudioPlayerActiveImageProps = {
  audioPlayerActiveImageValue: "",
};

const audioPlayerActiveImageSlice = createSlice({
  name: "audioPlayerActiveImageName",
  initialState,
  reducers: {
    audioPlayerActivemImageAction: (state, action) => {
      state.audioPlayerActiveImageValue =
        action.payload.audioPlayerActiveImageValue;
    },
  },
});

export const { audioPlayerActivemImageAction } =
  audioPlayerActiveImageSlice.actions;
export default audioPlayerActiveImageSlice;
