import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: { visible: false },
  reducers: {
    toggle(state) {
      state.visible = !state.visible;
    },
  },
});

export const spinnerActions = spinnerSlice.actions;

export default spinnerSlice;
