import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: { visible: false },
  reducers: {
    spinnerOn(state) {
      state.visible = true;
    },
    spinnerOff(state) {
      state.visible = false;
    },
  },
});

export const spinnerActions = spinnerSlice.actions;

export default spinnerSlice;
