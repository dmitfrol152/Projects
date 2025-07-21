import { createSlice } from "@reduxjs/toolkit";
import type { AudioPlayerProps } from "./types";

const initialState: AudioPlayerProps = {
  audioPlayerValue: null,
}

const audioPlayerSlice = createSlice({
  name: "audioPlayerName",
  initialState,
  reducers: {
    audioPlayerAction: (state, action) => {
      state.audioPlayerValue = action.payload.audioPlayerValue;
    }
  }
});

export const { audioPlayerAction } = audioPlayerSlice.actions;
export default audioPlayerSlice;