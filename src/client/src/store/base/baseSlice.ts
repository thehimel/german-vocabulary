import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";
import {fetchWords} from "../words/wordsActions.ts";

export interface SelectorChoice {
  key: string;
  label: string;
}

export const languageChoices: SelectorChoice[] = [
  {key: "de", label: "German"},
  {key: "en", label: "English"},
  {key: "bn", label: "Bengali"}
]

export const levelChoices: SelectorChoice[] = [
  {key: "a1", label: "A1"},
  {key: "a2", label: "A2"},
]

interface BaseState {
  darkMode: boolean;
  primaryLanguage: string;
  secondaryLanguage: string;
  level: string;
  isPlaying: boolean;
}

// Define the initial state using that type
const initialState: BaseState = {
  darkMode: true,
  primaryLanguage: "de",
  secondaryLanguage: "en",
  level: "a1",
  isPlaying: false,
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
    setPrimaryLanguage(state, action: {payload: string}): void {
      const value = action.payload;
      if (value) {state.primaryLanguage = value; fetchWords(state);}
    },
    setSecondaryLanguage(state, action: {payload: string}): void {
      const value = action.payload;
      if (value) {state.secondaryLanguage = value; fetchWords(state);}
    },
    setLevel(state, action: {payload: string}): void {
      const value = action.payload;
      if (value) {state.level = value; fetchWords(state);}
    },
  }
});

export const baseActions = baseSlice.actions;
export const baseReducer = baseSlice.reducer;
