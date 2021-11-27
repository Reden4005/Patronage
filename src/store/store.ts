import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./form-slice";
import listSlice from "./list-slice";

const store = configureStore({
	reducer: { form: formSlice.reducer, listOfUsers: listSlice.reducer }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;