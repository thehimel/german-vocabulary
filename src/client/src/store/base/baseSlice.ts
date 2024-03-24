import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";
import {fetchWords} from "../words/wordsActions.ts";

export const languageChoices = [
  {language: "de", label: "German", country: "de"},
  {language: "en", label: "English", country: "us"},
  {language: "bn", label: "Bengali", country: "bd"}
]

export const levelChoices = [
  {key: "a1", label: "A1"},
  {key: "a2", label: "A2"},
]

export interface LanguageChoice {
  language: string;
  label: string;
  country: string;
}

export interface LevelChoice {
  key: string,
  label: string
}

interface BaseState {
  darkMode: boolean;
  primaryLanguage: string;
  secondaryLanguage: string;
  level: string;
  isPlaying: boolean;
  secondaryLanguageChoices: LanguageChoice[]
}

// Define the initial state using that type
const initialState: BaseState = {
  darkMode: true,
  primaryLanguage: "de",
  secondaryLanguage: "en",
  level: "a1",
  isPlaying: false,
  secondaryLanguageChoices: languageChoices,
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
