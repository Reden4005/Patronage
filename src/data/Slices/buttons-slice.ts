import { createSlice } from "@reduxjs/toolkit";

const buttonsSlice = createSlice({
  name: "buttons",
  initialState: {
    buttons: new Array<string>(),
  },
  reducers: {
    addButton(state, action) {
      const actualState = state.buttons;
      if (!actualState.includes(action.payload)) {
        state.buttons.push(action.payload);
      }
    },

    buttonConfirmed(state) {
      for (let i = 0; i < state.buttons.length; i++) {
        let button: HTMLButtonElement | null = document.querySelector(
          `#${state.buttons[i]}`
        );

        let tick: HTMLSpanElement | null = document.querySelector(
          `#tick${state.buttons[i].slice(3)}`
        );
        button!.style.background = "#A8ECE7";
        button!.style.color = "white";
        button!.disabled = true;
        tick!.style.visibility = "visible";
      }
    },
    buttonsClear(state) {
      for (let i = 0; i < state.buttons.length; i++) {
        let button: HTMLButtonElement | null = document.querySelector(
          `#${state.buttons[i]}`
        );
        let tick: HTMLSpanElement | null = document.querySelector(
          `#tick${state.buttons[i].slice(3)}`
        );
        button!.style.background = "white";
        button!.style.color = "#1890ff";
        button!.disabled = false;
        tick!.style.visibility = "hidden";
      }
      state.buttons = [];
    },
  },
});

export const buttonsActions = buttonsSlice.actions;
export default buttonsSlice;
