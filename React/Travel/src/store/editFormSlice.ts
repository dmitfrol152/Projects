import { createSlice } from "@reduxjs/toolkit";
import { EditFormProps } from "./types";

export const initialState: EditFormProps = {
  editFormValue: false,
};

const editFormSlice = createSlice({
  name: "editFormStatus",
  initialState,
  reducers: {
    setEditFormValue: (state, actions) => {
      state.editFormValue = actions.payload.editFormValue;
    },
  },
});

export const { setEditFormValue } = editFormSlice.actions;
export default editFormSlice;
