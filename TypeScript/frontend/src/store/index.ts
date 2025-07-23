import { combineSlices, configureStore } from "@reduxjs/toolkit";
import authUserReduce from "./authUserSlice";
import audioGroupChoiceReduce from "./audioGroupChoiceSlice";
import searchReduser from "./searchSlice";
import audioPlayerReducer from "./audioPlayerSlice";
import audioPlayerActiveImageReducer from "./audioPlayerActiveImage";
import currentTrackIndexReducer from "./currentTrackIndexSlice";

const rootReducer = combineSlices(
  authUserReduce,
  audioGroupChoiceReduce,
  searchReduser,
  audioPlayerReducer,
  audioPlayerActiveImageReducer,
  currentTrackIndexReducer
);

export default configureStore({
  reducer: rootReducer,
});
