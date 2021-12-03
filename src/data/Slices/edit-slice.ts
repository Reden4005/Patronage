import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface State {
  visible: boolean;
  edit?: User;
}
const editSlice = createSlice({
  name: "edit",
  initialState: { visible: false, edit: undefined } as State,
  reducers: {
    toggle(state, action) {
      state.visible = true;
      state.edit = {
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
        hobbiesName: action.payload.hobbiesName.split(" "),
      };
    },
    close(state) {
      state.visible = false;
      state.edit = undefined;
    },
  },
});

export const editActions = editSlice.actions;

export default editSlice;
