import { configureStore, combineSlices } from "@reduxjs/toolkit";
import accountModalReducer from "./accountModalSlice";
import editFormReducer from "./editFormSlice";

const rootResucer = combineSlices(accountModalReducer, editFormReducer);

export default configureStore({
  reducer: rootResucer,
});
