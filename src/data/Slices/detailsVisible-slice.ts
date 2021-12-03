import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface State {
  visible: boolean;
  details?: User;
}
const detailsVisibilitySlice = createSlice({
  name: "details",
  initialState: { visible: false, details: undefined } as State,
  reducers: {
    toggle(state, action) {
      state.visible = true;
      state.details = {
        id: action.payload.id,
        name: action.payload.name,
        lastName: action.payload.lastName,
        email: action.payload.email,
        age: action.payload.age,
        gender: action.payload.gender,
        phoneNumber: action.payload.phoneNumber,
        address: action.payload.address,
        dateOfBirth: action.payload.dateOfBirth,
        hobbies: action.payload.hobbies,
        hobbiesName: action.payload.hobbiesName,
      };
    },
    close(state) {
      state.visible = false;
      state.details = undefined;
    },
  },
});

export const detailsVisibleActions = detailsVisibilitySlice.actions;

export default detailsVisibilitySlice;
