import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

interface BaseState {
  isDarkMode: boolean;
}

// Define the initial state using that type
const initialState: BaseState = {
  isDarkMode: true,
}

const baseSlice = createSlice({
  name: slices.base,
  initialState,
  reducers: {
    toggleDarkMode(state): void {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

export const baseActions = baseSlice.actions;
export const baseReducer = baseSlice.reducer;
