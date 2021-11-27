import { createSlice } from "@reduxjs/toolkit";
import transformedUsers from "../UI/mapHobbies";
import { generateId } from "../UI/idGenerator";

const listSlice = createSlice({
  name: "usersList",
  initialState: { initialUsersLists: transformedUsers },
  reducers: {
    addNewUser(state, action) {
      state.initialUsersLists.push({
        id: generateId("user"),
        name: action.payload.name,
        lastName: action.payload.lastName,
        email: action.payload.email,
        age: action.payload.age,
        gender: action.payload.gender,
        phoneNumber: action.payload.phoneNumber,
        address: action.payload.address,
        dateOfBirth: action.payload.dateOfBirth
          ? action.payload.dateOfBirth
          : "",
        hobbies: action.payload.hobbies,
        hobbiesName: action.payload.hobbies
          ? action.payload.hobbies.join(" ")
          : "",
      });
    },
    removeUser(state, action) {
      state.initialUsersLists.find((el) => el.id !== action.payload.id);
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice;
