import { combineSlices, configureStore } from "@reduxjs/toolkit";
import authFormVisibleReducer from "./authFormVisibleSlice";
import authTypeReducer from "./authTypeSlice";
import registrationFormReducer from "./registrationFormSlice";
import loginFormReducer from "./loginFormSlice";

const rootReducer = combineSlices(
  authFormVisibleReducer,
  authTypeReducer,
  registrationFormReducer,
  loginFormReducer
);

export default configureStore({
  reducer: rootReducer,
});
