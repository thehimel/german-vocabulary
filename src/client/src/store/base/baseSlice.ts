import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

export type Language = "de" | "en" | "bn";
export type Level = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

interface BaseState {
  darkMode: boolean;
  primaryLanguage: Language;
  secondaryLanguage: Language;
  level: Level;
  isPlaying: boolean;
}

// Define the initial state using that type
const initialState: BaseState = {
  darkMode: true,
  primaryLanguage: 'de',
  secondaryLanguage: 'bn',
  level: 'a1',
  isPlaying: false
}

const baseSlice = createSlice({
  name: slices.base,
  initialState,
  reducers: {
    toggleDarkMode(state): void {
      state.darkMode = !state.darkMode;
    },
    setIsPlaying(state, action: {payload: boolean}): void {
      state.isPlaying = action.payload;
    },
    setPrimaryLanguage(state, action: {payload: Language}): void {
      state.primaryLanguage = action.payload;
    },
    setSecondaryLanguage(state, action: {payload: Language}): void {
      state.secondaryLanguage = action.payload;
    },
  }
});

export const baseActions = baseSlice.actions;
export const baseReducer = baseSlice.reducer;
