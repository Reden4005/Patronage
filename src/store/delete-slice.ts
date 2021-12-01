import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/types";

interface State {
	visible: boolean;
  deletedUser: User | null;
  deletedUsers: User[];
}

const deleteSlice = createSlice({
  name: "delete",
  initialState: { visible: false, deletedUser: null, deletedUsers: [] } as State,
  reducers: {
    userToDelete(state, action) {
      state.deletedUser = action.payload as User
      state.deletedUsers.push(action.payload);
    },
		toggleVisibility(state) {
			state.visible = !state.visible;
		}
  },
});

export const deletedActions = deleteSlice.actions;

export default deleteSlice;
