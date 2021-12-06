import { createSlice } from "@reduxjs/toolkit";
import { Hobbie } from "../../types";

const hobbieSlice = createSlice({
  name: "hobbies",
  initialState: {
    hobbies: new Array<Hobbie>(),
  },
  reducers: {
    initializeState(state, action) {
      state.hobbies = action.payload as Hobbie[];
    },
  },
});

export const hobbieActions = hobbieSlice.actions;
export default hobbieSlice;
