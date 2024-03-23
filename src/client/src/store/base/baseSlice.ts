import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

export type Language = "de" | "en" | "bn";
export type Level = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

interface BaseState {
  darkMode: boolean;
  primaryLanguage: Language | string;
  secondaryLanguage: Language | string;
  level: Level | string;
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
    setPrimaryLanguage(state, action: {payload: Language | string}): void {
      state.primaryLanguage = action.payload;
    },
    setSecondaryLanguage(state, action: {payload: Language | string}): void {
      state.secondaryLanguage = action.payload;
    },
    setLevel(state, action: {payload: Language | string}): void {
      state.level = action.payload;
    },
  }
});

export const baseActions = baseSlice.actions;
export const baseReducer = baseSlice.reducer;
