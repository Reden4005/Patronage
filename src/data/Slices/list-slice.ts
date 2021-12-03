import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface State {
  confirmDeleteIsVisible: boolean;
  usersLists: User[];
  userToDelete: User | null;
  deletedUsers: User[];
}
const listSlice = createSlice({
  name: "usersList",
  initialState: {
    usersLists: new Array<User>(),
    confirmDeleteIsVisible: false,
    userToDelete: null,
    deletedUsers: [],
  } as State,
  reducers: {
    initializeState(state, action) {
      state.usersLists = action.payload as User[];
    },

    addNewUser(state, action) {
      state.usersLists.push({
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
      });
    },

    toggleConfirmDelete(state, action) {
      state.confirmDeleteIsVisible = !state.confirmDeleteIsVisible;
      state.userToDelete = action.payload;
    },

    removeUser(state, action) {
      console.log(action.payload);
      const newState = state.usersLists.filter(
        (el) => el.id !== action.payload
      );
      state.usersLists = newState;
    },

    deleteConfirmed(state, action) {
      state.deletedUsers.push(action.payload);
    }
  },
});

export const listActions = listSlice.actions;
export default listSlice;
