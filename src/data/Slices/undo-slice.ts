import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface State {
  undoIsVisible: boolean;
  deletedUsers: User[];
}
const undoSlice = createSlice({
  name: "undo",
  initialState: {
    undoIsVisible: false,
    deletedUsers: new Array<User>(),
  } as State,
  reducers: {
    initializeState(state, action) {
      state.deletedUsers = action.payload as User[];
    },

    deleteUser(state, action) {
      state.deletedUsers.push(action.payload);
    },

    deleteUsers(state, action) {
      for (let i = 0; i < action.payload.length; i++) {
        state.deletedUsers.push(action.payload[i]);
      }
    },
    removeDeletedUser(state, action) {
      const filtered = state.deletedUsers.filter(
        (el) => el.id !== action.payload
      );
      state.deletedUsers = filtered;
    },

    removeMultipleDeletedUsers(state, action) {
      const usersToDel = action.payload as User[];
      const setWithDEleteUsers = new Set();

      for (let i = 0; i < usersToDel.length; i++) {
        setWithDEleteUsers.add(usersToDel[i].id);
      }

      const filtered = state.deletedUsers.filter(
        (user) => !setWithDEleteUsers.has(user.id)
      );
      state.deletedUsers = filtered;
    },

    undoIsVisible(state) {
      state.undoIsVisible = !state.undoIsVisible;
    },

    clearState(state) {
      state.deletedUsers = [];
    },
  },
});

export const undoActions = undoSlice.actions;
export default undoSlice;
