import { combineSlices, configureStore } from "@reduxjs/toolkit";
import authUserReduce from "./authUserSlice";
import audioGroupChoiceReduce from "./audioGroupChoiceSlice";
import searchReduser from "./searchSlice";
import audioPlayerReducer from "./audioPlayerSlice";
import audioPlayerActiveImageReducer from "./audioPlayerActiveImage";

const rootReducer = combineSlices(
  authUserReduce,
  audioGroupChoiceReduce,
  searchReduser,
  audioPlayerReducer,
  audioPlayerActiveImageReducer
);

export default configureStore({
  reducer: rootReducer,
});
