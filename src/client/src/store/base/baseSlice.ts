import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

const baseSlice = createSlice({
  name: slices.base,
  initialState: {
    isDarkMode: true,
  },
  reducers: {
    updateDarkMode(state, action): void {
      state.isDarkMode = action.payload;
    }
  }
});

export const baseActions = baseSlice.actions;
export const baseReducer = baseSlice.reducer;
