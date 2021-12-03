import { createSlice } from "@reduxjs/toolkit";

const  formSlice = createSlice({
	name: "form",
	initialState: { visible: false },
	reducers: {
		toggle(state) {
			state.visible = !state.visible;
		}
	}
});

export const formActions = formSlice.actions;

export default formSlice;