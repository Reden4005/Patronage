import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: { visible: false },
  reducers: {
    formOn(state) {
      state.visible = true;
    },
    formOff(state) {
      state.visible = false;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice;
