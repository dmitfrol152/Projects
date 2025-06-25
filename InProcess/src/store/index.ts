import { configureStore, combineSlices } from "@reduxjs/toolkit";
import authTypeReducer from "./authTypeSlice";
import accountModalReducer from "./accountModalSlice";
import editFormReducer from "./editFormSlice";

const rootResucer = combineSlices(
  authTypeReducer,
  accountModalReducer,
  editFormReducer
);

export default configureStore({
  reducer: rootResucer,
});
