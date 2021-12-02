import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./form-slice";
import listSlice from "./list-slice";
import detailsVisibilitySlice from "./detailsVisible-slice";
import spinnerSlice from "./spinner-slice";
import editSlice from "./edit-slice";

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
