import { createSlice } from "@reduxjs/toolkit";

const initialStateSlice = createSlice({
  name: "initialState",
  initialState: { visible: false },
  reducers: {
    toggle(state) {
      state.visible = !state.visible;
    },
  },
});

export const initialStateActions = initialStateSlice.actions;

export default initialStateSlice;
