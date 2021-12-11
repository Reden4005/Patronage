import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const bulkDeleteSlice = createSlice({
  name: "bulkDeleteKeys",
  initialState: { keys: new Array<React.Key>(0) },
  reducers: {
    addKeys(state, action) {
      state.keys = action.payload;
    },
    clear(state): void {
      state.keys = [];
    },
  },
});

export const bulkDeleteActions = bulkDeleteSlice.actions;

export default bulkDeleteSlice;
