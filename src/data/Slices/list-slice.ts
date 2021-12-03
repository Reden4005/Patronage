import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface State {
  confirmDeleteIsVisible: boolean;
  confirmBulkDeleteIsVisible: boolean;
  usersLists: User[];
  userToDelete: User | null;
  deletedUsers: User[];
  usersToDelete: User[] | null;
}
const listSlice = createSlice({
  name: "usersList",
  initialState: {
    usersLists: new Array<User>(),
    confirmDeleteIsVisible: false,
    confirmBulkDeleteIsVisible: false,
    userToDelete: null,
    deletedUsers: [],
    usersToDelete: null,
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
      const filtered = state.usersLists.filter(
        (el) => el.id !== action.payload
      );
      state.usersLists = filtered;
    },

    deleteConfirmed(state, action) {
      state.deletedUsers.push(action.payload);
    },

    toggleConfirmBulkDelete(state) {
      state.confirmBulkDeleteIsVisible = !state.confirmBulkDeleteIsVisible;
    },

    bulkDeleteData(state, action) {
      state.usersToDelete= action.payload;
    },

    bulkDeleteConfirmed(state, action) {
      const deleted = action.payload as User[];
      deleted.forEach((el) => {
        state.deletedUsers.push(el)});
      state.usersToDelete = [];
    },
  },
});

export const listActions = listSlice.actions;
export default listSlice;
