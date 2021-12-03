import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./Slices/form-slice";
import listSlice from "./Slices/list-slice";
import detailsVisibilitySlice from "./Slices/detailsVisible-slice";
import spinnerSlice from "./Slices/spinner-slice";
import editSlice from "./Slices/edit-slice";

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    listOfUsers: listSlice.reducer,
    details: detailsVisibilitySlice.reducer,
		spinner: spinnerSlice.reducer,
		edit: editSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
